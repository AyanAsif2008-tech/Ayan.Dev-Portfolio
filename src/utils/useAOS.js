import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const AOS_ATTRIBUTES = [
  'data-aos', 'data-aos-delay', 'data-aos-duration', 'data-aos-easing',
  'data-aos-offset', 'data-aos-once', 'data-aos-anchor-placement',
]

// Scroll animations (AOS) for every section.
export default function useAOS() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 70,
      disable: reduceMotion,
    })

    // Once an element has finished animating in, hand it back to normal CSS so its own
    // hover effects / transitions keep working exactly as before.
    // (AOS adds the `aos-animate` class when an element scrolls into view - we watch for that.)
    const timers = []
    const scheduled = new WeakSet()
    const finishLater = (node) => {
      if (scheduled.has(node)) return
      scheduled.add(node)
      const total = (parseInt(node.dataset.aosDuration, 10) || 800) + (parseInt(node.dataset.aosDelay, 10) || 0) + 150
      timers.push(
        setTimeout(() => {
          AOS_ATTRIBUTES.forEach((attr) => node.removeAttribute(attr))
          node.classList.remove('aos-init', 'aos-animate')
        }, total),
      )
    }

    const classWatcher = new MutationObserver((mutations) => {
      for (const m of mutations) {
        const node = m.target
        if (node.nodeType === 1 && node.hasAttribute('data-aos') && node.classList.contains('aos-animate')) {
          finishLater(node)
        }
      }
    })
    classWatcher.observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true })

    // keep trigger positions right after images / fonts / layout changes
    let resizeTimer
    const refresh = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => AOS.refresh(), 200)
    }
    window.addEventListener('load', refresh)
    const resizeObserver = new ResizeObserver(refresh)
    resizeObserver.observe(document.body)

    return () => {
      classWatcher.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('load', refresh)
      clearTimeout(resizeTimer)
      timers.forEach(clearTimeout)
    }
  }, [])
}
