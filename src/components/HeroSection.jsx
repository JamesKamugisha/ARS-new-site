import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './HeroSection.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
})

export default function HeroSection({ title, subtitle, tag, cta, variant = 'page' }) {
  const isHome = variant === 'home'

  return (
    <section className={`hero ${isHome ? 'hero-home' : 'hero-page'}`}>
      {isHome && <div className="hero-orb" />}

      <div className="container hero-content">
        {tag && (
          <motion.span
            className={`tag ${isHome ? 'tag-inverted' : ''}`}
            {...fadeUp(0)}
          >
            {tag}
          </motion.span>
        )}

        <motion.h1 className="hero-title" {...fadeUp(0.15)}>
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p className="hero-subtitle" {...fadeUp(0.3)}>
            {subtitle}
          </motion.p>
        )}

        {isHome && cta && (
          <motion.div {...fadeUp(0.45)}>
            <Link to={cta.to} className="btn-accent hero-cta">
              {cta.label}
            </Link>
          </motion.div>
        )}
      </div>

      {isHome && <div className="hero-fade" />}
    </section>
  )
}
