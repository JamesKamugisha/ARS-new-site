import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ImagePlaceholder from '../components/ImagePlaceholder'
import './ServicesPage.css'

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

const services = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 28S4 20 4 12a6 6 0 0 1 6-6c2.8 0 4.8 1.5 6 3.5C17.2 7.5 19.2 6 22 6a6 6 0 0 1 6 6c0 8-12 16-12 16z" />
      </svg>
    ),
    title: 'Personal Care',
    desc: 'Assisting with daily hygiene, grooming, and household routines to support comfort and independence.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="4" />
        <circle cx="22" cy="10" r="4" />
        <path d="M4 24c0-3.3 2.7-6 6-6h1M21 18h1c3.3 0 6 2.7 6 6" />
        <path d="M16 16v8M12 20h8" />
      </svg>
    ),
    title: 'Social Skills',
    desc: 'Helping individuals build meaningful social interactions and navigate community life with confidence.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 24V10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14" />
        <path d="M2 24h28" />
        <path d="M12 16h8M12 20h5" />
      </svg>
    ),
    title: 'Communication Skills',
    desc: 'Strengthening each individual\'s ability to communicate effectively with family, support teams, and the wider community.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="24" height="20" rx="2" />
        <path d="M4 12h24" />
        <path d="M10 6v-2M22 6v-2" />
        <path d="M10 18h4M10 22h8" />
      </svg>
    ),
    title: 'Household Routines',
    desc: 'Planning and establishing daily routines that promote structure, responsibility, and self-sufficiency.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 10v6l4 3" />
        <path d="M12 20l-2 4M20 20l2 4" />
      </svg>
    ),
    title: 'Financial Management',
    desc: 'Assisting individuals with budgeting, bill management, and developing practical money skills.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="14" width="20" height="12" rx="3" />
        <path d="M10 14V10a6 6 0 0 1 12 0v4" />
        <circle cx="16" cy="21" r="1.5" fill="currentColor" stroke="none" />
        <path d="M16 22.5V25" />
      </svg>
    ),
    title: 'Transportation',
    desc: 'Providing reliable, safe transportation to appointments, work, and community activities.',
  },
]

const programs = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 28V14l12-10 12 10v14H20v-8h-8v8z" />
      </svg>
    ),
    title: 'Residential Group Homes',
    desc: 'Safe, structured living environments where individuals receive around-the-clock support in a home-like setting.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="8" r="3" />
        <circle cx="22" cy="8" r="3" />
        <path d="M4 22c0-3.3 2.7-6 6-6s6 2.7 6 6M16 22c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M16 16v-4" />
      </svg>
    ),
    title: 'Shared Living Arrangements',
    desc: 'Personalized living arrangements that pair individuals with trained providers in a family-style environment.',
  },
]

export default function ServicesPage() {
  return (
    <div className="page services-page">
      {/* Section 1 — Hero */}
      <HeroSection
        variant="page"
        tag="What We Offer"
        title="Our Services"
        subtitle="Comprehensive support designed to empower independence and enhance quality of life."
      />

      {/* Section 2 — Services Overview */}
      <AnimatedSection className="section svc-overview">
        <div className="container">
          <span className="tag">Services</span>
          <h2>How Can We Help You?</h2>
          <div className="svc-grid">
            {services.map((s) => (
              <div key={s.title} className="svc-card">
                <div className="svc-card-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="svc-card-link">Learn more &rarr;</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Section 3 — Programs */}
      <AnimatedSection className="section svc-programs">
        <div className="container">
          <span className="tag">Our Programs</span>
          <h2>Who We Serve</h2>
          <div className="programs-grid">
            <div className="program-card">
              <img src="/services-group-home.png" alt="Residential group home interior" className="program-card-img" />
              <div className="program-icon">{programs[0].icon}</div>
              <h3>{programs[0].title}</h3>
              <p>{programs[0].desc}</p>
            </div>
            <div className="program-card">
              <img src="/services-shared-living.png" alt="Shared living — caregiver and resident" className="program-card-img" />
              <div className="program-icon">{programs[1].icon}</div>
              <h3>{programs[1].title}</h3>
              <p>{programs[1].desc}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 4 — CTA */}
      <AnimatedSection className="section svc-cta">
        <div className="container svc-cta-inner">
          <h2>Ready to get started?</h2>
          <p>Get in touch to learn more about how we can support you or the individuals in your life.</p>
          <div className="svc-cta-buttons">
            <Link to="/contact" className="btn-accent">Contact Us</Link>
            <Link to="/join-our-team" className="btn-cta-outline-white">Join Our Team</Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
