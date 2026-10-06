import { useRef, useState } from 'react'
import axios from 'axios'
import { FIELD_PATTERNS, FIELD_LIMITS, FIELD_MESSAGES, FIELD_REGEX } from '../utils/validation.js'

const EMAIL = 'ayanasifmemon08@gmail.com'

const details = [
  {
    icon: 'ri-mail-line',
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: 'ri-phone-line',
    label: 'Phone',
    value: '+92 300 9231346',
    href: 'tel:+923009231346',
  },
  {
    icon: 'ri-map-pin-line',
    label: 'Location',
    value: 'Karachi, Pakistan',
    href: 'https://www.google.com/maps/search/?api=1&query=Karachi%2C+Pakistan',
    external: true,
  },
  {
    icon: 'ri-github-line',
    label: 'GitHub',
    value: 'github.com/AyanAsif2008-tech',
    href: 'https://github.com/AyanAsif2008-tech',
    external: true,
  },
]

const emptyForm = { name: '', email: '', subject: '', message: '' }

// Works out the message to show for a field using the browser's own validity state
// (the <input pattern="..."> attribute). <textarea> has no `pattern` attribute in HTML,
// so the same pattern is applied to it through setCustomValidity().
function getFieldError(el) {
  const value = el.value.trim()
  if (el.tagName === 'TEXTAREA') {
    el.setCustomValidity(!value ? FIELD_MESSAGES.required : FIELD_REGEX[el.name].test(value) ? '' : FIELD_MESSAGES[el.name])
  }
  if (!value) return FIELD_MESSAGES.required
  if (el.validity.patternMismatch || el.validity.customError || !el.validity.valid) return FIELD_MESSAGES[el.name]
  return ''
}

