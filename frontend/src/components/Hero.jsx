import { motion, useScroll, useTransform } from 'framer-motion';
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';
import MagneticButton from './MagneticButton';
import { staggerContainer, staggerChild, float, pulseGlow } from '../animations/variants';
import { personal } from '../data/personal';
import './Hero.css';

const socials = [
  { icon: <FiGithub size={20} />, href: personal.github, label: 'GitHub' },
  { icon: <FiLinkedin size={20} />, href: personal.linkedin, label: 'LinkedIn' },
  { icon: <FiMail size={20} />, href: `mailto:${personal.email}`, label: 'Email' },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 500], [0, -60]);
  const contentY = useTransform(scrollY, [0, 500], [0, -30]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-grid" />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="hero-particle"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: `${4 + (i % 3) * 3}px`,
            height: `${4 + (i % 3) * 3}px`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}

      <div className="container hero-container">
        {/* Profile Photo */}
        <motion.div
          className="hero-photo-wrapper"
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.4, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="hero-photo-ring" animate={float}>
            <div className="hero-photo">
              <img
                src="/profile/WhatsApp Image 2026-05-21 at 12.48.17 PM.jpeg"
                alt="Ponesakki M"
                className="profile-img"
                onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
              <div className="photo-placeholder" style={{display:'none'}}>
              </div>
            </div>
          </motion.div>

          <motion.div className="hero-photo-glow" animate={pulseGlow} />

          <motion.div
            className="status-badge"
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 120 }}
          >
            <span className="status-dot" />
            Open to opportunities
          </motion.div>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          className="hero-content"
          style={{ y: contentY, opacity }}
          variants={staggerContainer(0.12, 0.2)}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="hero-name" variants={staggerChild}>
            Hi, I'm <span className="name-highlight">Ponesakki M</span>
          </motion.h1>

          <motion.p className="hero-bio" variants={staggerChild}>
            Aspiring AI and Data Science engineer passionate about building intelligent and impactful technology solutions.
            Experienced in machine learning, data analytics, and full-stack development through academic projects, internships, and hackathons.
            Strong problem-solving abilities with a keen interest in applying AI to real-world challenges.
          </motion.p>

          <motion.div className="hero-actions" variants={staggerChild}>
            <MagneticButton>
              <motion.a
                href="/resume/Ponesakki M Resume Updated.docx"
                download="Ponesakki_M_Resume.docx"
                className="btn btn-primary"
                whileHover={{ scale: 1.05, boxShadow: '0 16px 48px rgba(79,142,247,0.45)' }}
                whileTap={{ scale: 0.96 }}
              >
                <FiDownload size={16} /> Download Resume
              </motion.a>
            </MagneticButton>
            <MagneticButton>
              <motion.a
                href="#contact"
                className="btn btn-outline"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                Get In Touch
              </motion.a>
            </MagneticButton>
          </motion.div>

          <motion.div className="hero-socials" variants={staggerChild}>
            {socials.map((s, i) => (
              <MagneticButton key={s.label} strength={0.5}>
                <motion.a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={s.label}
                  whileHover={{ scale: 1.2, y: -4, borderColor: 'var(--accent)', color: 'var(--accent)' }}
                  whileTap={{ scale: 0.88 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1, type: 'spring', stiffness: 200 }}
                >
                  {s.icon}
                </motion.a>
              </MagneticButton>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <FiArrowDown size={20} />
        </motion.div>
        <span>Scroll down</span>
      </motion.div>
    </section>
  );
}
