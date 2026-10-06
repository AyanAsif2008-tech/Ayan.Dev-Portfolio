import { useEffect, useRef, useState } from 'react'

// Edit the `level` numbers (0-100) to change the bars and the level badges.
const groups = [
  {
    number: '01',
    icon: 'ri-macbook-line',
    title: 'Frontend Engineering',
    description:
      'Crafting responsive, high-performance, and visually stunning user interfaces with modern frameworks, animations, and utility-first styling.',
    skills: [
      { icon: 'ri-html5-line', color: '#f97316', name: 'HTML5 / CSS3', level: 85, text: 'Semantic markup and modern, responsive styling.' },
      { icon: 'ri-javascript-line', color: '#facc15', name: 'JavaScript (ES6+)', level: 65, text: 'Interactive behaviour, DOM logic and modern syntax.' },
      { icon: 'ri-reactjs-line', color: '#38bdf8', name: 'React.js', level: 60, text: 'Component-based interfaces with hooks and routing.' },
      { icon: 'ri-tailwind-css-line', color: '#38bdf8', name: 'Tailwind CSS', level: 65, text: 'Utility-first styling for fast, consistent UI.' },
      { icon: 'ri-box-3-line', color: '#a3e635', name: 'Three.js', level: 30, text: '3D graphics and immersive scenes on the web.' },
      { icon: 'ri-magic-line', color: '#ec4899', name: 'Framer Motion', level: 35, text: 'Smooth, declarative animations for React.' },
    ],
  },
  {
    number: '02',
    icon: 'ri-server-line',
    title: 'Backend & Databases',
    description:
      'Building secure server-side logic, RESTful APIs, robust relational databases, and scalable MVC architectures.',
    skills: [
      { icon: 'ri-php-line', color: '#818cf8', name: 'PHP (PDO)', level: 60, text: 'Server-side logic with secure database access.' },
      { icon: 'ri-php-line', color: '#ef4444', name: 'Laravel', level: 50, text: 'MVC structure, routing and Eloquent ORM.' },
      { icon: 'ri-nodejs-line', color: '#22c55e', name: 'Node.js', level: 40, text: 'JavaScript runtime for APIs and tooling.' },
      { icon: 'ri-database-2-line', color: '#38bdf8', name: 'MySQL', level: 55, text: 'Relational database design and queries.' },
    ],
  },
  {
    number: '03',
    icon: 'ri-tools-line',
    title: 'Tools & Workflow',
    description:
      'Using industry-standard version control, deployment pipelines, and development environments to deliver smooth projects.',
    skills: [
      { icon: 'ri-git-branch-line', color: '#f97316', name: 'Git & GitHub', level: 65, text: 'Version control, branching and collaboration.' },
      { icon: 'ri-code-box-line', color: '#38bdf8', name: 'VS Code', level: 85, text: 'A fast, productive everyday editor setup.' },
      { icon: 'ri-triangle-line', color: '#e5e7eb', name: 'Vercel Deployment', level: 75, text: 'Quick deployments with live preview links.' },
      { icon: 'ri-terminal-box-line', color: '#a3e635', name: 'Command Line', level: 55, text: 'Everyday terminal workflows and package tools.' },
    ],
  },
  {
    number: '04',
    icon: 'ri-palette-line',
    title: 'Design & Communication',
    description:
      'A strong eye for clean design and user-friendly interfaces, backed by clear communication in English.',
    skills: [
      { icon: 'ri-smartphone-line', color: '#f97316', name: 'Responsive Web Design', level: 85, text: 'Layouts that adapt from phones to large screens.' },
      { icon: 'ri-layout-masonry-line', color: '#ec4899', name: 'UI / UX Understanding', level: 65, text: 'Clean, user-friendly interface decisions.' },
      { icon: 'ri-translate-2', color: '#38bdf8', name: 'English Language', level: 70, text: 'Clear written and spoken communication.' },
    ],
  },
]

const tierOf = (n) => (n >= 80 ? 'advanced' : n >= 60 ? 'proficient' : n >= 45 ? 'intermediate' : 'learning')
const tierLabel = { advanced: 'Advanced', proficient: 'Proficient', intermediate: 'Intermediate', learning: 'Learning' }
const average = (skills) => Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length)

// One block per category. The bars fill up the first time the grid scrolls into view.
function SkillGroup({ group }) {
  const gridRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = gridRef.current
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
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="skills-group">
      <div className="skills-group-head" data-aos="fade-up">
        <div className="skills-group-title">
          <div className="icon-box small"><i className={group.icon}></i></div>
          <div>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
          </div>
        </div>
        
      </div>

      <div className={`skills-card-grid cols-${group.skills.length}${inView ? ' in-view' : ''}`} ref={gridRef}>
        {group.skills.map((skill, i) => {
          const tier = tierOf(skill.level)
          return (
            <article
              className="skill-card"
              key={skill.name}
              style={{ '--tint': skill.color }}
              data-aos="fade-up"
              data-aos-delay={(i % 3) * 100}
            >
              <div className="skill-card-top">
                <span className="skill-icon"><i className={skill.icon}></i></span>
                <span className={`skill-level tier-${tier}`}>{tierLabel[tier]}</span>
              </div>
              <h4>{skill.name}</h4>
              <p>{skill.text}</p>
              <div className="skill-meter">
                <div className="skill-meter-bar">
                  <span style={{ '--level': `${skill.level}%`, transitionDelay: `${(i % 3) * 120}ms` }}></span>
                </div>
                <b>{skill.level}%</b>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        {/* Section Header */}
        <div className="skills-header" data-aos="fade-up">
          <span className="badge-tag">
            <i className="ri-code-s-slash-line"></i> Expertise &amp; Arsenal
          </span>
          <h2 className="section-title">My Technical <span className="highlight">Skills</span></h2>
          <p className="section-subtitle">
            A comprehensive showcase of the languages, frameworks, and tools I use to build robust, scalable, and immersive web applications.
          </p>
        </div>

        {groups.map((group) => (
          <SkillGroup group={group} key={group.title} />
        ))}

        {/* Closing banner */}
        <div className="skills-banner" data-aos="fade-up">
          <div className="skills-banner-icon"><i className="ri-seedling-line"></i></div>
          <div className="skills-banner-text">
            <h3>Always learning, always building</h3>
            <p>
              I'm currently expanding from the frontend into backend development with PHP, Laravel and Node.js to become a complete full-stack developer.
            </p>
          </div>
          <a href="#contact" className="btn-primary">Let's Work Together</a>
        </div>
      </div>
    </section>
  )
}
