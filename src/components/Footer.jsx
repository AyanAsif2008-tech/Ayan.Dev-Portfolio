// Social links. Replace the LinkedIn / Instagram URLs below with your own profile links.
const socials = [
  { name: 'LinkedIn', icon: 'ri-linkedin-box-fill', href: 'https://www.linkedin.com/in/ayan-asif', color: '#0a66c2' },
  { name: 'GitHub', icon: 'ri-github-fill', href: 'https://github.com/AyanAsif2008-tech', color: '#6e7681' },
  { name: 'WhatsApp', icon: 'ri-whatsapp-fill', href: 'https://wa.me/923009231346', color: '#25d366' },
  { name: 'Instagram', icon: 'ri-instagram-fill', href: 'https://www.instagram.com/', color: '#e1306c' },
  { name: 'Email', icon: 'ri-mail-fill', href: 'mailto:ayanasifmemon08@gmail.com', color: '#f97316' },
]

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const services = [
  'Responsive Websites',
  'Frontend Development',
  'UI / UX Implementation',
  'PHP & Laravel Backend',
]

const contactItems = [
  { icon: 'ri-mail-line', text: 'ayanasifmemon08@gmail.com', href: 'mailto:ayanasifmemon08@gmail.com' },
  { icon: 'ri-phone-line', text: '+92 300 9231346', href: 'tel:+923009231346' },
  { icon: 'ri-map-pin-line', text: 'Karachi, Pakistan', href: 'https://www.google.com/maps/search/?api=1&query=Karachi%2C+Pakistan', external: true },
]

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

export default function Footer() {
  return (
    <footer className="footer" data-aos="fade-up" data-aos-offset="0">
      {/* Back to top arrow sitting on the top edge of the footer */}
      <button type="button" className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
        <i className="ri-arrow-up-line"></i>
      </button>

      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <button type="button" className="footer-logo" onClick={scrollToTop} aria-label="Ayan.Dev - back to top">
              Ayan<span>.Dev</span>
            </button>
            <p>
              Full-stack web developer from Karachi, building responsive, fast and user-friendly websites with clean design.
            </p>
            <div className="footer-status">
              <span className="pulse-dot"></span> Available for new projects
            </div>
            <div className="footer-socials">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="footer-social"
                  style={{ '--brand': s.color }}
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={s.name}
                  title={s.name}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}><i className="ri-arrow-right-s-line"></i> {link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>What I Do</h4>
            <ul>
              {services.map((service) => (
                <li key={service}>
                  <a href="#contact"><i className="ri-arrow-right-s-line"></i> {service}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Get In Touch</h4>
            <ul className="footer-contact">
              {contactItems.map((item) => (
                <li key={item.text}>
                  <a href={item.href} {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    <span className="footer-contact-icon"><i className={item.icon}></i></span>
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Ayan.Dev All rights reserved.
          </p>
          <p className="footer-credit">
            Designed &amp; built by Ayan Asif
          </p>
        </div>
      </div>
    </footer>
  )
}
