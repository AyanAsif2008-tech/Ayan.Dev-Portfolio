// Contact-form backend. Runs as a Vercel serverless function at  POST /api/contact
// (and locally through the Vite dev server - see vite.config.js).
//
// Environment variables (set them in a local .env file and in Vercel -> Settings -> Environment Variables):
//   SMTP_USER   your Gmail address                      e.g. ayanasifmemon08@gmail.com
//   SMTP_PASS   a Gmail *App Password* (16 characters)  NOT your normal password
//   MAIL_TO     where messages are delivered (optional, defaults to SMTP_USER)
//   SMTP_HOST / SMTP_PORT / SMTP_SECURE  (optional, default: smtp.gmail.com / 465 / true)

import nodemailer from 'nodemailer'
import { validateContact } from '../src/utils/validation.js'

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const hits = new Map() // best-effort rate limit (per server instance)

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

function send(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(payload))
}

function isRateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_REQUESTS
}

function smtpTransporter() {
  const { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, SMTP_SECURE } = process.env
  if (!SMTP_USER || !SMTP_PASS) return null
  const port = Number(SMTP_PORT) || 465
  return nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

// `getTransporter` is injectable so the handler can be tested without a real mail server
export function createHandler(getTransporter = smtpTransporter) {
  return async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return send(res, 405, { ok: false, message: 'Method not allowed.' })
    }

    const body = req.body && typeof req.body === 'object' ? req.body : {}

    // Honeypot: real visitors never see/fill this field, bots do. Pretend success, send nothing.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return send(res, 200, { ok: true, message: 'Message sent.' })
    }

    const errors = validateContact(body)
    if (Object.keys(errors).length) {
      return send(res, 400, { ok: false, message: 'Please correct the highlighted fields.', errors })
    }

    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()
    if (isRateLimited(ip)) {
      return send(res, 429, { ok: false, message: 'Too many messages. Please try again in a few minutes.' })
    }

    const transporter = getTransporter()
    if (!transporter) {
      console.error('[contact] SMTP_USER / SMTP_PASS are not configured.')
      return send(res, 500, { ok: false, message: 'The email service is not configured yet. Please email me directly.' })
    }

    const name = body.name.trim()
    const email = body.email.trim()
    const subject = body.subject.trim()
    const message = body.message.trim()
    const to = process.env.MAIL_TO || process.env.SMTP_USER
    const sentAt = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Karachi', dateStyle: 'medium', timeStyle: 'short' })

    try {
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
        to,
        replyTo: `"${name}" <${email}>`, // hit "Reply" in Gmail and it goes straight to the visitor
        subject: `[Portfolio] ${subject}`,
        text: `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nReceived: ${sentAt} (PKT)\n\nMessage:\n${message}\n`,
        html: `
          <div style="font-family:Segoe UI,Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
            <div style="background:#0b0c12;color:#fff;padding:18px 24px;font-size:18px;font-weight:600">
              Ayan<span style="color:#f97316">.Dev</span> &mdash; New portfolio message
            </div>
            <div style="padding:24px;color:#111827;font-size:15px;line-height:1.6">
              <p style="margin:0 0 6px"><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p style="margin:0 0 6px"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
              <p style="margin:0 0 6px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
              <p style="margin:0 0 18px"><strong>Received:</strong> ${escapeHtml(sentAt)} (PKT)</p>
              <div style="background:#f9fafb;border-left:4px solid #f97316;padding:14px 16px;white-space:pre-wrap">${escapeHtml(message)}</div>
              <p style="margin:18px 0 0;color:#6b7280;font-size:13px">Press <em>Reply</em> to answer ${escapeHtml(name)} directly.</p>
            </div>
          </div>`,
      })
      return send(res, 200, { ok: true, message: "Message sent! I'll get back to you soon." })
    } catch (error) {
      console.error('[contact] sendMail failed:', error?.message || error)
      return send(res, 500, { ok: false, message: 'Could not send your message right now. Please try again or email me directly.' })
    }
  }
}

export default createHandler()
