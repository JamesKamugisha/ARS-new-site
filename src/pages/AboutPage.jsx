import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ImagePlaceholder from '../components/ImagePlaceholder'
import './AboutPage.css'

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

const stats = [
  { value: '6', label: 'Locations' },
  { value: '2', label: 'Programs' },
  { value: '100%', label: 'Individual-Centered' },
]

const mvvCards = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <circle cx="16" cy="16" r="7" />
        <circle cx="16" cy="16" r="2.5" />
      </svg>
    ),
    title: 'Mission',
    text: 'To find creative ways to meet the unique needs of those we serve and our employees by creating a kind and caring environment.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="16" cy="16" rx="12" ry="8" />
        <circle cx="16" cy="16" r="3.5" />
        <circle cx="16" cy="16" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: 'Vision',
    text: 'A safe and healthy environment where everyone is valued, heard, and cared for.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 2l4.2 8.6L30 12l-7 6.8L24.6 28 16 23.4 7.4 28 9 18.8 2 12l9.8-1.4z" />
      </svg>
    ),
    title: 'Values',
    values: ['Caring', 'Kindness', 'Open and Honest', 'Meaningful Teamwork', 'Communication'],
  },
]

const steps = [
  { num: '01', title: 'Community Integration', desc: 'Helping individuals build connections and participate actively in their local communities.' },
  { num: '02', title: 'Relationships & Employment', desc: 'Supporting meaningful relationships and employment opportunities tailored to individual goals.' },
  { num: '03', title: 'Personal Finances', desc: 'Providing guidance on budgeting, saving, and responsible financial management skills.' },
  { num: '04', title: 'Food Choices', desc: 'Encouraging healthy nutrition habits and supporting individuals in making informed food decisions.' },
  { num: '05', title: 'Medical Services', desc: 'Coordinating healthcare access and ensuring consistent, quality medical support.' },
  { num: '06', title: 'Health & Safety', desc: 'Maintaining safe living environments and promoting physical and emotional well-being.' },
]

const features = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14c0-2.2 1.8-4 4-4s4 1.8 4 4" />
        <circle cx="16" cy="8" r="3" />
        <circle cx="8" cy="14" r="2.5" />
        <circle cx="24" cy="14" r="2.5" />
        <path d="M5.5 20c0-1.7 1.1-3 2.5-3M24 17c1.4 0 2.5 1.3 2.5 3M10 28v-4c0-3.3 2.7-6 6-6s6 2.7 6 6v4" />
      </svg>
    ),
    label: 'Compassionate Team',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 28S4 20 4 12a6 6 0 0 1 6-6c2.8 0 4.8 1.5 6 3.5C17.2 7.5 19.2 6 22 6a6 6 0 0 1 6 6c0 8-12 16-12 16z" />
      </svg>
    ),
    label: 'Personalized Care',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <path d="M10 16h12M16 10v12" />
      </svg>
    ),
    label: 'Community-Centered',
  },
]

export default function AboutPage() {
  return (
    <div className="page about-page">
      {/* Section 1 — Hero */}
      <HeroSection
        variant="page"
        tag="About Us"
        title="Who We Are"
        subtitle="Building compassionate relationships, one person at a time."
      />

      {/* Section 2 — Who We Are */}
      <AnimatedSection className="section about-intro">
        <div className="container about-intro-grid">
          <div className="about-intro-text">
            <span className="tag">Our Story</span>
            <h2>Committed to Exceptional Care</h2>
            <p>
              Assurance Residential Services provides compassionate, individual-centered
              care for people with intellectual disabilities, autism, and behavioral health
              challenges across Maine. Our team is dedicated to empowering individuals to
              live fulfilling, independent lives within their communities.
            </p>
            <p>
              We believe that every person deserves access to high-quality support that
              respects their dignity, celebrates their strengths, and helps them achieve
              their personal goals. Since our founding, we have grown to serve multiple
              communities while maintaining the personalized attention that defines our
              approach.
            </p>
          </div>
          <div className="about-right-col">
            <img src="/about-team.png" alt="ARS caregivers team" className="about-team-img" />
            <div className="about-stats-row">
              {stats.map((s) => (
                <div key={s.label} className="about-stat">
                  <span className="about-stat-value">{s.value}</span>
                  <span className="about-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 3 — Mission, Vision, Values */}
      <AnimatedSection className="section about-mvv">
        <div className="container">
          <span className="tag">Our Foundation</span>
          <h2>Mission, Vision &amp; Values</h2>
          <div className="mvv-grid">
            {mvvCards.map((card) => (
              <div key={card.title} className="mvv-card">
                <div className="mvv-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                {card.text && <p>{card.text}</p>}
                {card.values && (
                  <div className="mvv-values">
                    {card.values.map((v) => (
                      <span key={v} className="mvv-value-pill">{v}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Section 4 — Our Approach */}
      <AnimatedSection className="section about-approach">
        <div className="container">
          <span className="tag">Our Approach</span>
          <h2>How We Work With You</h2>
          <div className="approach-grid">
            {steps.map((step) => (
              <div key={step.num} className="approach-step">
                <span className="approach-num">{step.num}</span>
                <div>
                  <h3 className="approach-title">{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Section 5 — Why Choose Us */}
      <AnimatedSection className="section about-why">
        <div className="container about-why-inner">
          <h2>Why Choose ARS?</h2>
          <div className="about-why-image">
            <img src="/about-community.png" alt="Individuals and caregivers in community" className="about-why-img" />
          </div>
          <p className="about-why-body">
            We combine professional expertise with genuine compassion to deliver care
            that truly makes a difference. Our team is committed to building lasting
            relationships and creating positive outcomes for every individual we serve.
          </p>
          <div className="about-features">
            {features.map((f) => (
              <div key={f.label} className="about-feature">
                <div className="about-feature-icon">{f.icon}</div>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
