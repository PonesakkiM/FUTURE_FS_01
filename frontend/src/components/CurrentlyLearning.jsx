import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { staggerContainer, staggerChild } from '../animations/variants';
import './CurrentlyLearning.css';

const learning = [
  {
    topic: 'Java Programming',
    desc: 'Strengthening object-oriented programming skills with Java — covering data structures, algorithms, and backend development concepts.',
    progress: 55,
    emoji: '☕',
    color: '#f59e0b',
    resources: ['Java Docs', 'LeetCode', 'GeeksforGeeks'],
  },
  {
    topic: 'N8N — Workflow Automation',
    desc: 'Exploring N8N for building powerful no-code/low-code automation workflows, integrating APIs, and automating repetitive tasks.',
    progress: 40,
    emoji: '⚙️',
    color: '#4f8ef7',
    resources: ['N8N Docs', 'YouTube'],
  },
  {
    topic: 'New AI Tools & LLMs',
    desc: 'Staying up-to-date with the latest AI tools — exploring ChatGPT, Claude, Gemini, Cursor, and emerging AI-powered developer tools.',
    progress: 65,
    emoji: '🤖',
    color: '#7c3aed',
    resources: ['Hugging Face', 'Papers With Code', 'AI News'],
  },
  {
    topic: 'Machine Learning (Advanced)',
    desc: 'Deepening ML knowledge with advanced topics — ensemble methods, model optimization, feature engineering, and deployment strategies.',
    progress: 70,
    emoji: '🧠',
    color: '#10b981',
    resources: ['Scikit-learn', 'Kaggle', 'Fast.ai'],
  },
];

export default function CurrentlyLearning() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="learning" className="section learning-section" ref={ref}>
      <div className="container">
        <motion.div variants={staggerContainer(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.h2 className="section-title" variants={staggerChild}>Currently Learning</motion.h2>
          <motion.p className="section-subtitle" variants={staggerChild}>Always growing, always exploring 🚀</motion.p>
        </motion.div>

        <div className="learning-grid">
          {learning.map((item, i) => (
            <motion.div
              key={item.topic}
              className="learning-card glass-card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -5,
                borderColor: item.color + '60',
                boxShadow: `0 16px 48px ${item.color}20`,
                transition: { duration: 0.2 },
              }}
            >
              <div className="learning-header">
                <motion.div
                  className="learning-emoji"
                  style={{ background: `${item.color}20` }}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.emoji}
                </motion.div>
                <div>
                  <h3>{item.topic}</h3>
                  <div className="learning-resources">
                    {item.resources.map(r => (
                      <span key={r} className="resource-tag">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p>{item.desc}</p>
              <div className="learning-progress">
                <div className="progress-label">
                  <span>Progress</span>
                  <span style={{ color: item.color }}>{item.progress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <motion.div
                    className="progress-bar-fill"
                    style={{ background: item.color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.progress}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
