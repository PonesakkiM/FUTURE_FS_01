import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiExternalLink, FiCalendar } from 'react-icons/fi';
import { staggerContainer, staggerChild } from '../animations/variants';
import './Certificates.css';

// File base path
const BASE = '/certificates/Certificate/';

const certificates = [
  {
    title: ' Data Mining-NPTEL ',
    issuer: 'NPTEL-IIT',
    date: '2026',
    color: '#4f8ef7',
    emoji: '🎓',
    file: BASE + 'NOC26CS58S55340243003162093.pdf',
    type: 'pdf',
  },
  {
    title: 'AICTE ML-Certificate',
    issuer: 'AICTE',
    date: '2025',
    color: '#7c3aed',
    emoji: '📜',
    file: BASE + 'PONESAKKI M.pdf',
    type: 'pdf',
  },
  {
    title: 'Python for Data Science',
    issuer: 'NPTEL-IIT',
    date: '2024',
    color: '#7c3aed',
    file: BASE + 'Python for Data Science.pdf',
    type: 'pdf',
  },
  {
    title: 'Gemini Certified Student',
    issuer: 'Google',
    date: '2025',
    valid: '2028',
    color: '#10b981',
    emoji: '🏅',
    file: BASE + 'WhatsApp Image 2026-05-21 at 12.48.51 PM.jpeg',
    type: 'image',
  },
  {
    title: 'Generative AI Professional',
    issuer: 'Oracle',
    date: '2025',
    valid: '2027',
    color: '#06b6d4',
    emoji: '🏅',
    file: BASE + 'WhatsApp Image 2026-05-21 at 12.48.51 PM (1).jpeg',
    type: 'image',
  },
  {
    title: 'IBM ML with Python',
    issuer: 'Coursera',
    date: '2025',
    color: '#ec4899',
    emoji: '🏅',
    file: BASE + 'WhatsApp Image 2026-05-21 at 12.48.52 PM.jpeg',
    type: 'image',
  },
  {
    title: 'AWS Academy Cloud Fondations',
    issuer: 'AWS ',
    date: '2025',
    color: '#f59e0b',
    emoji: '🏅',
    file: BASE + 'WhatsApp Image 2026-05-21 at 12.48.52 PM (1).jpeg',
    type: 'image',
  },
  {
    title: 'Introduction to Machine Learning',
    issuer: 'Infosys',
    date: '2025',
    color: '#4f8ef7',
    emoji: '🏅',
    file: BASE + 'WhatsApp Image 2026-05-21 at 12.48.52 PM (2).jpeg',
    type: 'image',
  },
  {
    title: 'Introduction to Cloud Computing',
    issuer: 'Infosys',
    date: '2025',
    color: '#7c3aed',
    emoji: '🏅',
    file: BASE + 'WhatsApp Image 2026-05-21 at 12.52.28 PM.jpeg',
    type: 'image',
  },
  {
    title: 'Natural Language Processing Fundamentals',
    issuer: 'Infosys',
    date: '2025',
    color: '#10b981',
    emoji: '🏅',
    file: BASE + 'WhatsApp Image 2026-05-21 at 12.52.29 PM.jpeg',
    type: 'image',
  },
  {
    title: 'Cloud Technologies',
    issuer: 'Infosys',
    date: '2025',
    color: '#06b6d4',
    emoji: '🏅',
    file: BASE + 'WhatsApp Image 2026-05-21 at 12.52.29 PM (1).jpeg',
    type: 'image',
  },
];

export default function Certificates() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="certificates" className="section certificates-section" ref={ref}>
      <div className="container">
        <motion.div variants={staggerContainer(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.h2 className="section-title" variants={staggerChild}>Certificates</motion.h2>
          <motion.p className="section-subtitle" variants={staggerChild}>Credentials & certifications earned</motion.p>
        </motion.div>

        <div className="certs-grid">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title + i}
              className="cert-card glass-card"
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -6,
                borderColor: cert.color + '60',
                boxShadow: `0 20px 50px ${cert.color}22`,
                transition: { duration: 0.2 },
              }}
            >
              <div className="cert-top-bar" style={{ background: cert.color }} />

              {/* Show image preview for image certs */}
              {cert.type === 'image' ? (
                <div className="cert-preview">
                  <img src={cert.file} alt={cert.title} className="cert-thumb" />
                </div>
              ) : (
                <motion.div
                  className="cert-icon"
                  style={{ background: `${cert.color}20`, border: `1px solid ${cert.color}40` }}
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <span>{cert.emoji}</span>
                </motion.div>
              )}

              <div className="cert-content">
                <h3>{cert.title}</h3>
                <p className="cert-issuer"><FiAward size={13} /> {cert.issuer}</p>
                <p className="cert-date"><FiCalendar size={13} /> {cert.date}</p>
              </div>

              <motion.a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-link"
                style={{ color: cert.color, borderColor: cert.color + '50', background: cert.color + '12' }}
                whileHover={{ background: cert.color, color: 'white', scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <FiExternalLink size={14} /> View Certificate
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
