import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBook, FiAward, FiCalendar, FiMapPin, FiStar } from 'react-icons/fi';
import { staggerContainer, staggerChild } from '../animations/variants';
import { personal } from '../data/personal';
import './Education.css';

const timeline = [
  {
    title: 'B.Tech – Artificial Intelligence & Data Science',
    institution: 'S.A Engineering College',
    location: 'Chennai, Tamil Nadu, India',
    period: '2023 – 2027',
    grade: `CGPA: ${personal.cgpa} / 10`,
    desc: 'Specializing in machine learning, deep learning, data analytics, and intelligent systems. Actively participating in hackathons, symposiums, and coding competitions.',
    icon: <FiBook size={18} />,
    color: '#4f8ef7',
    tags: ['AI', 'ML', 'Data Science', 'Web Dev'],
  },
  {
    title: 'Higher Secondary – Bio Maths Group (12th Grade)',
    institution: 'Jaigopal Garodia Govt. Higher Secondary School',
    location: 'Chennai, Tamil Nadu, India',
    period: '2022 – 2023',
    grade: 'Score: 81%',
    desc: 'Completed Higher Secondary with Bio Maths group. Built a strong foundation in Mathematics, Physics, and Biology that supports analytical thinking in AI & Data Science.',
    icon: <FiAward size={18} />,
    color: '#7c3aed',
    tags: ['Bio Maths', 'Science'],
  },
  {
    title: 'Secondary School (10th Grade)',
    institution: 'Victory Matric. Higher Secondary School',
    location: 'Chennai, Tamil Nadu, India',
    period: '2019 – 2020',
    grade: 'Score: 80.4%',
    desc: 'Completed with distinction. Developed interest in computers and mathematics. Participated in science exhibitions and inter-school competitions.',
    icon: <FiAward size={18} />,
    color: '#06b6d4',
    tags: ['Science', 'Mathematics'],
  },
];

function TimelineItem({ item, index, inView }) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      className={`timeline-item ${isLeft ? 'left' : 'right'}`}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="timeline-dot"
        style={{ background: item.color }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.22 + 0.3, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.25 }}
      >
        {item.icon}
      </motion.div>

      <motion.div
        className="timeline-card glass-card"
        whileHover={{
          y: -4,
          borderColor: item.color + '80',
          boxShadow: `0 16px 48px ${item.color}25`,
          transition: { duration: 0.2 },
        }}
      >
        <div className="timeline-accent" style={{ background: item.color }} />

        <div className="timeline-header">
          <h3>{item.title}</h3>
          <span className="timeline-grade" style={{ color: item.color, background: item.color + '18', border: `1px solid ${item.color}40` }}>
            {item.grade}
          </span>
        </div>

        <div className="timeline-meta">
          <span><FiBook size={13} /> {item.institution}</span>
          <span><FiMapPin size={13} /> {item.location}</span>
          <span><FiCalendar size={13} /> {item.period}</span>
        </div>

        <p>{item.desc}</p>

        <div className="timeline-tags">
          {item.tags.map(tag => (
            <span key={tag} className="timeline-tag" style={{ borderColor: item.color + '50', color: item.color }}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="education" className="section education-section" ref={ref}>
      <div className="container">
        <motion.div variants={staggerContainer(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.h2 className="section-title" variants={staggerChild}>Education</motion.h2>
          <motion.p className="section-subtitle" variants={staggerChild}>My academic journey</motion.p>
        </motion.div>

        <div className="timeline">
          <svg className="timeline-svg" viewBox="0 0 4 600" preserveAspectRatio="none">
            <motion.line
              x1="2" y1="0" x2="2" y2="600"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f8ef7" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
