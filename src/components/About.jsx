export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Section Header */}
        <div className="about-header" data-aos="fade-up">
          <span className="badge-tag"><i className="ri-terminal-box-line"></i> SYSTEM PROFILE</span>
          <h2 className="section-title">About <span className="highlight">Me</span></h2>
          <p className="section-subtitle">Crafting robust backend logic and seamless, immersive frontend experiences.</p>
        </div>

        <div className="about-grid">
          {/* Left Bento Card: Bio & Passion */}
          <div className="bento-card bio-bento" data-tilt data-aos="fade-up">
            <div className="glow-spot"></div>
            <div className="card-inner">
              <div className="card-top-row">
                <div className="icon-box"><i className="ri-user-star-line"></i></div>
                <span className="status-badge"><i className="ri-checkbox-circle-fill"></i> Available for Hire</span>
              </div>
              <h3>Engineering Digital Excellence</h3>
              <p>
                I am <strong>Ayan Asif</strong>, a dedicated Full-Stack Web Developer based in Karachi. I specialize in building responsive, high performance web apps that merge creative UI/UX design with scalable server side architecture.
              </p>
              <p>
                I'm a passionate <strong>Frontend Developer</strong> with a strong eye for clean design and user friendly interfaces. I focus on building responsive, modern web experiences, and I'm currently expanding my skills by stepping into <strong>Backend Development</strong> to become a more complete full stack developer.
              </p>
              <p>
                My recent work includes <strong>Pleasant Travel &amp; Tours</strong> and <strong>Ayan Impex</strong> responsive websites built with clean, professional layouts and smooth navigation.
              </p>

              <div className="tech-stack-pills">
                <span className="pill"><i className="ri-reactjs-line" style={{ color: '#38bdf8' }}></i> React</span>
                <span className="pill"><i className="ri-nodejs-fill" style={{ color: '#22c55e' }}></i> Node.js</span>
                <span className="pill"><i className="ri-php-line" style={{ color: '#ef4444' }}></i> PHP / Laravel</span>
                <span className="pill"><i className="ri-tailwind-css-fill" style={{ color: '#38bdf8' }}></i> Tailwind</span>
                <span className="pill"><i className="ri-database-2-line" style={{ color: '#38bdf8' }}></i> MySQL</span>
              </div>
            </div>
          </div>

          {/* Right Column Bento Cards */}
          <div className="bento-right">
            <div className="bento-card mini-bento" data-tilt data-aos="fade-up" data-aos-delay="150">
              <div className="glow-spot"></div>
              <div className="card-inner">
                <div className="mini-icon-title">
                  <div className="icon-box small"><i className="ri-compass-3-line"></i></div>
                  <div>
                    <h4>Currently Exploring</h4>
                    <span className="inst-highlight">Growing beyond the frontend</span>
                  </div>
                </div>
                <ul className="check-list">
                  <li><i className="ri-check-line"></i> Backend Development with PHP &amp; Laravel</li>
                  <li><i className="ri-check-line"></i> Full-stack apps with Node.js &amp; MySQL</li>
                  <li><i className="ri-check-line"></i> Modern, component-based UIs with React.js</li>
                </ul>
              </div>
            </div>

            <div className="bento-card mini-bento" data-tilt data-aos="fade-up" data-aos-delay="300">
              <div className="glow-spot"></div>
              <div className="card-inner">
                <div className="mini-icon-title">
                  <div className="icon-box small"><i className="ri-lightbulb-line"></i></div>
                  <div>
                    <h4>My Approach</h4>
                    <span className="inst-highlight">How I build for the web</span>
                  </div>
                </div>
                <ul className="check-list">
                  <li><i className="ri-check-line"></i> Clean, readable and reusable code</li>
                  <li><i className="ri-check-line"></i> Responsive, mobile friendly layouts</li>
                  <li><i className="ri-check-line"></i> User friendly interfaces that feel smooth</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* What I focus on */}
        <div className="about-focus">
          <div className="bento-card focus-card" data-tilt data-aos="fade-up" data-aos-delay="0">
            <div className="glow-spot"></div>
            <div className="card-inner">
              <div className="icon-box small"><i className="ri-smartphone-line"></i></div>
              <h4>Responsive Web Design</h4>
              <p>Layouts that adapt cleanly to every screen size, from mobile phones to large desktop displays.</p>
            </div>
          </div>
          <div className="bento-card focus-card" data-tilt data-aos="fade-up" data-aos-delay="130">
            <div className="glow-spot"></div>
            <div className="card-inner">
              <div className="icon-box small"><i className="ri-palette-line"></i></div>
              <h4>Clean UI / UX</h4>
              <p>Modern, user-friendly interfaces with a strong eye for clean design and continuously improving user experience.</p>
            </div>
          </div>
          <div className="bento-card focus-card" data-tilt data-aos="fade-up" data-aos-delay="260">
            <div className="glow-spot"></div>
            <div className="card-inner">
              <div className="icon-box small"><i className="ri-stack-line"></i></div>
              <h4>Growing Full-Stack</h4>
              <p>Building on a strong frontend foundation by exploring PHP, Laravel and backend development.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
