import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { staggerContainer, staggerChild } from '../animations/variants';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'AI-Based Mental Health Monitoring',
    category: 'AI/ML',
    tag: 'Research Project',
    desc: 'Multimodal AI system that analyses text, audio, and facial data to identify emotional states like stress, anxiety, and depression.',
    bullets: [
      'Processes text, audio & video inputs simultaneously',
      'Detects stress, anxiety & depression conditions',
      'Combines NLP, Computer Vision & Sentiment Analysis',
    ],
    tech: ['Python', 'NLP', 'Computer Vision', 'Sentiment Analysis', 'ML'],
    status: 'Completed',
    featured: true,
    emoji: '🧠',
    color: '#4f8ef7',
  },
  {
    id: 2,
    title: 'Smart Infrastructure Failure Prediction',
    category: 'AI/ML',
    tag: 'ML Project',
    desc: 'Predictive platform for citizens and authorities to report, track, and forecast infrastructure failures before they occur.',
    bullets: [
      'Predicts failures using Random Forest & XGBoost models',
      'Real-time complaint tracking with authority dashboards',
      'Full-stack: React frontend + Node.js backend',
    ],
    tech: ['Python', 'Random Forest', 'XGBoost', 'React', 'Node.js'],
    status: 'Completed',
    featured: true,
    emoji: '🏗️',
    color: '#ec4899',
  },
  {
    id: 3,
    title: 'Superstore Sales Dashboard',
    category: 'Data Science',
    tag: 'Analytics Project',
    desc: 'Interactive Power BI dashboard visualising sales KPIs, category performance, discount patterns, and year-wise trends.',
    bullets: [
      'KPIs: total sales, profit, orders & quantity at a glance',
      'Breakdown by category, sub-category & discount impact',
      'Year-wise trend analysis for business decision-making',
    ],
    tech: ['Power BI', 'Excel', 'DAX', 'Data Cleaning', 'Visualization'],
    status: 'Completed',
    featured: false,
    emoji: '📊',
    color: '#10b981',
  },
  {
    id: 4,
    title: 'Online Contact Search Directory',
    category: 'Web',
    tag: 'Full-Stack Project',
    desc: 'Contact management web app with full CRUD operations, built across multiple tech stacks to demonstrate frontend and backend skills.',
    bullets: [
      'Add, search, update & delete contacts seamlessly',
      'Built with React + Node.js for full-stack coverage',
      'Clean UI with instant search and form validation',
    ],
    tech: ['React', 'Node.js', 'HTML', 'CSS', 'JavaScript'],
    status: 'Completed',
    featured: false,
    emoji: '📒',
    color: '#7c3aed',
  },
  {
    id: 5,
    title: 'Sentinel Shield',
    category: 'AI/ML',
    tag: 'Hackathon Project',
    desc: 'Real-time ransomware detection system that monitors file activity and triggers instant alerts on suspicious behaviour.',
    bullets: [
      'Detects unauthorized file access patterns in real time',
      'Sends automated Gmail alerts on every threat event',
      'Logs all incidents securely via Supabase integration',
    ],
    tech: ['Python', 'Supabase', 'Gmail API', 'Anomaly Detection', 'Cybersecurity'],
    status: 'Completed',
    featured: false,
    emoji: '🛡️',
    color: '#06b6d4',
  },
  {
    id: 6,
    title: 'Food Ordering Website',
    category: 'Web',
    tag: 'Frontend Project',
    desc: 'Responsive food ordering web app with dynamic menu browsing, cart management, and smooth UI animations.',
    bullets: [
      'Dynamic menu with category filtering',
      'Cart functionality with quantity management',
      'Fully responsive across mobile and desktop',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    status: 'Completed',
    featured: false,
    emoji: '🍕',
    color: '#f59e0b',
  },
];

const filters = ['All', 'AI/ML', 'Web', 'Data Science'];

/** 3-D tilt card */
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });
  const [activeFilter, setActiveFilter] = useState('All');

  const featured  = projects.filter(p => p.featured);
  const rest      = projects.filter(p => !p.featured);
  const allFiltered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const showFeaturedSection = activeFilter === 'All';

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="container">

        {/* Heading */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.h2 className="section-title" variants={staggerChild}>Projects</motion.h2>
          <motion.p className="section-subtitle" variants={staggerChild}>
            Things I've built — from ML models to full-stack apps
          </motion.p>
        </motion.div>

        {/* Filters */}
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

        {/* ── Featured section (only when "All" is selected) ── */}
        {showFeaturedSection && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
          >
            <div className="projects-section-label">
              <span>⭐ Featured Projects</span>
            </div>
            <div className="projects-grid projects-grid-featured">
              {featured.map((project, i) => (
                <ProjectCard key={project.id} project={project} i={i} />
              ))}
            </div>

            <div className="projects-section-label" style={{ marginTop: '2.5rem' }}>
              <span>🗂️ Other Projects</span>
            </div>
            <div className="projects-grid">
              {rest.map((project, i) => (
                <ProjectCard key={project.id} project={project} i={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Filtered view ── */}
        {!showFeaturedSection && (
          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="popLayout">
              {allFiltered.map((project, i) => (
                <ProjectCard key={project.id} project={project} i={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}

function ProjectCard({ project, i }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -16 }}
      transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className={`project-card glass-card ${project.featured ? 'featured' : ''}`}>

        {/* Top accent line on hover */}
        <div className="card-accent-line" style={{ '--card-color': project.color }} />

        {/* Header row */}
        <div className="project-card-header">
          <motion.div
            className="project-emoji"
            style={{ background: `${project.color}18`, border: `1px solid ${project.color}35` }}
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.12 }}
            transition={{ duration: 0.4 }}
          >
            <span>{project.emoji}</span>
          </motion.div>

          <div className="project-header-meta">
            <span className="project-category" style={{ color: project.color }}>
              {project.category}
            </span>
            <span className="project-tag">{project.tag}</span>
          </div>

          <span className="project-status">
            <span className="status-dot" />
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="project-title">{project.title}</h3>

        {/* Description — 2 lines max */}
        <p className="project-desc">{project.desc}</p>

        {/* Key features */}
        {project.bullets?.length > 0 && (
          <ul className="project-bullets">
            {project.bullets.map((b) => (
              <li key={b} style={{ '--bullet-color': project.color }}>{b}</li>
            ))}
          </ul>
        )}

        {/* Tech stack */}
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
  );
}
