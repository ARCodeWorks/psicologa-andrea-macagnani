import React, { useState, useEffect, useRef } from 'react';
import { GraduationCapIcon, HeartIcon, StarIcon, UserIcon } from './icons';
import SectionTitle from './SectionTitle';
import useIsDesktop from '../hooks/useIsDesktop';

// Componente wrapper para observar quando o elemento entra e sai da tela para aplicar a animação
const AnimatedCard: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Atualiza o estado de visibilidade baseado se o elemento está na tela ou não
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Aciona quando 10% do card está visível
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isDesktop]);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-1000 ease-out ${isDesktop ? 'will-change-[transform,opacity]' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: isDesktop ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

const About: React.FC = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
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
      id="sobre"
      className="relative flex flex-col items-center justify-center py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-pink-50/90 to-white backdrop-blur-sm z-0"></div>
      <div className={`relative z-10 container px-4 mx-auto max-w-7xl transition-[opacity,transform] duration-1000 ease-out ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <SectionTitle
          icon={<UserIcon />}
          title="Minha Jornada"
          subtitle="Conheça a profissional por trás do cuidado com sua saúde mental"
        />

        <div className="grid grid-cols-1 gap-16">

          <AnimatedCard>
            <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-xl md:flex-row transition-shadow duration-300 md:hover:shadow-2xl">
              <div className="relative flex-shrink-0 w-full md:w-1/3">
                <img src="https://www.catho.com.br/carreira-sucesso/wp-content/uploads/sites/3/2019/08/curriculo-sem-experiencia.jpg" alt="Andréa Macagnani - Psicóloga" className="object-cover w-full h-64 md:h-full" decoding="async" loading="lazy" />
                <div className="absolute bottom-0 w-full p-4 text-white bg-gradient-to-t from-black/70 to-transparent">
                  <h4 className="text-xl font-bold">Andréa Macagnani</h4>
                  <p className="text-sm">Psicóloga Clínica • CRP-08/09949</p>
                </div>
              </div>
              <div className="flex flex-col px-6 md:px-12 py-10 border-t md:w-2/3 md:border-t-0 md:border-l border-gray-200/80">
                <h3 className="flex items-center gap-3 text-[clamp(1.125rem,2vw+0.75rem,1.875rem)] font-bold text-secondary">
                  <span className="text-primary"><GraduationCapIcon /></span>
                  Formação e Experiência
                </h3>
                <div className="w-20 h-1 my-6 rounded-full bg-gradient-to-r from-primary/70 to-secondary/70"></div>
                <div className="space-y-4 text-justify text-gray-600 text-[clamp(1rem,1vw+0.75rem,1.125rem)]">
                  <p>Sou Andréa Macagnani, psicóloga dedicada a ajudar pessoas a superarem desafios e encontrarem mais equilíbrio emocional. Tenho pós-graduação na área clínica e especialização em Terapia Cognitivo-Comportamental (TCC), além de mais de 10 anos de experiência acompanhando crianças (a partir de 5 anos), adolescentes e adultos — presencialmente, em meu consultório em Maringá, e também online, para quem busca mais comodidade.</p>
                  <p>Meu trabalho vai além do atendimento individual, como supervisora e docente em cursos de pós-graduação, estou sempre em contato com as mais recentes pesquisas e técnicas da psicoterapia. Essa vivência me permite unir conhecimento sólido e prática clínica eficiente, oferecendo um atendimento personalizado, humano e fundamentado naquilo que realmente funciona.</p>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={200}>
            <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-xl md:flex-row-reverse transition-shadow duration-300 md:hover:shadow-2xl">
              <div className="relative flex-shrink-0 w-full md:w-1/3">
                <img src="https://blog.reagirpsicologia.com.br/wp-content/uploads/2023/06/Terapia-Reagir-Psicologia-870x600.png" alt="Consultório de psicologia aconchegante" className="object-cover w-full h-64 md:h-full" decoding="async" loading="lazy" />
              </div>
              <div className="flex flex-col px-6 md:px-12 py-10 md:w-2/3">
                <h3 className="flex items-center gap-3 text-[clamp(1.125rem,2vw+0.75rem,1.875rem)] font-bold text-secondary">
                  <span className="text-primary"><HeartIcon /></span>
                  Minha Abordagem Terapêutica
                </h3>
                <div className="w-20 h-1 my-6 rounded-full bg-gradient-to-r from-primary/70 to-secondary/70"></div>
                <div className="space-y-4 text-justify text-gray-600 text-[clamp(1rem,1vw+0.75rem,1.125rem)]">
                  <p>A Terapia Cognitivo-Comportamental que pratico é uma abordagem estruturada, focada no presente e orientada para objetivos. Trabalhamos juntos para identificar padrões de pensamento e comportamento que podem estar contribuindo para seu sofrimento emocional, desenvolvendo estratégias personalizadas para promover mudanças significativas e duradouras.</p>
                  <p>Meu estilo terapêutico combina empatia e acolhimento com técnicas cientificamente validadas. Acredito que a terapia deve ser um espaço seguro para autoconhecimento, mas também um processo ativo de transformação. Minha meta é capacitar meus pacientes com ferramentas que possam usar não apenas durante as sessões, mas em seu cotidiano.</p>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-xl md:flex-row transition-shadow duration-300 md:hover:shadow-2xl">
              <div className="relative flex-shrink-0 w-full md:w-1/3">
                <img src="https://unifor.br/documents/392178/0/Esp+em+Tecnologia_800.png/0d0ca2a1-43d5-2ec9-6a35-0b39df73d940?t=1712000434640" alt="Foco em saúde mental e especializações" className="object-cover w-full h-64 md:h-full" decoding="async" loading="lazy" />
              </div>
              <div className="flex flex-col px-6 md:px-12 py-10 md:w-2/3">
                <h3 className="flex items-center gap-3 text-[clamp(1.125rem,2vw+0.75rem,1.875rem)] font-bold text-secondary">
                  <span className="text-primary"><StarIcon /></span>
                  Especializações e Focos
                </h3>
                <div className="w-20 h-1 my-6 rounded-full bg-gradient-to-r from-primary/70 to-secondary/70"></div>
                <div className="space-y-4 text-justify text-gray-600 text-[clamp(1rem,1vw+0.75rem,1.125rem)]">
                  <p>Ao longo da minha carreira, desenvolvi um interesse especial e acumulei experiência em diversas áreas da saúde mental. Trabalho com transtornos de ansiedade (TAG, TOC, TEPT, pânico, fobias), depressão, desregulação emocional, além de questões de relacionamentos interpessoais e autoestima.</p>
                  <p>Tenho uma paixão particular por auxiliar na orientação parental, apoiando pais a enfrentarem os desafios da educação, e me dedico ao crescimento emocional de crianças e adolescentes. Em tudo o que faço, meu compromisso é oferecer um atendimento personalizado, respeitando a história única de cada pessoa para que juntos possamos encontrar o caminho rumo a uma vida mais plena e satisfatória.</p>
                </div>
              </div>
            </div>
          </AnimatedCard>

        </div>
      </div>
    </section>
  );
};

export default About;