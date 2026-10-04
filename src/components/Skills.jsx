import { useEffect, useRef, useState } from 'react'

// Edit the `level` numbers (0-100) to change the bars.
const categories = [
  {
    icon: 'ri-macbook-line',
    badge: 'Advanced',
    title: 'Frontend Engineering',
    description:
      'Crafting responsive, high-performance, and visually stunning user interfaces with modern frameworks, animations, and utility-first styling.',
    skills: [
      { icon: 'ri-html5-line', color: '#f97316', name: 'HTML5 / CSS3', level: 85 },
      { icon: 'ri-javascript-line', color: '#facc15', name: 'JavaScript (ES6+)', level: 65 },
      { icon: 'ri-reactjs-line', color: '#38bdf8', name: 'React.js', level: 60 },
      { icon: 'ri-tailwind-css-line', color: '#38bdf8', name: 'Tailwind CSS', level: 65 },
      { icon: 'ri-box-3-line', color: '#a3e635', name: 'Three.js', level: 30 },
      { icon: 'ri-magic-line', color: '#ec4899', name: 'Framer Motion', level: 35 },
    ],
  },
  {
    icon: 'ri-server-line',
    badge: 'Proficient',
    title: 'Backend & Databases',
    description:
      'Building secure server-side logic, RESTful APIs, robust relational databases, and scalable MVC architectures.',
    skills: [
      { icon: 'ri-php-line', color: '#818cf8', name: 'PHP (PDO)', level: 60 },
      { icon: 'ri-php-line', color: '#ef4444', name: 'Laravel', level: 50 },
      { icon: 'ri-nodejs-line', color: '#22c55e', name: 'Node.js', level: 40 },
      { icon: 'ri-database-2-line', color: '#38bdf8', name: 'MySQL', level: 55 },
    ],
  },
  {
    icon: 'ri-tools-line',
    badge: 'Daily Use',
    title: 'Tools & Workflow',
    description:
      'Using industry-standard version control, deployment pipelines, and development environments to deliver smooth projects.',
    skills: [
      { icon: 'ri-git-branch-line', color: '#f97316', name: 'Git & GitHub', level: 65 },
      { icon: 'ri-code-box-line', color: '#38bdf8', name: 'VS Code', level: 85 },
      { icon: 'ri-triangle-line', color: '#ffffff', name: 'Vercel Deployment', level: 75 },
      { icon: 'ri-terminal-box-line', color: '#a3e635', name: 'Command Line', level: 55 },
    ],
  },
  {
    icon: 'ri-palette-line',
    badge: 'Core Strength',
    title: 'Design & Communication',
    description:
      'A strong eye for clean design and user-friendly interfaces, backed by clear communication in English.',
    skills: [
      { icon: 'ri-smartphone-line', color: '#f97316', name: 'Responsive Web Design', level: 85 },
      { icon: 'ri-layout-masonry-line', color: '#ec4899', name: 'UI / UX Understanding', level: 65 },
      { icon: 'ri-translate-2', color: '#38bdf8', name: 'English Language', level: 70 },
    ],
  },
]

const levelLabel = (n) => (n >= 80 ? 'Advanced' : n >= 60 ? 'Proficient' : n >= 45 ? 'Intermediate' : 'Learning')
const average = (skills) => Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length)

const allSkills = categories.flatMap((c) => c.skills)
const marqueeItems = [...new Map(allSkills.map((s) => [s.name, s])).values()]

// Adds `in-view` once the block scrolls into view, so the bars fill up
function CategoryCard({ category }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const avg = average(category.skills)

  return (
    <div ref={ref} className={`bento-card sk-category${inView ? ' in-view' : ''}`}>
      <div className="glow-spot"></div>

      <div className="sk-info card-inner">
        <div className="card-top-row">
          <div className="icon-box"><i className={category.icon}></i></div>
          <span className="status-badge">
            <i className="ri-checkbox-circle-fill"></i> {category.badge}
          </span>
        </div>
        <h3>{category.title}</h3>
        <p>{category.description}</p>

        <div className="sk-avg">
          <div className="sk-ring" style={{ '--avg': avg }}>
            <span>{avg}%</span>
          </div>
          <div>
            <strong>Overall level</strong>
            <small>{category.skills.length} skills in this area</small>
          </div>
        </div>
      </div>

      <div className="sk-list card-inner">
        {category.skills.map((skill, i) => (
          <div className="sk-item" key={skill.name}>
            <div className="sk-item-top">
              <i className={skill.icon} style={{ color: skill.color }}></i>
              <span className="sk-name">{skill.name}</span>
              <span className="sk-percent">{skill.level}%</span>
            </div>
            <div className="sk-bar">
              <span
                className="sk-fill"
                style={{ '--level': `${skill.level}%`, transitionDelay: `${i * 90}ms` }}
              ></span>
            </div>
            <span className="sk-level-label">{levelLabel(skill.level)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        {/* Section Header */}
        <div className="skills-header">
          <span className="badge-tag">
            <i className="ri-code-s-slash-line"></i> Expertise &amp; Arsenal
          </span>
          <h2 className="section-title">My Technical <span className="highlight">Skills</span></h2>
          <p className="section-subtitle">
            A comprehensive showcase of the languages, frameworks, and tools I use to build robust, scalable, and immersive web applications.
          </p>
        </div>

        {/* Quick stats */}
        <div className="sk-stats">
          <div className="sk-stat">
            <strong>{allSkills.length}</strong>
            <span>Technologies</span>
          </div>
          <div className="sk-stat">
            <strong>{categories.length}</strong>
            <span>Skill Areas</span>
          </div>
          <div className="sk-stat">
            <strong>2</strong>
            <span>Live Projects</span>
          </div>
        </div>

        {/* Skill categories */}
        <div className="sk-categories">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.title} />
          ))}
        </div>

        {/* Scrolling technology strip */}
        <div className="sk-marquee" aria-hidden="true">
          <div className="sk-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((skill, i) => (
              <span className="pill sk-marquee-pill" key={`${skill.name}-${i}`}>
                <i className={skill.icon} style={{ color: skill.color }}></i> {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
