// One fixed, glowing background shared by every section and page
export default function Background() {
  return (
    <div className="site-bg" aria-hidden="true">
      <span className="glow-orb orb-1"></span>
      <span className="glow-orb orb-2"></span>
      <span className="glow-orb orb-3"></span>
    </div>
  )
}
