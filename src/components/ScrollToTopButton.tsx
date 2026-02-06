


import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from './icons';

interface ScrollToTopButtonProps {
  setActiveSection: (section: string) => void;
  isClickScrolling: React.MutableRefObject<boolean>;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ setActiveSection, isClickScrolling }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    isClickScrolling.current = true;
    setActiveSection('home');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-50 p-4 text-white rounded-full shadow-lg bg-gradient-to-br from-primary to-secondary transition-[transform,opacity] duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      aria-label="Voltar ao topo"
    >
      <ChevronUpIcon className="text-2xl" />
    </button>
  );
};

export default ScrollToTopButton;