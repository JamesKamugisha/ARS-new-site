import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ImagePlaceholder from '../components/ImagePlaceholder'
import './JoinTeamPage.css'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
]

const CERTS = ['DSP', 'CRMA', 'CPI', 'HCBS (Annual)', 'CPR']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const benefits = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 28S4 20 4 12a6 6 0 0 1 6-6c2.8 0 4.8 1.5 6 3.5C17.2 7.5 19.2 6 22 6a6 6 0 0 1 6 6c0 8-12 16-12 16z" />
      </svg>
    ),
    title: 'Meaningful Work',
    desc: 'Support individuals to live fuller, more independent lives.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 8v8l5 3" />
      </svg>
    ),
    title: 'Flexible Scheduling',
    desc: 'Choose the days that work for you.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 28V18M16 28V10M24 28V4" />
      </svg>
    ),
    title: 'Growth Opportunities',
    desc: 'DSP, House Manager, and leadership tracks.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="4" />
        <circle cx="22" cy="10" r="4" />
        <path d="M4 24c0-3.3 2.7-6 6-6s6 2.7 6 6M16 24c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    ),
    title: 'Supportive Team',
    desc: 'A culture built on kindness and collaboration.',
  },
]

const initialForm = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '',
  role: '', certifications: [], days: [],
  about: '', resume: null,
}

function validateStep(step, form) {
  const errors = {}
  if (step === 1) {
    if (!form.firstName.trim()) errors.firstName = 'First name is required.'
    if (!form.lastName.trim()) errors.lastName = 'Last name is required.'
    if (!form.email.trim()) errors.email = 'Email is required.'
    else if (!form.email.includes('@')) errors.email = 'Please enter a valid email.'
    if (!form.phone.trim()) errors.phone = 'Phone is required.'
    if (!form.address.trim()) errors.address = 'Address is required.'
    if (!form.city.trim()) errors.city = 'City is required.'
    if (!form.state) errors.state = 'State is required.'
    if (!form.zip.trim()) errors.zip = 'Zip code is required.'
  } else if (step === 2) {
    if (!form.role) errors.role = 'Please select a role.'
  } else if (step === 3) {
    if (!form.about.trim()) errors.about = 'Please tell us about yourself.'
  }
  return errors
}

