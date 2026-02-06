import React, { useState, useEffect, useRef } from 'react';
import { UserTieIcon, ChildIcon, UsersIcon, ClipboardCheckIcon, BrainIcon, GraduationCapIcon, CheckCircleIcon, BriefcaseIcon } from './icons';
import SectionTitle from './SectionTitle';
import useIsDesktop from '../hooks/useIsDesktop';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, details }) => (
  <div className="relative flex flex-col overflow-hidden bg-white rounded-xl shadow-md transition-transform duration-300 group md:hover:shadow-xl md:hover:shadow-primary/20 md:hover:-translate-y-2 border border-gray-100 h-full md:will-change-transform">
    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary"></div>
    <div className="p-8 flex-grow flex flex-col">
      <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 text-primary text-3xl transition-transform duration-300 md:group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-4 font-bold text-secondary text-[clamp(1.125rem,2vw+0.75rem,1.25rem)]">{title}</h3>
      <p className="flex-grow text-gray-600 text-[clamp(0.9rem,1.5vw+0.5rem,1rem)]">{description}</p>
    </div>
    <div className="px-8 py-6 mt-auto bg-primary/5 border-t border-primary/10">
      <ul className="space-y-3">
        {details.map((detail, index) => (
          <li key={index} className="flex items-center gap-3 text-gray-700">
            <CheckCircleIcon className="flex-shrink-0 text-lg text-primary" />
            <span className="text-[clamp(0.9rem,1.5vw+0.5rem,1rem)]">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const AnimatedServiceCard: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [isDesktop]);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: isDesktop ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};


const Services: React.FC = () => {
  const servicesData = [
    { icon: <UserTieIcon />, title: "Psicoterapia Individual", description: "Atendimento personalizado para adultos, com abordagem Cognitivo-Comportamental para tratar questões de saúde mental e outras demandas.", details: ["Presencial ou Online", "Sessões semanais", "Duração: 50 minutos"] },
    { icon: <ChildIcon />, title: "Atendimento Infanto-Juvenil", description: "Terapia lúdica para crianças a partir de 5 anos, ajudando no desenvolvimento emocional e resolução de desafios comportamentais.", details: ["Abordagem lúdica", "Inclui orientação parental", "Ambiente acolhedor"] },
    { icon: <UsersIcon />, title: "Orientação Parental", description: "Apoio psicológico para pais e cuidadores, com estratégias eficazes para educação positiva e gestão de desafios familiares.", details: ["Estratégias personalizadas", "Desenvolvimento infantil", "Comunicação familiar"] },
    { icon: <ClipboardCheckIcon />, title: "Avaliação Psicológica", description: "Processo de avaliação para diversas finalidades, incluindo cirurgias bariátricas, laqueadura, vasectomia e concursos públicos.", details: ["Laudos técnicos", "Testes validados", "Relatórios detalhados"] },
    { icon: <BrainIcon />, title: "Treino Cognitivo", description: "Desenvolvimento de habilidades cognitivas para melhorar memória, atenção e funções executivas em todas as idades.", details: ["Exercícios específicos", "Melhora de desempenho", "Técnicas comprovadas"] },
    { icon: <GraduationCapIcon />, title: "Orientação Vocacional", description: "Processo de autoconhecimento para auxiliar adolescentes e adultos na escolha profissional e planejamento de carreira.", details: ["Testes psicológicos", "Análise de perfil", "Planejamento estratégico"] },
  ];

  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
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

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="relative flex flex-col items-center justify-center pt-24 pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-pink-50/90 to-white backdrop-blur-sm z-0"></div>
      <div className={`relative z-10 container px-4 mx-auto max-w-7xl transition-[opacity,transform] duration-1000 ease-out ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <SectionTitle
          icon={<BriefcaseIcon />}
          title="Serviços Especializados"
          subtitle="Ofereço abordagens personalizadas para cada fase da vida, com foco no seu bem-estar emocional"
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <AnimatedServiceCard key={index} delay={index * 100}>
              <ServiceCard {...service} />
            </AnimatedServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;