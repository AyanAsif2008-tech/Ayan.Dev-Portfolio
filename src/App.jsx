import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PlainPage from './pages/PlainPage.jsx'
import Background from './components/Background.jsx'
import CursorEffect from './components/CursorEffect.jsx'

export default function App() {
  return (
    <>
    <Background />
    <CursorEffect />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<PlainPage title="About Me" />} />
      <Route path="/education" element={<PlainPage title="Education" />} />
      <Route path="/projects" element={<PlainPage title="My Projects" />} />
      <Route path="/skills" element={<PlainPage title="My Skills" />} />
      <Route path="/contact" element={<PlainPage title="Get In Touch" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}
