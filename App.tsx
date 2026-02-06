import React, { useState, useRef, useCallback } from 'react';
import Header from './src/components/Header';
import Hero from './src/components/Hero';
import About from './src/components/About';
import Services from './src/components/Services';
import Contact from './src/components/Contact';
import Footer from './src/components/Footer';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const isClickScrolling = useRef(false);

  // Centralized navigation click handler
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    isClickScrolling.current = true;
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setActiveSection(targetId);
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  }, [setActiveSection, isClickScrolling]);

  return (
    <div className="bg-gray-ultralight text-gray-800 bg-pattern">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isClickScrolling={isClickScrolling}
        handleNavClick={handleNavClick} // Pass the centralized handler
      />
      <main>
        <Hero
          setActiveSection={setActiveSection}
          isClickScrolling={isClickScrolling}
          handleNavClick={handleNavClick} // Pass the centralized handler
        />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer
        handleNavClick={handleNavClick} // Pass the centralized handler
      />
    </div>
  );
};

export default App;