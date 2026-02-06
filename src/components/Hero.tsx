import React, { useState, useEffect, useRef } from 'react';
import { CheckCircleIcon, HeartIcon, CalendarIcon, SearchIcon, UserMdIcon, GraduationCapIcon, LaptopHouseIcon, ChevronDownIcon } from './icons';

interface HeroProps {
  setActiveSection: (section: string) => void;
  isClickScrolling: React.MutableRefObject<boolean>;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void; // Adiciona prop handleNavClick
}

const HighlightItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-3">
    <CheckCircleIcon className="text-xl text-primary" />
    <p className="font-medium text-gray-700">{children}</p>
  </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="p-4 text-center bg-white rounded-lg shadow-lg transition-transform duration-300 md:hover:-translate-y-1 md:hover:shadow-xl sm:p-6 md:p-8 will-change-transform">
    <div className="inline-flex items-center justify-center w-12 h-12 mx-auto mb-2 text-2xl rounded-full sm:w-16 sm:h-16 sm:mb-4 sm:text-3xl md:w-20 md:h-20 md:mb-6 md:text-4xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary">
      {icon}
    </div>
    <h3 className="mb-2 text-[clamp(1rem,4vw,1.25rem)] font-bold text-gray-dark md:mb-3">{title}</h3>
    <p className="block text-[clamp(0.875rem,3vw,1rem)] text-gray-500">{text}</p>
  </div>
);

const HighlightsAndButtons: React.FC<HeroProps> = ({ setActiveSection, isClickScrolling, handleNavClick }) => { // Recebe handleNavClick

  // A função handleNavClick foi centralizada no App.tsx e é passada como prop.
  // Não precisamos mais definir uma versão local aqui.

  return (
    <div className="flex flex-col items-center w-full gap-6 sm:gap-8 lg:items-start">
      <div className="inline-grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 sm:justify-items-start">
        <HighlightItem>Atendimento personalizado</HighlightItem>
        <HighlightItem>Abordagem científica</HighlightItem>
        <HighlightItem>Ética e Confidencialidade</HighlightItem>
        <HighlightItem>Espaço Seguro</HighlightItem>
      </div>

      <div className="flex flex-col items-center w-full gap-4 sm:w-auto sm:flex-row sm:justify-center lg:justify-start">
        <a href="https://wa.me/5544988613000?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta!" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full gap-3 px-6 py-3 font-bold text-white rounded-lg shadow-lg sm:w-auto bg-gradient-to-r from-primary to-secondary border-2 border-secondary hover:border-primary md:hover:-translate-y-1 md:hover:shadow-xl text-lg transition-transform duration-300">
          <CalendarIcon /> Agendar Consulta
        </a>
        <a href="#servicos" onClick={handleNavClick} className="flex items-center justify-center w-full gap-3 px-6 py-3 font-bold bg-white border-2 rounded-lg shadow-md sm:w-auto text-secondary border-gray-light hover:border-primary md:hover:-translate-y-1 md:hover:shadow-lg text-lg transition-transform duration-300">
          <SearchIcon /> Conheça Meus Serviços
        </a>
      </div>
    </div>
  );
};


