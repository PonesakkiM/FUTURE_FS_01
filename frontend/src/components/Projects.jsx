import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { staggerContainer, staggerChild } from '../animations/variants';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'AI Based Mental Health Monitoring System',
    category: 'AI/ML',
    desc: 'Developed a multimodal AI system to detect mental states using text, audio, video, and psychological data. Applied ML techniques to analyse speech patterns, facial expressions, and sentiment. Identified emotional conditions such as stress, anxiety, and depression.',
    bullets: [
      'Multimodal inputs: text, audio, video & psychological data',
      'Analysed speech patterns, facial expressions & sentiment',
      'Detected stress, anxiety & depression conditions',
    ],
    tech: ['Python', 'Machine Learning', 'NLP', 'Computer Vision', 'Sentiment Analysis'],
    github: 'https://github.com/PonesakkiM',
    demo: '#',
    featured: true,
    emoji: '🧠',
    color: '#4f8ef7',
  },
  {
    id: 2,
    title: 'Superstore Sales Dashboard',
    category: 'Data Science',
    desc: 'Built an interactive Power BI dashboard to analyze key business insights including total sales, profit, orders, and quantity. Covers sales by category and sub-category, discount patterns across products, and year-wise sales performance.',
    bullets: [
      'Total sales, profit, orders & quantity KPIs',
      'Sales by category, sub-category & discount patterns',
      'Year-wise sales performance & trend analysis',
    ],
    tech: ['Power BI', 'Excel', 'DAX', 'Data Cleaning', 'Visualization'],
    featured: true,
    emoji: '📊',
    color: '#10b981',
  },
  {
    id: 3,
    title: 'Food Ordering Website',
    category: 'Web',
    desc: 'A fully responsive food ordering web application with dynamic menu, cart functionality, and smooth UI animations built with pure HTML, CSS, and JavaScript.',
    bullets: [],
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    github: 'https://github.com/PonesakkiM',
    demo: '#',
    featured: false,
    emoji: '🍕',
    color: '#f59e0b',
  },
  {
    id: 4,
    title: 'Online Contact Search Directory',
    category: 'Web',
    desc: 'A contact management system built across multiple technologies. Enables users to efficiently add, search, update, and delete contact information with both frontend and backend implementations.',
    bullets: [
      'Full CRUD operations — add, search, update & delete contacts',
      'Built multiple versions covering frontend & backend approaches',
      'Demonstrates full-stack design with React + Node.js + PowerShell',
    ],
    tech: ['React', 'Node.js', 'PowerShell', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/PonesakkiM',
    demo: '#',
    featured: false,
    emoji: '📒',
    color: '#7c3aed',
  },
  {
    id: 5,
    title: 'Sentinel Shield',
    category: 'AI/ML',
    desc: 'A ransomware detection system that monitors file access and identifies unauthorized activities in real time. Built for SA-HACKATHON\'26 — National Level 36-hour hackathon.',
    bullets: [
      'Real-time file access monitoring & unauthorized activity detection',
      'Automated Gmail email alerts for every detected threat',
      'Supabase integration for secure event logging & tracking',
    ],
    tech: ['Python', 'Supabase', 'Gmail API', 'Anomaly Detection', 'Cybersecurity'],
    github: 'https://github.com/PonesakkiM',
    demo: '#',
    featured: false,
    emoji: '🛡️',
    color: '#06b6d4',
  },
  {
    id: 6,
    title: 'Smart Infrastructure Failure Prediction',
    category: 'AI/ML',
    desc: 'A unified platform for citizens and government authorities to file, track, and manage infrastructure complaints with predictive analytics for proactive decision-making.',
    bullets: [
      'Designed unified platform for citizens & government authorities',
      'Real-time complaint tracking & interactive authority dashboards',
      'Predictive analytics using Random Forest & XGBoost for failure detection',
    ],
    tech: ['Python', 'Random Forest', 'XGBoost', 'React', 'Node.js', 'Dashboard'],
    github: 'https://github.com/PonesakkiM',
    demo: '#',
    featured: true,
    emoji: '🏗️',
    color: '#ec4899',
  },
];

const filters = ['All', 'AI/ML', 'Web', 'Data Science'];

/** 3-D tilt card */
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="container">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.h2 className="section-title" variants={staggerChild}>Projects</motion.h2>
          <motion.p className="section-subtitle" variants={staggerChild}>Things I've built</motion.p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="project-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {filters.map((f) => (
            <motion.button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f}
              {activeFilter === f && (
                <motion.span
                  className="filter-active-bg"
                  layoutId="filter-active"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -20 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className={`project-card glass-card ${project.featured ? 'featured' : ''}`}>
                  {project.featured && (
                    <motion.div
                      className="featured-badge"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                    >
                      ⭐ Featured
                    </motion.div>
                  )}

                  <motion.div
                    className="project-emoji"
                    style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span>{project.emoji}</span>
                  </motion.div>

                  <div className="project-category" style={{ color: project.color }}>
                    {project.category}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>

                  {project.bullets && project.bullets.length > 0 && (
                    <ul className="project-bullets">
                      {project.bullets.map((b) => (
                        <li key={b} style={{ '--bullet-color': project.color }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="project-tech">
                    {project.tech.map((t) => (
                      <motion.span
                        key={t}
                        className="tech-tag"
                        whileHover={{ scale: 1.08, borderColor: project.color, color: project.color }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