export default function Contact() {
  const formRef = useRef(null)
  const pressingSubmit = useRef(false) // true while the Send button is being pressed
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [feedback, setFeedback] = useState('')

  const sending = status === 'sending'

  const validateOne = (el) => {
    const message = getFieldError(el)
    setErrors((prev) => ({ ...prev, [el.name]: message }))
    return message
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (status === 'success' || status === 'error') setStatus('idle')
    if (touched[name]) validateOne(e.target) // live feedback once the field has been visited
  }

  const onBlur = (e) => {
    const { name } = e.target
    const trimmed = e.target.value.trim()
    e.target.value = trimmed
    setValues((v) => ({ ...v, [name]: trimmed }))
    setTouched((t) => ({ ...t, [name]: true }))
    // If the visitor is pressing "Send", don't add an error line now: it would push the button
    // down mid-tap and the click would miss. The submit handler validates every field anyway.
    if (pressingSubmit.current) return
    validateOne(e.target)
  }

  const startSubmitPress = () => {
    pressingSubmit.current = true
    setTimeout(() => { pressingSubmit.current = false }, 600)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (sending) return

    const fields = Object.keys(emptyForm).map((name) => formRef.current.elements[name])
    fields.forEach((el) => { el.value = el.value.trim() })

    const found = {}
    fields.forEach((el) => {
      const message = getFieldError(el)
      if (message) found[el.name] = message
    })

    setTouched({ name: true, email: true, subject: true, message: true })
    setErrors(found)
    setValues(Object.fromEntries(fields.map((el) => [el.name, el.value])))

    if (Object.keys(found).length) {
      setStatus('idle')
      formRef.current.elements[Object.keys(found)[0]].focus()
      return
    }

    setStatus('sending')
    setFeedback('')
    try {
      const payload = { ...Object.fromEntries(fields.map((el) => [el.name, el.value])), website: honeypot }
      const { data } = await axios.post('/api/contact', payload, { timeout: 20000 })
      setValues(emptyForm)
      setErrors({})
      setTouched({})
      setStatus('success')
      setFeedback(data?.message || "Message sent! I'll get back to you soon.")
    } catch (error) {
      const serverErrors = error.response?.data?.errors
      if (serverErrors) setErrors(serverErrors)
      setStatus('error')
      setFeedback(
        error.response?.data?.message ||
          (error.code === 'ECONNABORTED'
            ? 'The request timed out. Please try again.'
            : 'Could not reach the server. Please check your connection and try again.'),
      )
    }
  }

  // shared props for the four fields
  const fieldClass = (name) =>
    `form-field${errors[name] ? ' has-error' : touched[name] && values[name] ? ' is-valid' : ''}`
  const common = (name) => ({
    name,
    value: values[name],
    onChange,
    onBlur,
    required: true,
    maxLength: FIELD_LIMITS[name],
    disabled: sending,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })
  const errorLine = (name) =>
    errors[name] ? (
      <small className="field-error" id={`${name}-error`} role="alert">
        <i className="ri-error-warning-line"></i> {errors[name]}
      </small>
    ) : null

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header" data-aos="fade-up">
          <span className="badge-tag">
            <i className="ri-mail-send-line"></i> Get In Touch
          </span>
          <h2 className="section-title">Let's Work <span className="highlight">Together</span></h2>
          <p className="section-subtitle">
            Have a project in mind or want to say hello? Reach out through any of the channels below and I'll get back to you.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left: contact details */}
          <div className="contact-info">
            {details.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className="bento-card contact-card"
                data-aos="fade-up"
                data-aos-delay={i * 90}
                {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <div className="glow-spot"></div>
                <div className="icon-box small"><i className={item.icon}></i></div>
                <div className="contact-card-text">
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </div>
                <i className="ri-arrow-right-up-line contact-arrow"></i>
              </a>
            ))}

            <div className="bento-card contact-availability" data-aos="fade-up" data-aos-delay="360">
              <div className="glow-spot"></div>
              <div className="card-inner">
                <div className="hero-badge">
                  <span className="pulse-dot"></span> Available for Web Development Projects
                </div>
                <p className="bento-desc">
                  Open to web development projects, collaborations and new opportunities. The fastest way to reach me is WhatsApp or email.
                </p>
                <div className="contact-actions">
                  <a
                    href="https://wa.me/923009231346"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    <i className="ri-whatsapp-line"></i> WhatsApp
                  </a>
                  <a href="/Media/Resume.pdf" className="btn-secondary">
                    <i className="ri-file-download-line"></i> Resume
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: message form (delivered to my inbox through /api/contact) */}
          <div className="bento-card contact-form-card" data-aos="fade-up" data-aos-delay="150">
            <div className="glow-spot"></div>
            <div className="card-inner">
              <h3>Send Me a Message</h3>
              <p className="contact-form-note">Fill in the form below and your message will be delivered straight to my inbox.</p>

              <form className="contact-form" ref={formRef} onSubmit={onSubmit} noValidate>
                <div className="form-row">
                  <label className={fieldClass('name')}>
                    <span>Your Name</span>
                    <input
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                      pattern={FIELD_PATTERNS.name}
                      title="Letters only, 2-50 characters (e.g. John Doe). Dots or symbols alone are not allowed."
                      {...common('name')}
                    />
                    {errorLine('name')}
                  </label>
                  <label className={fieldClass('email')}>
                    <span>Your Email</span>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      autoComplete="email"
                      inputMode="email"
                      pattern={FIELD_PATTERNS.email}
                      title="A valid email address, e.g. name@example.com"
                      {...common('email')}
                    />
                    {errorLine('email')}
                  </label>
                </div>

                <label className={fieldClass('subject')}>
                  <span>Subject</span>
                  <input
                    type="text"
                    placeholder="Project inquiry"
                    pattern={FIELD_PATTERNS.subject}
                    title="3-100 characters with real words or numbers. Dots or symbols alone are not allowed."
                    {...common('subject')}
                  />
                  {errorLine('subject')}
                </label>

                <label className={fieldClass('message')}>
                  <span className="field-label-row">
                    Message
                    <em className="char-count">{values.message.length}/{FIELD_LIMITS.message}</em>
                  </span>
                  <textarea
                    rows="5"
                    placeholder="Tell me a little about your project..."
                    {...common('message')}
                  ></textarea>
                  {errorLine('message')}
                </label>

                {/* honeypot: hidden from people, bots fill it in */}
                <input
                  type="text"
                  name="website"
                  className="hp-field"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />

                <button
                  type="submit"
                  className="btn-primary form-submit"
                  disabled={sending}
                  onPointerDown={startSubmitPress}
                >
                  {sending ? (
                    <><i className="ri-loader-4-line spin"></i> Sending...</>
                  ) : (
                    <><i className="ri-send-plane-line"></i> Send Message</>
                  )}
                </button>

                {status === 'success' && (
                  <p className="form-alert success" role="status">
                    <i className="ri-checkbox-circle-fill"></i> {feedback}
                  </p>
                )}
                {status === 'error' && (
                  <p className="form-alert error" role="alert">
                    <i className="ri-error-warning-fill"></i> {feedback}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
