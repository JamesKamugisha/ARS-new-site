import { Link } from 'react-router-dom'
import logoWhiteBg from '/logo-white-bg.png'
import './Footer.css'

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
  { path: '/join-our-team', label: 'Join Our Team' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-about">
          <div className="footer-logo">
            <img src={logoWhiteBg} alt="ARS" className="footer-logo-img" />
          </div>
          <p className="footer-mission">
            Providing compassionate residential care across Maine since 2024.
          </p>
          <p className="footer-copyright-inline">
            &copy; 2026 Assurance Residential Services LLC
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map(({ path, label }) => (
              <li key={path}>
                <Link to={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Get In Touch</h4>
          <ul className="footer-contact">
            <li>699 Sabattus St, Lewiston, ME 04240</li>
            <li>
              <a href="mailto:info@assurenceres.net">info@assurenceres.net</a>
            </li>
            <li>
              <a href="tel:+18572047623">(857) 204-7623</a>
            </li>
            <li>
              <a href="tel:+18176662275">(817) 666-2275</a>
            </li>
            <li>
              <a href="tel:+12074231834">(207) 423-1834</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <span>&copy; 2026 Assurance Residential Services LLC</span>
          <span>Powered by ARS</span>
        </div>
      </div>
    </footer>
  )
}
