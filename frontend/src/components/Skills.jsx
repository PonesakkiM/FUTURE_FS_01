import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { staggerContainer, staggerChild } from '../animations/variants';
import './Skills.css';

const skillCategories = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'JavaScript', icon: '⚡' },
      { name: 'HTML/CSS', icon: '🎨' },
      { name: 'SQL', icon: '🗄️' },
      { name: 'Java', icon: '☕' },
    ],
  },
  {
    category: 'AI & ML',
    skills: [
      { name: 'Machine Learning', icon: '🤖' },
      { name: 'Natural Language Processing', icon: '💬' },
      { name: 'Data Analysis', icon: '📊' },
      { name: 'Computer Vision', icon: '👁️' },
      { name: 'Sentiment Analysis', icon: '🧪' },
    ],
  },
  {
    category: 'Frameworks',
    skills: [
      { name: 'React', icon: '⚛️' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'CNN', icon: '🔥' },
      { name: 'Pandas, NumPy', icon: '🐼' },
      { name: 'Matplotlib', icon: '📐' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git & GitHub', icon: '🐙' },
      { name: 'VS Code', icon: '💻' },
      { name: 'Jupyter', icon: '📓' },
      { name: 'Power BI', icon: '📊' },
      { name: 'Tableau', icon: '📈' },
      { name: 'Supabase', icon: '🗃️' },
    ],
  },
];

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('Languages');

  const activeCategory = skillCategories.find(c => c.category === activeTab);

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <div className="container">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.h2 className="section-title" variants={staggerChild}>Skills</motion.h2>
          <motion.p className="section-subtitle" variants={staggerChild}>Technologies I work with</motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="skills-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {skillCategories.map((cat) => (
            <motion.button
              key={cat.category}
              className={`tab-btn ${activeTab === cat.category ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.category)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {cat.category}
              {activeTab === cat.category && (
                <motion.span
                  className="tab-active-bg"
                  layoutId="tab-active"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid — icon + name cards only, no progress bars */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="skills-grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeCategory?.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="skill-card glass-card"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 120, damping: 14 }}
                whileHover={{
                  y: -6,
                  borderColor: 'var(--border-hover)',
                  boxShadow: '0 16px 48px rgba(79,142,247,0.2)',
                }}
              >
                <motion.span
                  className="skill-card-icon"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {skill.icon}
                </motion.span>
                <span className="skill-card-name">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All skills tags */}
        <motion.div
          className="skills-overview"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3>All Technologies</h3>
          <div className="skills-tags">
            {skillCategories.flatMap(c => c.skills).map((skill, i) => (
              <motion.span
                key={skill.name}
                className="skill-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.04 }}
                whileHover={{ scale: 1.08, y: -3, borderColor: 'var(--accent)', color: 'var(--accent)' }}
              >
                {skill.icon} {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
