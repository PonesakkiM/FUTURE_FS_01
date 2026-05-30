import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSend, FiMail, FiGithub, FiLinkedin, FiMapPin, FiCheck, FiAlertCircle } from 'react-icons/fi';
import MagneticButton from './MagneticButton';
import { staggerContainer, staggerChild, fadeLeft, fadeRight } from '../animations/variants';
import './Contact.css';

import { personal } from '../data/personal';
import emailjs from 'emailjs-com';

const contactDetails = [
  { icon: <FiMail size={18} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}?subject=Portfolio%20Enquiry&body=Hi%20Ponesakki%2C%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0A%0ARegards`
},
  { icon: <FiGithub size={18} />, label: 'GitHub', value: personal.github.replace('https://', ''), href: personal.github },
  { icon: <FiLinkedin size={18} />, label: 'LinkedIn', value: personal.linkedin.replace('https://', ''), href: personal.linkedin },
  { icon: <FiMapPin size={18} />, label: 'Location', value: personal.location, href: null },
];

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = (e) => {
  e.preventDefault();
  setStatus('sending');

  const templateParams = {
    from_name: form.name,
    from_email: form.email,
    subject: form.subject,
    message: form.message,
  };

  emailjs.send(
    "service_pbvhw1t",
    "template_prdojv7",
    templateParams,
    "Nog5_tnwcZQZbocsW"
  )
  .then(() => {
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus(null), 4000);
  })
  .catch((error) => {
    console.log("ERROR:", error);
    setStatus('error');
    setTimeout(() => setStatus(null), 5000);
  });
};
  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        <motion.div variants={staggerContainer(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.h2 className="section-title" variants={staggerChild}>Get In Touch</motion.h2>
          <motion.p className="section-subtitle" variants={staggerChild}>Let's build something amazing together</motion.p>
        </motion.div>

        <div className="contact-grid">
          {/* Info panel */}
          <motion.div
            className="contact-info"
            variants={fadeLeft}
            custom={0.1}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <div className="contact-info-card glass-card">
              <h3>Let's Connect</h3>
              <p>
                I'm always open to discussing new projects, creative ideas, or opportunities
                to be part of your vision. Feel free to reach out!
              </p>

              <div className="contact-details">
                {contactDetails.map((d, i) => (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {d.href ? (
                      <motion.a
                        href={d.href}
                        target={d.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="contact-detail"
                        whileHover={{ x: 6, background: 'var(--accent-glow)' }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="contact-detail-icon">{d.icon}</div>
                        <div>
                          <span className="detail-label">{d.label}</span>
                          <span className="detail-value">{d.value}</span>
                        </div>
                      </motion.a>
                    ) : (
                      <div className="contact-detail">
                        <div className="contact-detail-icon">{d.icon}</div>
                        <div>
                          <span className="detail-label">{d.label}</span>
                          <span className="detail-value">{d.value}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="availability-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7, type: 'spring', stiffness: 150 }}
              >
                <span className="avail-dot" />
                Available for internships & projects
              </motion.div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeRight}
            custom={0.15}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <div className="form-row">
                {['name', 'email'].map((field) => (
                  <div key={field} className="form-group">
                    <label htmlFor={field}>{field === 'name' ? 'Your Name' : 'Email Address'}</label>
                    <motion.div
                      className={`input-wrapper ${focused === field ? 'focused' : ''}`}
                      animate={focused === field ? { scale: 1.01 } : { scale: 1 }}
                    >
                      <input
                        id={field}
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        placeholder={field === 'name' ? 'John Doe' : 'john@example.com'}
                        value={form[field]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field)}
                        onBlur={() => setFocused(null)}
                        required
                      />
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <motion.div
                  className={`input-wrapper ${focused === 'subject' ? 'focused' : ''}`}
                  animate={focused === 'subject' ? { scale: 1.01 } : { scale: 1 }}
                >
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="Project Collaboration"
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </motion.div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <motion.div
                  className={`input-wrapper ${focused === 'message' ? 'focused' : ''}`}
                  animate={focused === 'message' ? { scale: 1.01 } : { scale: 1 }}
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or idea..."
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </motion.div>
              </div>

              <MagneticButton style={{ width: '100%' }}>
                <motion.button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02, boxShadow: '0 16px 48px rgba(79,142,247,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <AnimatePresence mode="wait">
                    {status === 'sending' && (
                      <motion.span key="sending" className="btn-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <span className="spinner" /> Sending...
                      </motion.span>
                    )}
                    {status === 'success' && (
                      <motion.span key="success" className="btn-inner" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                        <FiCheck size={16} /> Message Sent!
                      </motion.span>
                    )}
                    {(!status || status === 'error') && (
                      <motion.span key="idle" className="btn-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <FiSend size={16} /> Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </MagneticButton>

              <AnimatePresence>
                {status === 'error' && (
                  <motion.p
                    className="form-error"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <FiAlertCircle size={14} /> Something went wrong. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
