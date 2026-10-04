import { useEffect, useRef } from 'react'

const LINK_SELECTOR = 'a, button, [role="button"], .dot-indicator, .carousel-btn'
const CARD_SELECTOR = '.bento-card, .pill, .profile-img-container, .float-chip, .project-image-card'
const TEXT_SELECTOR = 'input, textarea, select, [contenteditable="true"]'

// Orange dot + trailing ring + soft spotlight + ember trail.
// Only runs on devices with a real mouse (not on touch screens).
export default function CursorEffect() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canFinePointer) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    const dot = dotRef.current
    const ring = ringRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    root.classList.add('has-custom-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx, ry = my
    let lastSX = mx, lastSY = my
    let raf = 0
    const particles = []

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const spawn = (x, y, count = 1, burst = false) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = burst ? 0.8 + Math.random() * 2.2 : Math.random() * 0.5
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 0 : 0.25),
          r: 1.2 + Math.random() * 2.2,
          life: 1,
          decay: 0.014 + Math.random() * 0.016,
        })
      }
      if (particles.length > 140) particles.splice(0, particles.length - 140)
    }

    const setState = (cls, on) => root.classList.toggle(cls, on)
    const setCursorOn = (on) => setState('cursor-on', on)

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      setCursorOn(true)
      if (!reduceMotion && Math.hypot(mx - lastSX, my - lastSY) > 9) {
        spawn(mx, my, 1)
        lastSX = mx
        lastSY = my
      }
    }

    const onOver = (e) => {
      const t = e.target
      if (!(t instanceof Element)) return
      setState('cursor-text', !!t.closest(TEXT_SELECTOR))
      setState('cursor-link', !!t.closest(LINK_SELECTOR))
      setState('cursor-card', !t.closest(LINK_SELECTOR) && !!t.closest(CARD_SELECTOR))
    }

    const onDown = () => setState('cursor-down', true)
    const onUp = () => setState('cursor-down', false)
    const onClick = (e) => { if (!reduceMotion) spawn(e.clientX, e.clientY, 10, true) }
    const onLeave = (e) => { if (!e.relatedTarget) setCursorOn(false) }
    const onEnter = () => setCursorOn(true)

    const tick = () => {
      const follow = reduceMotion ? 1 : 0.16
      rx += (mx - rx) * follow
      ry += (my - ry) * follow

      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if (particles.length) {
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.x += p.vx
          p.y += p.vy
          p.vx *= 0.97
          p.vy *= 0.97
          p.life -= p.decay
          if (p.life <= 0) { particles.splice(i, 1); continue }
          ctx.fillStyle = `rgba(251, 146, 60, ${p.life * 0.85})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('click', onClick)
    window.addEventListener('resize', resize)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      root.classList.remove('has-custom-cursor', 'cursor-on', 'cursor-link', 'cursor-card', 'cursor-down', 'cursor-text')
    }
  }, [])

  return (
    <>
      <canvas className="cursor-trail" ref={canvasRef} aria-hidden="true"></canvas>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true"><i></i></div>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true"><i></i></div>
    </>
  )
}
