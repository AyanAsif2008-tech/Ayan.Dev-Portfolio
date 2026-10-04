import { useEffect, useRef, useState } from 'react'

const education = [
  {
    icon: 'ri-computer-line',
    title: 'Advanced Diploma (ACCPAI Program)',
    place: 'Aptech Learning (Shahra-e-Faisal)',
    period: 'Ongoing',
    status: 'In Progress',
    current: true,
    description:
      'Software engineering training focused on full-stack web development and database management.',
  },
  {
    icon: 'ri-graduation-cap-line',
    title: 'Intermediate (2nd Year)',
    place: 'Govt College Of Commerce & Economics',
    period: '2026 – Present',
    status: 'In Progress',
    current: true,
    description:
      'Second-year student balancing formal academics with professional programming and development projects.',
  },
  {
    icon: 'ri-book-open-line',
    title: 'Intermediate (1st Year)',
    place: 'Govt College Of Commerce & Economics',
    period: '2026',
    status: 'Completed',
    current: false,
    description: 'Successfully completed the first year of intermediate studies.',
  },
  {
    icon: 'ri-school-line',
    title: 'Matriculation',
    place: 'Al-Makhdoom Public School',
    period: '2026',
    status: 'Completed',
    current: false,
    description: 'Successfully completed secondary school education.',
  },
]

const careerHighlights = [
  'Creating responsive layouts',
  'Building basic web applications',
  'Improving user interface designs',
  'Exploring Backend Development to expand technical capabilities',
]

// Scroll-driven timeline: a dotted track with a line + travelling dot that follows the page scroll
function useTimelineProgress() {
  const timelineRef = useRef(null)
  const progressRef = useRef(null)
  const [geometry, setGeometry] = useState({ top: 0, height: 0 })
  const [reached, setReached] = useState(0)
  const dotCenters = useRef([])

  // measure where the first/last dots are so the line starts and ends exactly on them
  useEffect(() => {
    const tl = timelineRef.current
    if (!tl) return

    const measure = () => {
      const items = Array.from(tl.querySelectorAll('.timeline-item'))
      const centers = items.map((item) => {
        const dot = item.querySelector('.timeline-dot')
        return item.offsetTop + dot.offsetTop + dot.offsetHeight / 2
      })
      dotCenters.current = centers
      setGeometry({ top: centers[0] || 0, height: (centers[centers.length - 1] || 0) - (centers[0] || 0) })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(tl)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // follow the scroll
  useEffect(() => {
    const tl = timelineRef.current
    const bar = progressRef.current
    if (!tl || !bar) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = tl.getBoundingClientRect()
      const triggerY = window.innerHeight * 0.6          // the line grows down to this height on screen
      const y = triggerY - rect.top                         // trigger position inside the timeline
      const centers = dotCenters.current
      if (!centers.length) return

      const start = centers[0]
      const end = centers[centers.length - 1]
      const length = Math.min(Math.max(y - start, 0), end - start)
      bar.style.height = `${length}px`

      const count = centers.filter((c) => c <= y).length
      setReached((prev) => (prev === count ? prev : count))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [geometry])

  return { timelineRef, progressRef, geometry, reached }
}

export default function Education() {
  const { timelineRef, progressRef, geometry, reached } = useTimelineProgress()

  return (
    <section id="education" className="education-section">
      <div className="education-container">
        {/* Section Header */}
        <div className="education-header">
          <span className="badge-tag">
            <i className="ri-graduation-cap-line"></i> Education &amp; Career
          </span>
          <h2 className="section-title">My Academic <span className="highlight">Journey</span></h2>
          <p className="section-subtitle">
            The qualifications and hands-on experience that shape the way I design, build and grow as a developer.
          </p>
        </div>

        <div className="education-grid">
          {/* Education timeline */}
          <div>
            <div className="column-title">Education</div>
            <div className="timeline" ref={timelineRef}>
              <span className="timeline-line" style={{ top: geometry.top, height: geometry.height }}></span>
              <span className="timeline-progress" ref={progressRef} style={{ top: geometry.top }}></span>
              {education.map((item, index) => (
                <div
                  className={`timeline-item${item.current ? ' current' : ''}${index < reached ? ' reached' : ''}`}
                  key={item.title + item.period}
                >
                  <span className="timeline-dot"></span>
                  <div className="bento-card timeline-card">
                    <div className="glow-spot"></div>
                    <div className="card-inner">
                      <div className="timeline-head">
                        <div className="timeline-title">
                          <div className="icon-box small"><i className={item.icon}></i></div>
                          <div>
                            <h4>{item.title}</h4>
                            <span className="inst-highlight">{item.place}</span>
                          </div>
                        </div>
                      </div>

                      <div className="timeline-meta">
                        <span className="period-tag"><i className="ri-calendar-line"></i> {item.period}</span>
                        <span className={`status-badge${item.current ? ' progress' : ''}`}>
                          <i className={item.current ? 'ri-time-line' : 'ri-checkbox-circle-fill'}></i> {item.status}
                        </span>
                      </div>

                      <p className="bento-desc">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career */}
          <div>
            <div className="column-title">Career</div>
            <div className="bento-card career-card">
              <div className="glow-spot"></div>
              <div className="card-inner">
                <div className="card-top-row">
                  <div className="icon-box"><i className="ri-briefcase-line"></i></div>
                  <span className="status-badge progress"><i className="ri-time-line"></i> Ongoing</span>
                </div>
                <h3>Frontend Developer</h3>
                <span className="career-role">Personal Projects &amp; Practice</span>
                <p>
                  As a beginner Frontend Developer, I have been actively building and practicing web development skills through personal projects, with hands-on experience across responsive layouts, web applications and interface design.
                </p>

                <ul className="career-list">
                  {careerHighlights.map((point) => (
                    <li key={point}>
                      <i className="ri-check-line"></i> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