function StepIndicator({ current }) {
  const labels = ['Personal Info', 'Availability & Role', 'About You']
  return (
    <div className="step-indicator">
      {labels.map((label, i) => {
        const num = i + 1
        const done = current > num
        const active = current === num
        return (
          <div key={num} className="step-indicator-item">
            {i > 0 && <div className={`step-line${done ? ' done' : ''}`} />}
            <div className={`step-circle${active ? ' active' : ''}${done ? ' done' : ''}`}>
              {done ? (
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8l3.5 3.5L13 5" />
                </svg>
              ) : num}
            </div>
            <span className={`step-label${active ? ' active' : ''}`}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function JoinTeamPage() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [direction, setDirection] = useState(1) // 1=forward, -1=back

  const set = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleChange = (e) => set(e.target.name, e.target.value)

  const toggleArray = (field, val) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(val)
        ? prev[field].filter((v) => v !== val)
        : [...prev[field], val],
    }))
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0] || null
    set('resume', file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0] || null
    set('resume', file)
  }

  const next = () => {
    const errs = validateStep(currentStep, form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setDirection(1)
    setCurrentStep((s) => s + 1)
    setErrors({})
  }

  const back = () => {
    setDirection(-1)
    setCurrentStep((s) => s - 1)
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validateStep(3, form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 800)
  }

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  }

  return (
    <div className="page join-team-page">
      <HeroSection
        variant="page"
        tag="Careers"
        title="Join Our Team"
        subtitle="Be part of a compassionate team making a real difference in people's lives across Maine."
      />

      <section className="section jt-layout" ref={sectionRef}>
        <div className="container jt-grid">
          {/* Left — Benefits */}
          <motion.div
            className="jt-sidebar"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img src="/join-team-field.png" alt="ARS team member in the field" className="jt-sidebar-img" />
            <h3>Why Work With Us?</h3>
            <div className="jt-benefits">
              {benefits.map((b) => (
                <div key={b.title} className="jt-benefit">
                  <div className="jt-benefit-icon">{b.icon}</div>
                  <div>
                    <strong>{b.title}</strong>
                    <p>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="jt-sidebar-contact">
              <p className="jt-sidebar-contact-label">Questions? Call us:</p>
              <a href="tel:+18572047623">(857) 204-7623</a>
              <a href="tel:+18176662275">(817) 666-2275</a>
              <a href="tel:+12074231834">(207) 423-1834</a>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="jt-form-card"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {submitted ? (
              <div className="jt-success">
                <svg className="jt-success-icon" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="#27ae60" strokeWidth="2.5" />
                  <path d="M14 24l7 7 13-13" stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3>Application Submitted!</h3>
                <p>
                  Thank you {form.firstName}! We'll review your application and reach out
                  to {form.email} within 3–5 business days.
                </p>
                <Link to="/" className="btn-primary">Return Home</Link>
              </div>
            ) : (
              <>
                <StepIndicator current={currentStep} />
                <form onSubmit={handleSubmit} noValidate>
                  <AnimatePresence mode="wait" custom={direction}>
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35 }}
                        className="jt-step"
                      >
                        <div className="form-row">
                          <div className={`form-group${errors.firstName ? ' has-error' : ''}`}>
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" />
                            {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                          </div>
                          <div className={`form-group${errors.lastName ? ' has-error' : ''}`}>
                            <label htmlFor="lastName">Last Name</label>
                            <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" />
                            {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                          </div>
                        </div>
                        <div className={`form-group${errors.email ? ' has-error' : ''}`}>
                          <label htmlFor="jt-email">Email</label>
                          <input id="jt-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                          {errors.email && <span className="form-error">{errors.email}</span>}
                        </div>
                        <div className={`form-group${errors.phone ? ' has-error' : ''}`}>
                          <label htmlFor="jt-phone">Phone</label>
                          <input id="jt-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" />
                          {errors.phone && <span className="form-error">{errors.phone}</span>}
                        </div>
                        <div className={`form-group${errors.address ? ' has-error' : ''}`}>
                          <label htmlFor="address">Address Line 1</label>
                          <input id="address" name="address" value={form.address} onChange={handleChange} placeholder="Street address" />
                          {errors.address && <span className="form-error">{errors.address}</span>}
                        </div>
                        <div className="form-row form-row-3">
                          <div className={`form-group${errors.city ? ' has-error' : ''}`}>
                            <label htmlFor="city">City</label>
                            <input id="city" name="city" value={form.city} onChange={handleChange} placeholder="City" />
                            {errors.city && <span className="form-error">{errors.city}</span>}
                          </div>
                          <div className={`form-group${errors.state ? ' has-error' : ''}`}>
                            <label htmlFor="state">State</label>
                            <select id="state" name="state" value={form.state} onChange={handleChange}>
                              <option value="">State</option>
                              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.state && <span className="form-error">{errors.state}</span>}
                          </div>
                          <div className={`form-group${errors.zip ? ' has-error' : ''}`}>
                            <label htmlFor="zip">Zip Code</label>
                            <input id="zip" name="zip" value={form.zip} onChange={handleChange} placeholder="00000" />
                            {errors.zip && <span className="form-error">{errors.zip}</span>}
                          </div>
                        </div>
                        <button type="button" className="btn-primary jt-btn-full" onClick={next}>Next Step &rarr;</button>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35 }}
                        className="jt-step"
                      >
                        <div className={`form-group${errors.role ? ' has-error-group' : ''}`}>
                          <label>Job Applying For</label>
                          <div className="role-cards">
                            <button
                              type="button"
                              className={`role-card${form.role === 'dsp' ? ' selected' : ''}`}
                              onClick={() => set('role', 'dsp')}
                            >
                              <strong>DSP</strong>
                              <span>Direct Support Professional</span>
                            </button>
                            <button
                              type="button"
                              className={`role-card${form.role === 'hm' ? ' selected' : ''}`}
                              onClick={() => set('role', 'hm')}
                            >
                              <strong>House Manager</strong>
                              <span>Residential Leadership</span>
                            </button>
                          </div>
                          {errors.role && <span className="form-error">{errors.role}</span>}
                        </div>

                        <div className="form-group">
                          <label>Certifications</label>
                          <div className="pill-grid">
                            {CERTS.map((c) => (
                              <button
                                key={c}
                                type="button"
                                className={`pill-check${form.certifications.includes(c) ? ' checked' : ''}`}
                                onClick={() => toggleArray('certifications', c)}
                              >
                                {c}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Available Days</label>
                          <div className="pill-row">
                            {DAYS.map((d) => (
                              <button
                                key={d}
                                type="button"
                                className={`pill-check${form.days.includes(d) ? ' checked' : ''}`}
                                onClick={() => toggleArray('days', d)}
                              >
                                {d}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="jt-nav-row">
                          <button type="button" className="jt-back-link" onClick={back}>&larr; Back</button>
                          <button type="button" className="btn-primary jt-btn-grow" onClick={next}>Next Step &rarr;</button>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35 }}
                        className="jt-step"
                      >
                        <div className={`form-group${errors.about ? ' has-error' : ''}`}>
                          <label htmlFor="about">Tell us about yourself</label>
                          <textarea
                            id="about"
                            name="about"
                            rows="6"
                            value={form.about}
                            onChange={handleChange}
                            placeholder="Share your experience, motivation, and why you want to work with ARS..."
                          />
                          {errors.about && <span className="form-error">{errors.about}</span>}
                        </div>

                        <div className="form-group">
                          <label>Resume (optional)</label>
                          <div
                            className="upload-zone"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                          >
                            {form.resume ? (
                              <div className="upload-file">
                                <span className="upload-filename">{form.resume.name}</span>
                                <button type="button" className="upload-remove" onClick={() => set('resume', null)}>&times;</button>
                              </div>
                            ) : (
                              <>
                                <svg className="upload-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M4 22v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4" />
                                  <path d="M16 4v16M10 10l6-6 6 6" />
                                </svg>
                                <p className="upload-text">Click or drag your resume here</p>
                                <input type="file" className="upload-input" onChange={handleFile} accept=".pdf,.doc,.docx" />
                              </>
                            )}
                          </div>
                        </div>

                        <div className="jt-nav-row">
                          <button type="button" className="jt-back-link" onClick={back}>&larr; Back</button>
                          <button type="submit" className="btn-accent jt-btn-grow" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Application'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
