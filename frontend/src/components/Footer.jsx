import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { personal } from '../data/personal';
import './Footer.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-top-line" />
      <div className="container footer-container">

        <div className="footer-brand">
          <p className="footer-bio">
            Aspiring AI and Data Science engineer passionate about building intelligent and
            impactful technology solutions. Experienced in machine learning, data analytics,
            and full-stack development through academic projects, internships, and hackathons.
            Strong problem-solving abilities with a keen interest in applying AI to real-world challenges.
          </p>
          <div className="footer-socials">
            {[
              { icon: <FiGithub size={18} />, href: personal.github, label: 'GitHub' },
              { icon: <FiLinkedin size={18} />, href: personal.linkedin, label: 'LinkedIn' },
              { icon: <FiMail size={18} />, href: `mailto:${personal.email}`, label: 'Email' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label={s.label}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <div className="footer-contact-items">
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer">
              {personal.github.replace('https://', '')}
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
              {personal.linkedin.replace('https://', '')}
            </a>
            <span>{personal.location}</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Ponesakki M. All rights reserved.</p>
          <motion.button
            className="scroll-top-btn"
            onClick={scrollTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FiArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
