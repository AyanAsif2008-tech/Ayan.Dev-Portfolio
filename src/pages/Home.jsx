import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Education from '../components/Education.jsx'
import Projects from '../components/Projects.jsx'
import Skills from '../components/Skills.jsx'
import Contact from '../components/Contact.jsx'

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    document.title = 'Porfolio'
  }, [])

  // Opening the site with a #section in the URL (e.g. /#skills) scrolls to that section
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView(), 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}
