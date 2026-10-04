import { useState } from 'react'

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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setSent(false)
  }

  // No backend: the message opens in the visitor's email app, addressed to Ayan
  const onSubmit = (e) => {
    e.preventDefault()
    const subject = form.subject.trim() || `Portfolio inquiry from ${form.name.trim()}`
    const body = `${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header">
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
            {details.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="bento-card contact-card"
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

            <div className="bento-card contact-availability">
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

          {/* Right: message form */}
          <div className="bento-card contact-form-card">
            <div className="glow-spot"></div>
            <div className="card-inner">
              <h3>Send Me a Message</h3>
              <p className="contact-form-note">Fill in the form and it will open in your email app, ready to send.</p>

              <form className="contact-form" onSubmit={onSubmit}>
                <div className="form-row">
                  <label className="form-field">
                    <span>Your Name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={onChange}
                      required
                    />
                  </label>
                  <label className="form-field">
                    <span>Your Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={onChange}
                      required
                    />
                  </label>
                </div>
                <label className="form-field">
                  <span>Subject</span>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project inquiry"
                    value={form.subject}
                    onChange={onChange}
                  />
                </label>
                <label className="form-field" >
                  <span>Message</span>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell me a little about your project..."
                    value={form.message}
                    onChange={onChange}
                    required
                  ></textarea>
                </label>

                <button type="submit" className="btn-primary form-submit">
                  <i className="ri-send-plane-line"></i> Send Message
                </button>
                {sent && (
                  <p className="form-status">
                    <i className="ri-checkbox-circle-fill"></i> Opening your email app...
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        <p className="contact-footer">
          &copy; {new Date().getFullYear()} Ayan<span>.Dev</span> &mdash; Designed &amp; built by Ayan Asif
        </p>
      </div>
    </section>
  )
}
