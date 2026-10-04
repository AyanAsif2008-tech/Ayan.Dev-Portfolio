import { useRef, useState } from 'react'

const projects = [
  {
    number: '01',
    title: 'Pleasant Travel & Tours',
    category: 'Travel Agency Web Application',
    features: 'Responsive Layout, Tour Packages, Modern UI, Smooth Navigation',
    link: 'https://pleasant-tours-e-project.vercel.app',
    image: '/Media/Project 1.png',
    alt: 'Pleasant Tours Preview',
  },
  {
    number: '02',
    title: 'Ayan Impex',
    category: 'Import & Export Business Website',
    features: 'Food Grains & Pulses Catalog, Professional Layout, Corporate Profile',
    link: 'https://ayan-impex.vercel.app/',
    image: '/Media/Project 2.png',
    alt: 'Ayan Impex Preview',
  }
 
  
]

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStart = useRef(null)

  const next = () => setCurrentIndex((i) => (i + 1) % projects.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + projects.length) % projects.length)

  // swipe left / right on touch screens
  const onTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e) => {
    if (!touchStart.current) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    touchStart.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next()
      else prev()
    }
  }

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <span className="badge-tag">
            <i className="ri-rocket-line"></i> Featured Works
          </span>
          <h2 className="section-title">My Recent <span className="highlight">Projects</span></h2>
          <p className="section-subtitle">
            Explore the web applications and business portals I have built, featuring responsive layouts and modern design principles.
          </p>
        </div>

        {/* Slider: arrows outside, slides between two divider lines, dots below */}
        <div className="carousel-wrapper">
          <button className="carousel-btn prev-btn" id="prevBtn" aria-label="Previous Project" onClick={prev}>
            <i className="ri-arrow-left-line"></i>
          </button>

          <div
            className="carousel-track-container"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="carousel-track"
              id="carouselTrack"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div
                  className={`carousel-slide${index === currentIndex ? ' is-active' : ''}`}
                  data-index={index}
                  key={project.number}
                  inert={index !== currentIndex}
                >
                  <div className="slide-content-left">
                    <span className="slide-number">{project.number}</span>
                    <div className="project-info-group">
                      <h3>{project.title}</h3>
                      <p className="project-category">{project.category}</p>

                      <div className="project-features-block">
                        <span className="feature-title">TOOLS &amp; FEATURES</span>
                        <p>{project.features}</p>
                      </div>

                      <a href={project.link} target="_blank" rel="noreferrer" className="btn-live">
                        <span>Live Preview</span>
                        <i className="ri-external-link-line"></i>
                      </a>
                    </div>
                  </div>

                  <div className="slide-preview-right">
                    <div className="project-image-card">
                      <img src={project.image} alt={project.alt} />
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="floating-visit-btn"
                        aria-label={`Visit ${project.title}`}
                      >
                        <i className="ri-arrow-right-up-line"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn next-btn" id="nextBtn" aria-label="Next Project" onClick={next}>
            <i className="ri-arrow-right-line"></i>
          </button>

          <div className="carousel-dots" id="carouselDots">
            {projects.map((project, index) => (
              <span
                key={project.number}
                className={`dot-indicator${index === currentIndex ? ' active' : ''}`}
                data-slide={index}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
