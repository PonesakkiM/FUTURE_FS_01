import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { staggerContainer, staggerChild } from '../animations/variants';
import './Achievements.css';

// ─── Hackathons & Symposiums ──────────────────────────────────────────────────
const hackathons = [
  {
    emoji: '🛡️',
    title: 'SA-HACKATHON\'26 — National Level',
    subtitle: 'S.A. Engineering College · 36-Hour Hackathon',
    desc: 'Participated in a 36-hour National Level Hackathon. Problem Statement: Ransomware Detection and Recovery System. Built "Sentinel Shield" — an AI-powered ransomware detection and real-time recovery system.',
    year: '2026',
    color: '#4f8ef7',
    type: 'hackathon',
    badge: '🏅 Participant',
  },
  {
    emoji: '☁️',
    title: 'Google Cloud Arcade',
    subtitle: 'Google Cloud · Online Program',
    desc: 'Completed the Google Cloud Arcade program. Earned exclusive Google Cloud swag — T-shirt, Bottle, and Magnets from Google Cloud.',
    year: '2025',
    color: '#10b981',
    type: 'achievement',
    badge: '🎁 T-Shirt + Bottle + Magnets',
  },
];

const symposiums = [
  {
    emoji: '⚡',
    title: 'Code-In-Phase',
    subtitle: 'VIDYUTRENZ Symposium',
    desc: 'Participated in the coding competition at VIDYUTRENZ inter-college symposium.',
    year: '2025',
    color: '#f59e0b',
    badge: '📜 Participation Certificate',
  },
  {
    emoji: '🐍',
    title: 'StrangersCodes',
    subtitle: 'TALOS Symposium',
    desc: 'Participated in the StrangersCodes coding event at TALOS inter-college symposium.',
    year: '2025',
    color: '#7c3aed',
    badge: '📜 Participation Certificate',
  },
  {
    emoji: '🤖',
    title: 'Promptorix',
    subtitle: 'TALOS Symposium',
    desc: 'Participated in the Promptorix AI prompt engineering event at TALOS symposium.',
    year: '2025',
    color: '#ec4899',
    badge: '📜 Participation Certificate',
  },
  {
    emoji: '🔐',
    title: 'CodeCrypt',
    subtitle: 'Inter-College Symposium',
    desc: 'Participated in CodeCrypt — a cryptography and coding challenge event.',
    year: '2024',
    color: '#06b6d4',
    badge: '📜 Participation Certificate',
  },
  {
    emoji: '✨',
    title: 'PromptCraft',
    subtitle: 'ZORPHIX Symposium',
    desc: 'Participated in PromptCraft — an AI prompt crafting and creativity challenge at ZORPHIX.',
    year: '2024',
    color: '#10b981',
    badge: '📜 Participation Certificate',
  },
];

function AchievementCard({ item, i, inView }) {
  return (
    <motion.div
      className="achievement-card glass-card"
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, type: 'spring', stiffness: 100, damping: 14 }}
      whileHover={{
        y: -8, scale: 1.02,
        borderColor: item.color + '60',
        boxShadow: `0 20px 50px ${item.color}22`,
        transition: { duration: 0.2 },
      }}
    >
      <motion.div
        className="achievement-emoji"
        style={{ background: `${item.color}20` }}
        whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
        transition={{ duration: 0.5 }}
      >
        {item.emoji}
      </motion.div>
      <div className="achievement-year" style={{ color: item.color }}>{item.year}</div>
      <h3>{item.title}</h3>
      {item.subtitle && <p className="achievement-subtitle">{item.subtitle}</p>}
      <p>{item.desc}</p>
      <span className="achievement-badge" style={{ background: item.color + '18', color: item.color, border: `1px solid ${item.color}40` }}>
        {item.badge}
      </span>
      <motion.div
        className="achievement-glow-line"
        style={{ background: item.color }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="achievements" className="section achievements-section" ref={ref}>
      <div className="container">
        <motion.div variants={staggerContainer(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.h2 className="section-title" variants={staggerChild}>Achievements</motion.h2>
          <motion.p className="section-subtitle" variants={staggerChild}>Hackathons, symposiums & recognition</motion.p>
        </motion.div>

        {/* Hackathons & Major Achievements */}
        <motion.h3
          className="achievements-group-title"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          🏆 Hackathons & Programs
        </motion.h3>
        <div className="achievements-grid achievements-grid-2">
          {hackathons.map((item, i) => (
            <AchievementCard key={item.title} item={item} i={i} inView={inView} />
          ))}
        </div>

        {/* Symposiums */}
        <motion.h3
          className="achievements-group-title"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          🎯 Symposium Participations
        </motion.h3>
        <div className="achievements-grid">
          {symposiums.map((item, i) => (
            <AchievementCard key={item.title} item={item} i={i + 2} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
