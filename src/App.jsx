import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Projects from './components/Projects';
import ProjectDetail from './pages/ProjectDetail';
import AboutMe from './pages/AboutMe';
import ThreeJSProject from './pages/ThreeJSProject';
import Particles from './assets/Particles/Particles';

// Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Style
import './App.css'
import './i18n'

function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.scrollToProjects) {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView();
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
}

function FadeTransition({ children }) {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      style={{
        animation: 'fadeIn 0.3s ease-in-out',
      }}
    >
      {children}
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const showNavbar = ['/', '/about'].includes(location.pathname);
  const showParticles = ['/', '/about'].includes(location.pathname);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme || 'light');
    };

    // Initial theme check
    handleThemeChange();

    // Listen for theme changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {showParticles && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Particles
            particleColors={theme === 'light' ? ['#000000', '#669bbc'] : ['#ffffff', '#669bbc']}
            particleCount={150}
            particleSpread={5}
            speed={0.1}
            particleBaseSize={150}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
      )}
      <ScrollToTop />
      {showNavbar && <Navbar />}
      {location.pathname === '/' && <Hero />}
      <FadeTransition>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/projects/threejs" element={<ThreeJSProject />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/about" element={<AboutMe />} />
        </Routes>
      </FadeTransition>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
