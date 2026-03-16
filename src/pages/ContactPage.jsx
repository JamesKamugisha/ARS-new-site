import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ImagePlaceholder from '../components/ImagePlaceholder'
import './ContactPage.css'

const locations = ['Auburn', 'Lewiston', 'Portland', 'Gray', 'Augusta', 'Bangor']

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Full name is required.'
  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!form.email.includes('@')) errors.email = 'Please enter a valid email.'
  if (!form.phone.trim()) errors.phone = 'Phone number is required.'
  if (!form.subject) errors.subject = 'Please select a subject.'
  if (!form.message.trim()) errors.message = 'Message is required.'
  return errors
}

export default function ContactPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 800)
  }

  const resetForm = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className="page contact-page">
      <HeroSection
        variant="page"
        tag="Get In Touch"
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out and we'll respond promptly."
      />

      <section className="section contact-layout" ref={ref}>
        <div className="container contact-grid">
          {/* Left — Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3>Reach Us Directly</h3>

            <div className="contact-block">
              <div className="contact-block-icon">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4C10.5 4 6 8.5 6 14c0 7.5 10 14 10 14s10-6.5 10-14c0-5.5-4.5-10-10-10z" />
                  <circle cx="16" cy="14" r="3.5" />
                </svg>
              </div>
              <div>
                <p className="contact-block-label">Address</p>
                <p>699 Sabattus St, Lewiston, ME 04240</p>
              </div>
            </div>

            <div className="contact-block">
              <div className="contact-block-icon">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                  <path d="M28 8l-12 9L4 8" />
                </svg>
              </div>
              <div>
                <p className="contact-block-label">Phone</p>
                <p><a href="tel:+18572047623">(857) 204-7623</a></p>
                <p><a href="tel:+18176662275">(817) 666-2275</a></p>
                <p><a href="tel:+12074231834">(207) 423-1834</a></p>
              </div>
            </div>

            <div className="contact-block">
              <div className="contact-block-icon">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="8" width="24" height="16" rx="2" />
                  <path d="M4 10l12 8 12-8" />
                </svg>
              </div>
              <div>
                <p className="contact-block-label">Email</p>
                <p><a href="mailto:info@assurenceres.net">info@assurenceres.net</a></p>
              </div>
            </div>

            <p className="contact-availability">
              Our team is available Monday–Friday, 9am–5pm EST. For urgent care matters, call us directly.
            </p>

            <div className="contact-locations">
              {locations.map((loc) => (
                <span key={loc} className="location-pill">{loc}</span>
              ))}
            </div>

            <div className="contact-map-placeholder">
              <img src="/contact-office.png" alt="ARS office — Lewiston ME" className="contact-office-img" />
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {submitted ? (
              <div className="contact-success">
                <svg className="contact-success-icon" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="#27ae60" strokeWidth="2.5" />
                  <path d="M14 24l7 7 13-13" stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3>Thank you!</h3>
                <p>We've received your message and will be in touch within 1 business day.</p>
                <button className="btn-primary" onClick={resetForm}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className={`form-group${errors.name ? ' has-error' : ''}`}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className={`form-group${errors.email ? ' has-error' : ''}`}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className={`form-group${errors.phone ? ' has-error' : ''}`}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className={`form-group${errors.subject ? ' has-error' : ''}`}>
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="care">Care Services</option>
                    <option value="employment">Employment</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <span className="form-error">{errors.subject}</span>}
                </div>

                <div className={`form-group${errors.message ? ' has-error' : ''}`}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn-primary contact-submit" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
