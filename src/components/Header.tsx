import React, { useState, useEffect, useRef } from 'react';
import { HomeIcon, UserIcon, BriefcaseIcon, EnvelopeIcon, WhatsappIcon, BarsIcon, XIcon } from './icons';

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, text, isActive, onClick }) => (
  <li className="flex items-center h-full px-2">
    <a
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors duration-300 ease-in-out group hover:bg-gray-100 ${isActive ? 'bg-primary/10 text-primary shadow-inner' : 'text-gray-500'}`}
    >
      <span className="text-xl transition-transform duration-300 group-hover:scale-110">{icon}</span>
      <span className="text-sm font-semibold">{text}</span>
    </a>
  </li>
);


interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isClickScrolling: React.MutableRefObject<boolean>;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void; // Adiciona prop handleNavClick
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, isClickScrolling, handleNavClick: parentHandleNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollEndTimeout = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'sobre', 'servicos', 'contato'];
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: '-64px 0px -40% 0px', // Header height (h-16 = 4rem = 64px)
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [setActiveSection, isClickScrolling]);

  useEffect(() => {
    const handleManualScroll = () => {
      if (scrollEndTimeout.current) {
        clearTimeout(scrollEndTimeout.current);
      }
      scrollEndTimeout.current = window.setTimeout(() => {
        isClickScrolling.current = false;
      }, 150);
    };

    window.addEventListener('scroll', handleManualScroll);
    return () => window.removeEventListener('scroll', handleManualScroll);
  }, [isClickScrolling]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Função handleNavClick específica do Header, que usa a função parentHandleNavClick
  const handleHeaderNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    parentHandleNavClick(e); // Executa a lógica centralizada de rolagem e atualização de seção
    closeMenu(); // Fecha o menu mobile (específico do Header)
  };

  const headerBgClass = isScrolled
    ? 'bg-white/95 shadow-lg backdrop-blur-sm'
    : activeSection === 'home'
      ? 'bg-transparent'
      : 'bg-white';

  const menuItems = [
    { href: '#home', text: 'Início', icon: <HomeIcon />, section: 'home', delay: '100ms' },
    { href: '#sobre', text: 'Sobre', icon: <UserIcon />, section: 'sobre', delay: '150ms' },
    { href: '#servicos', text: 'Serviços', icon: <BriefcaseIcon />, section: 'servicos', delay: '200ms' },
    { href: '#contato', text: 'Contato', icon: <EnvelopeIcon />, section: 'contato', delay: '250ms' },
  ];

  return (
    <>
      <header className={`font-poppins fixed top-0 left-0 z-50 w-full transition-all duration-300 ${headerBgClass} h-16`}>
        <div className="container flex items-center justify-between h-full px-4 mx-auto max-w-7xl">
          <a href="#home" onClick={handleHeaderNavClick} className="flex items-center gap-4">
            <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" className="w-16 h-auto" />
            <div>
              <h1 className="font-bold text-[clamp(1.1rem,4vw,1.25rem)]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Andréa Macagnani
                </span>
              </h1>
              <p className="text-[clamp(0.75rem,2.5vw,0.875rem)] text-gray-600">
                <span className="font-semibold text-secondary">Psicóloga Clínica</span>
                <span className="font-semibold text-primary"> • CRP-08/09949</span>
              </p>
            </div>
          </a>

          <nav className="hidden lg:flex items-center h-full">
            <ul className="flex h-full list-none">
              <NavLink href="#home" icon={<HomeIcon />} text="Início" onClick={handleHeaderNavClick} isActive={activeSection === 'home'} />
              <NavLink href="#sobre" icon={<UserIcon />} text="Sobre" onClick={handleHeaderNavClick} isActive={activeSection === 'sobre'} />
              <NavLink href="#servicos" icon={<BriefcaseIcon />} text="Serviços" onClick={handleHeaderNavClick} isActive={activeSection === 'servicos'} />
              <NavLink href="#contato" icon={<EnvelopeIcon />} text="Contato" onClick={handleHeaderNavClick} isActive={activeSection === 'contato'} />
            </ul>
          </nav>

          <button className="relative z-50 text-2xl text-gray-dark lg:hidden" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <XIcon /> : <BarsIcon />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-white transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center justify-center h-full px-6">
          <nav className="w-full max-w-sm">
            <ul className="flex flex-col items-stretch">
              {menuItems.map((item, index) => (
                <li
                  key={item.href}
                  className={`transition-[opacity,transform] duration-500 ease-out flex justify-center will-change-[opacity,transform]
                              ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                              ${index < menuItems.length - 1 ? 'border-b border-gray-200/70' : ''} 
                              py-2
                              `}
                  style={{ transitionDelay: isMenuOpen ? item.delay : '0ms' }}
                >
                  <a
                    href={item.href}
                    onClick={handleHeaderNavClick}
                    className={`flex items-center gap-4 py-4 text-xl font-semibold rounded-none transition-colors duration-300 
                                ${activeSection === item.section
                        ? 'text-primary'
                        : 'text-gray-600 hover:text-primary'
                      }`}
                  >
                    <span className="text-2xl w-8 flex-shrink-0 text-right">{item.icon}</span>
                    <span className="flex-grow text-left">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div
            className={`mt-12 transition-[opacity,transform] duration-500 ease-out will-change-[opacity,transform] ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}
          >
            <a href="https://wa.me/5544988613000?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta!" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-auto gap-3 px-8 py-3 font-bold text-white transition-transform duration-300 rounded-lg shadow-lg bg-gradient-to-r from-primary to-secondary border-2 border-transparent hover:border-primary hover:-translate-y-1 hover:shadow-xl text-base">
              <WhatsappIcon /> Agendar Consulta
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;