import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import AIFeatures from './components/AIFeatures';
import Contact from './components/Contact';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if dark mode is enabled
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Update HTML class when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <AIFeatures />
        <Contact />
        
        <footer className="bg-gray-800 text-white py-6 sm:py-8 text-center">
          <div className="container mx-auto px-4">
            <p className="text-sm sm:text-base">© {new Date().getFullYear()} Amar Singh. Built with React, TypeScript & AI.</p>
            <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm">Open to opportunities in Full Stack & AI Development</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-4 sm:p-6 md:p-8">
            <AnalyticsDashboard />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;