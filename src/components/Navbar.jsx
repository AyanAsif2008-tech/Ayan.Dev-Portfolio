import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const pageLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/education', label: 'Education' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

const anchorLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const NAV_HEIGHT = 74

// Highlights the nav link of the section that is currently on screen
function useScrollSpy(enabled) {
  const [active, setActive] = useState('home')
  const pinned = useRef(null)        // section the user clicked (kept if it can't reach the top of the page)
  const locked = useRef(false)       // true while the smooth scroll caused by a click is running
  const unlockTimer = useRef(null)

  const compute = useCallback(() => {
    const atBottom =
      window.scrollY > 0 &&
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4

    if (!atBottom) pinned.current = null
    if (atBottom) {
      // the last section is shorter than the screen, so it can't reach the top - treat it as current
      if (pinned.current) {
        setActive(pinned.current)
        return
      }
      const last = document.getElementById(anchorLinks[anchorLinks.length - 1].id)
      if (last && last.getBoundingClientRect().top < window.innerHeight * 0.6) {
        setActive(anchorLinks[anchorLinks.length - 1].id)
        return
      }
    }

    const line = NAV_HEIGHT + window.innerHeight * 0.3
    let current = anchorLinks[0].id
    for (const { id } of anchorLinks) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= line) current = id
    }
    setActive(current)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const release = (delay) => {
      clearTimeout(unlockTimer.current)
      unlockTimer.current = setTimeout(() => {
        locked.current = false
        compute()
      }, delay)
    }

    const onScroll = () => {
      if (locked.current) {
        release(150) // still scrolling after a click - wait until it settles
        return
      }
      compute()
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', compute)
      clearTimeout(unlockTimer.current)
    }
  }, [enabled, compute])

  const select = useCallback((id) => {
    pinned.current = id
    locked.current = true
    setActive(id)
    clearTimeout(unlockTimer.current)
    // fallback in case the click doesn't cause any scrolling
    unlockTimer.current = setTimeout(() => {
      locked.current = false
      compute()
    }, 900)
  }, [compute])

  return [active, select]
}

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [active, select] = useScrollSpy(isHome)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  // close the mobile menu on route change, Escape, outside tap, or when the screen gets wide again
  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    const onDown = (e) => navRef.current && !navRef.current.contains(e.target) && setMenuOpen(false)
    const onResize = () => window.innerWidth > 768 && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  return (
    <nav className="nav" ref={navRef}>
      <div className="logo">
        Ayan<span>.Dev</span>
      </div>
      <div className={`items${menuOpen ? ' open' : ''}`} id="nav-menu">
        <ul>
          {isHome
            ? anchorLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={active === link.id ? 'active' : undefined}
                    onClick={() => { select(link.id); setMenuOpen(false) }}
                  >
                    {link.label}
                  </a>
                </li>
              ))
            : pageLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={pathname === link.to ? 'active' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
        </ul>
      </div>
      <div className="nav-actions">
        <div className="btn">
          <a href="/Media/Resume.pdf">Resume</a>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <i className={menuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
        </button>
      </div>
    </nav>
  )
}
