import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';
import './App.css';

function ParallaxOrb({ className, xFactor = 0.02, yFactor = 0.03 }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, 3000 * yFactor]);
  const x = useTransform(scrollY, [0, 3000], [0, 3000 * xFactor]);
  return <motion.div className={`orb ${className}`} style={{ y, x }} />;
}

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <div className="app">
      {/* Global animation overlays */}
      <CursorGlow />
      <ScrollProgress />

      {/* Parallax background orbs */}
      <ParallaxOrb className="orb-1" yFactor={0.04} xFactor={0.01} />
      <ParallaxOrb className="orb-2" yFactor={-0.03} xFactor={-0.02} />
      <div className="orb orb-3" />

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Certificates />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