const Hero: React.FC<HeroProps> = ({ setActiveSection, isClickScrolling, handleNavClick }) => { // Recebe handleNavClick
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const featuresScreenRef = useRef<HTMLDivElement | null>(null);
  const highlightsScreenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once visible to prevent re-triggering
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleScrollToFeatures = () => {
    featuresScreenRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToHighlights = () => {
    highlightsScreenRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('sobre');
    if (aboutSection) {
      isClickScrolling.current = true;
      setActiveSection('sobre');
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-pink-50/90 to-white backdrop-blur-sm z-0"></div>

      <div className={`relative z-10 container px-4 mx-auto max-w-7xl transition-[opacity,transform] duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

        {/* === SCREEN 1: ABOVE THE FOLD === */}
        <div className={`relative flex flex-col justify-center items-center min-h-screen text-center pb-20
                         lg:flex-row lg:justify-between lg:items-center lg:min-h-0 lg:text-left lg:pt-32 lg:pb-12 lg:gap-8 
                         transition-transform duration-1000 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-10'}`}>

          {/* --- Image Block --- */}
          <div className="relative w-full lg:w-6/12 flex justify-center lg:justify-end order-1 lg:order-2 mt-20 lg:mt-0">
            <div className="relative w-full max-w-[16rem] sm:max-w-xs lg:max-w-lg">
              <div className="p-1.5 bg-gradient-to-br from-primary via-secondary to-accent mx-auto w-64 h-64 lg:w-full lg:h-[34rem] rounded-full lg:rounded-2xl shadow-2xl transition-transform duration-500 md:hover:scale-105">
                <img src={`${import.meta.env.BASE_URL}images/Image_001.jpeg`} alt="Andréa Macagnani - Psicóloga" className="object-cover w-full h-full rounded-full lg:rounded-2xl" decoding="async" />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-3 px-4 py-2 bg-white/90 rounded-full shadow-lg backdrop-blur-sm whitespace-nowrap">
                <HeartIcon className="text-xl text-primary" />
                <span className="font-semibold text-gray-dark">Cuidando da sua saúde emocional</span>
              </div>
            </div>
          </div>

          {/* --- Text & Desktop Buttons Block --- */}
          <div className="flex flex-col items-center w-full order-2 mt-8 text-center lg:w-6/12 lg:order-1 lg:mt-0 lg:items-start lg:text-left gap-4 lg:gap-[clamp(1.5rem,4vw,2.5rem)]">
            <h1 className="font-bold leading-tight text-gray-dark text-[clamp(1.875rem,4vw+1rem,3rem)] lg:text-5xl">
              Saúde Mental com <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Profissionalismo</span> e <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Acolhimento</span>
            </h1>
            <p className="max-w-xl mx-auto text-gray-600 lg:mx-0 text-[clamp(1rem,1vw+0.75rem,1.125rem)] lg:text-lg">
              Psicoterapia Cognitivo-Comportamental para crianças, adolescentes e adultos em Maringá e online
            </p>

            {/* Exibe Highlights/Buttons no desktop */}
            <div className="hidden w-full lg:block">
              <HighlightsAndButtons
                setActiveSection={setActiveSection}
                isClickScrolling={isClickScrolling}
                handleNavClick={handleNavClick}
              />
            </div>
          </div>

          {/* --- Seta de Rolagem 1 (Apenas Mobile) --- */}
          <div className="absolute bottom-4 order-3 lg:hidden">
            <button
              onClick={handleScrollToFeatures}
              className="text-gray-500 transition-colors animate-bounce hover:text-primary"
              aria-label="Rolar para baixo para ver mais"
            >
              <ChevronDownIcon className="text-4xl" />
            </button>
          </div>
        </div>

        {/* === MOBILE-ONLY MULTI-STEP SCREENS === */}
        <div className="lg:hidden">
          {/* SCREEN 2: FEATURE CARDS */}
          <div ref={featuresScreenRef} className="relative flex flex-col items-center justify-center min-h-screen pt-20 pb-12">
            <div className="grid w-full grid-cols-1 gap-6">
              <FeatureCard icon={<UserMdIcon />} title="10+ Anos de Experiência" text="Atendimento clínico especializado" />
              <FeatureCard icon={<GraduationCapIcon />} title="Formação Especializada" text="TCC e outras abordagens comprovadas" />
              <FeatureCard icon={<LaptopHouseIcon />} title="Atendimento Online" text="Conforto e comodidade no seu lar" />
            </div>
            {/* --- Seta de Rolagem 2 --- */}
            <div className="absolute bottom-4 translate-y-4"> {/* Ajuste a posição para baixo */}
              <button
                onClick={handleScrollToHighlights}
                className="text-gray-500 transition-colors animate-bounce hover:text-primary"
                aria-label="Rolar para a próxima seção"
              >
                <ChevronDownIcon className="text-4xl" />
              </button>
            </div>
          </div>

          {/* SCREEN 3: HIGHLIGHTS & BUTTONS */}
          <div ref={highlightsScreenRef} className="relative flex flex-col items-center justify-center min-h-screen pt-20 pb-12">
            <HighlightsAndButtons
              setActiveSection={setActiveSection}
              isClickScrolling={isClickScrolling}
              handleNavClick={handleNavClick}
            />
            {/* --- Seta de Rolagem 3 (Apenas Mobile) --- */}
            <div className="absolute bottom-4 translate-y-4"> {/* Ajuste a posição para baixo */}
              <button
                onClick={handleScrollToAbout}
                className="text-gray-500 transition-colors animate-bounce hover:text-primary"
                aria-label="Rolar para a seção Sobre Mim"
              >
                <ChevronDownIcon className="text-4xl" />
              </button>
            </div>
          </div>
        </div>

        {/* === DESKTOP-ONLY BELOW THE FOLD === */}
        <div className="hidden lg:block lg:pt-0 lg:pb-24">
          {/* Grid de Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <FeatureCard icon={<UserMdIcon />} title="10+ Anos de Experiência" text="Atendimento clínico especializado" />
            <FeatureCard icon={<GraduationCapIcon />} title="Formação Especializada" text="TCC e outras abordagens comprovadas" />
            <FeatureCard icon={<LaptopHouseIcon />} title="Atendimento Online" text="Conforto e comodidade no seu lar" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;