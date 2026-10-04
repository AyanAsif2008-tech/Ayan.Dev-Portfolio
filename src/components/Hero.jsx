import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const words = [
  'Full Stack Developer',
  'Software Student',
  'Frontend Specialist',
  'PHP & React Enthusiast',
]

// Same typing / deleting timings as the original script.js
function useTypingEffect() {
  const [text, setText] = useState('')

  useEffect(() => {
    let timer
    let wordIndex = 0

    const type = () => {
      const word = words[wordIndex]
      let count = 0

      const loopTyping = () => {
        count += 1
        setText(word.slice(0, count))
        if (count < word.length) {
          timer = setTimeout(loopTyping, 100)
        } else {
          // 100ms loop tick + 2000ms pause before deleting
          timer = setTimeout(deleting, 2100)
        }
      }
      loopTyping()
    }

    const deleting = () => {
      const word = words[wordIndex]
      let remaining = word.length

      const loopDeleting = () => {
        remaining -= 1
        setText(word.slice(0, remaining))
        if (remaining > 0) {
          timer = setTimeout(loopDeleting, 50)
        } else {
          wordIndex = wordIndex + 1 < words.length ? wordIndex + 1 : 0
          // 50ms loop tick + 500ms pause before typing next word
          timer = setTimeout(type, 550)
        }
      }
      loopDeleting()
    }

    type()
    return () => clearTimeout(timer)
  }, [])

  return text
}

export default function Hero() {
  const typed = useTypingEffect()

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="pulse-dot"></span> Available for Web Development Projects
        </div>
        <h1>
          Hi, I'm <span className="highlight">Ayan Asif</span>
        </h1>

        <h2 className="hero-subtitle">
          I'm a <span className="typing-text" id="typing-output">{typed}</span>
          <span className="cursor">|</span>
        </h2>

        <p className="hero-description">
          A passionate software development student specializing in crafting responsive, high-performance frontends and robust backend solutions.
        </p>

        <div className="hero-buttons">
          <Link to="/projects" className="btn-primary">View My Work</Link>
          <Link to="/contact" className="btn-secondary">Let's Connect</Link>
        </div>

        <div className="hero-socials">
          <span>Find me on</span>
          <a
            href="https://github.com/AyanAsif2008-tech"
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <i className="ri-github-fill"></i>
          </a>
          <a href="mailto:ayanasifmemon08@gmail.com" className="social-link" aria-label="Email">
            <i className="ri-mail-line"></i>
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-orbit">
          <span className="orbit-ring ring-1"></span>
          <span className="orbit-ring ring-2"></span>

          <div className="profile-img-container">
            <img src="/Media/Pic.png" alt="Ayan Asif" className="profile-img" />
          </div>

          <span className="float-chip chip-1"><i className="ri-reactjs-line" style={{ color: '#38bdf8' }}></i> React</span>
          <span className="float-chip chip-2"><i className="ri-javascript-line" style={{ color: '#facc15' }}></i> JavaScript</span>
          <span className="float-chip chip-3"><i className="ri-php-line" style={{ color: '#818cf8' }}></i> PHP</span>
          <span className="float-chip chip-4"><i className="ri-php-line" style={{ color: '#ef4444' }}></i> Laravel</span>
        </div>
      </div>
    </section>
  )
}
