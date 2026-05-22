import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiCpu, FiGlobe } from 'react-icons/fi';
import { staggerContainer, staggerChild, fadeLeft } from '../animations/variants';
import { personal } from '../data/personal';
import './About.css';

const highlights = [
  { icon: <FiCpu size={22} />, title: 'AI & ML', desc: 'Building intelligent systems with real-world impact' },
  { icon: <FiCode size={22} />, title: 'Web Dev', desc: 'Crafting responsive, modern web experiences' },
  { icon: <FiGlobe size={22} />, title: 'Data Science', desc: 'Turning raw data into actionable insights' },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.h2 className="section-title" variants={staggerChild}>About Me</motion.h2>
        </motion.div>

        <div className="about-grid">
          {/* Left card */}
          <motion.div
            className="about-text glass-card"
            variants={fadeLeft}
            custom={0.1}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            whileHover={{ borderColor: 'var(--border-hover)', boxShadow: '0 20px 60px rgba(79,142,247,0.18)' }}
          >
            <div className="about-tag"> about_me</div>
            <p>
              I am an AI & Data Science student passionate about Machine Learning and Web Development.
              I have experience in Python, frontend technologies, and building real-world projects.
              I am always eager to learn and grow as a developer. I aim to build  impactful and intelligent solutions that solve real-world problems.
            </p>
            <div className="about-stats">
              {[
                { num: personal.cgpa, label: 'Current CGPA' },
                { num: '5+', label: 'Projects Built' },
                { num: '5+', label: 'Symposiums' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right highlight cards */}
          <motion.div
            className="about-highlights"
            variants={staggerContainer(0.12, 0.3)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                className="highlight-card glass-card"
                variants={staggerChild}
                whileHover={{
                  x: 6,
                  borderColor: 'var(--border-hover)',
                  boxShadow: '0 12px 40px rgba(79,142,247,0.18)',
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="highlight-icon"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
