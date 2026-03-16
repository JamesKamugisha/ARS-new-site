import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ImagePlaceholder from '../components/ImagePlaceholder'
import './HomePage.css'

function AnimatedSection({ children, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.section>
  )
}

const cards = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 28S4 20 4 12a6 6 0 0 1 6-6c2.8 0 4.8 1.5 6 3.5C17.2 7.5 19.2 6 22 6a6 6 0 0 1 6 6c0 8-12 16-12 16z" />
      </svg>
    ),
    title: 'Personal Care',
    desc: 'Dedicated support for daily living activities, promoting dignity and independence in every interaction.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4v6M16 22v6M28 16h-6M10 16H4M24.5 7.5l-4.2 4.2M11.7 20.3l-4.2 4.2M24.5 24.5l-4.2-4.2M11.7 11.7L7.5 7.5" />
        <circle cx="16" cy="16" r="4" />
      </svg>
    ),
    title: 'Quality of Life',
    desc: 'Enriching programs that foster social connections, recreation, and meaningful community participation.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="10" r="5" />
        <path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" />
      </svg>
    ),
    title: 'Individual-Centered Approach',
    desc: 'Tailored care plans built around each person\'s unique strengths, preferences, and goals.',
  },
]

const services = [
  { num: '01', name: 'Personal Care', desc: 'Assistance with daily living activities and personal hygiene routines.' },
  { num: '02', name: 'Social Skills', desc: 'Building meaningful relationships and community connections.' },
  { num: '03', name: 'Communication Skills', desc: 'Developing effective verbal and non-verbal communication.' },
  { num: '04', name: 'Household Routines', desc: 'Supporting independent living through daily household management.' },
  { num: '05', name: 'Financial Management', desc: 'Guidance with budgeting, spending, and financial literacy.' },
  { num: '06', name: 'Transportation', desc: 'Safe and reliable transportation to appointments and activities.' },
]

const locations = ['Auburn', 'Lewiston', 'Portland', 'Gray', 'Augusta', 'Bangor']

export default function HomePage() {
  return (
    <div className="page home-page">
      {/* Section 1 — Hero */}
      <div style={{ position: 'relative' }}>
        <HeroSection
          variant="home"
          tag="Compassionate Care in Maine"
          title="Making a Meaningful Difference"
          subtitle="We provide compassionate, personalized support and care to help those we serve live fulfilling, independent lives."
          cta={{ label: 'Join Our Team', to: '/join-our-team' }}
        />
        <div className="hero-bg-image">
          <img src="/hero-caregiver.png" alt="Caregiver supporting an individual" />
        </div>
      </div>

      {/* Section 2 — What We Do */}
      <AnimatedSection className="section what-we-do">
        <div className="container">
          <span className="tag">Our Work</span>
          <h2>Care That Empowers</h2>
          <div className="what-we-do-image">
            <img src="/clients-activity.png" alt="Individuals participating in an activity" className="what-we-do-img" />
          </div>
          <div className="card-grid">
            {cards.map((card) => (
              <div key={card.title} className="care-card">
                <div className="care-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Section 3 — Services Strip */}
      <AnimatedSection className="section services-strip">
        <div className="container">
          <span className="tag">Services</span>
          <h2>How We Help</h2>
          <div className="services-grid">
            {services.map((s) => (
              <div key={s.num} className="service-item">
                <span className="service-num">{s.num}</span>
                <h3 className="service-name">{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Section 4 — Locations */}
      <AnimatedSection className="section locations-section">
        <div className="container">
          <span className="tag">Where We Serve</span>
          <h2>Serving Communities Across Maine</h2>
          <div className="location-pills">
            {locations.map((loc) => (
              <span key={loc} className="location-pill">{loc}</span>
            ))}
          </div>
          <p className="locations-note text-muted">
            Our widespread presence ensures access to exceptional care throughout Maine.
          </p>
        </div>
      </AnimatedSection>

      {/* Section 5 — CEO Quote */}
      <AnimatedSection className="section ceo-quote">
        <div className="container ceo-quote-inner">
          <div className="ceo-portrait">
            <img src="/ceo-portrait.jpg" alt="Bernard Katende, CEO" className="ceo-portrait-img" />
          </div>
          <div className="ceo-quote-content">
            <span className="ceo-quote-mark">&ldquo;</span>
            <blockquote className="ceo-quote-text">
              We are proud of the work we do
            </blockquote>
            <p className="ceo-quote-attr">&mdash; Bernard Katende, CEO</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 6 — CTA Banner */}
      <AnimatedSection className="section cta-banner">
        <div className="container cta-banner-inner">
          <h2>Ready to Make a Difference?</h2>
          <p>Join our compassionate team of caregivers across Maine.</p>
          <div className="cta-banner-buttons">
            <Link to="/join-our-team" className="btn-cta-white">Join Our Team</Link>
            <Link to="/contact" className="btn-cta-outline">Contact Us</Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
