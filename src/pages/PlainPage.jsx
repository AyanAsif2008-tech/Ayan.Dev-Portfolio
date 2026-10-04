import { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'

// About / Projects / Skills / Contact pages: same as the original HTML files
// (navbar only for now, with the matching link highlighted).
export default function PlainPage({ title }) {
  useEffect(() => {
    document.title = title
  }, [title])

  return <Navbar />
}
