import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoTransparent from '../assets/logo-transparent.png'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <img src={logoTransparent} alt="ARS" className="navbar-logo-img" />
          <span className="navbar-logo-tagline">Assurance Residential Services</span>
        </Link>

        <div className="navbar-links">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`navbar-link${location.pathname === path ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link to="/join-our-team" className="btn-primary navbar-cta">
          Join Our Team
        </Link>

        <button
          className={`hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`mobile-link${location.pathname === path ? ' active' : ''}`}
              >
                {label}
              </Link>
            ))}
            <Link to="/join-our-team" className="btn-primary mobile-cta">
              Join Our Team
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
