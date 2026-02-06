import React, { useState, useEffect, useRef } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon, InstagramIcon, WhatsappIcon } from './icons';
import SectionTitle from './SectionTitle';

interface ContactMethodProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const ContactMethod: React.FC<ContactMethodProps> = ({ icon, title, children }) => (
  <div className="flex items-start gap-4">
    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-2xl rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 text-primary">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-gray-dark text-[clamp(1rem,4vw,1.125rem)]">{title}</h3>
      <div className="text-gray-600 text-[clamp(0.9rem,3vw,1rem)]">{children}</div>
    </div>
  </div>
);

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; 'aria-label': string }> = (props) => (
  <a href={props.href} target="_blank" rel="noopener noreferrer" aria-label={props['aria-label']} className="flex items-center justify-center w-12 h-12 text-xl rounded-full bg-gray-100 text-secondary transition-[transform,background-color,color] duration-300 md:hover:bg-gradient-to-br md:hover:from-primary md:hover:to-secondary md:hover:text-white md:hover:scale-110 md:hover:shadow-lg">
    {props.icon}
  </a>
);

const Contact: React.FC = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

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
      id="contato"
      className="relative flex flex-col items-center justify-center min-h-screen pt-24 pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-pink-50/90 to-white backdrop-blur-sm z-0"></div>
      <div className={`relative z-10 container px-4 mx-auto max-w-7xl transition-[opacity,transform] duration-1000 ease-out ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <SectionTitle
          icon={<EnvelopeIcon />}
          title="Entre em Contato"
          subtitle="Sua saúde mental merece atenção especializada. Estou aqui para ajudar no seu caminho de autoconhecimento e bem-estar."
        />
        <div className="max-w-6xl mx-auto overflow-hidden bg-white rounded-lg shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left Column: Direct Info */}
            <div className="p-[clamp(1rem,5vw,2.5rem)]">
              <h3 className="mb-[clamp(1rem,4vw,1.5rem)] font-bold text-secondary text-[clamp(1.25rem,5vw,1.5rem)]">Canais de Atendimento</h3>
              <div className="flex flex-col gap-[clamp(1rem,4vw,1.5rem)]">
                <ContactMethod icon={<EnvelopeIcon />} title="E-mail">
                  <a href="mailto:andrea.macagnani@gmail.com" className="transition-colors hover:text-primary">andrea.macagnani@gmail.com</a>
                </ContactMethod>
                <ContactMethod icon={<PhoneIcon />} title="Telefone/WhatsApp">
                  <a href="https://wa.me/5544988613000" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">(44) 98861-3000</a>
                </ContactMethod>
                <ContactMethod icon={<MapPinIcon />} title="Endereço">
                  <p>Maringá, Paraná</p>
                  <p className="text-sm text-gray-500">Consultório presencial e online</p>
                </ContactMethod>
                <ContactMethod icon={<ClockIcon />} title="Horário de Atendimento">
                  <p>Segunda a Sexta: 8h às 17h</p>
                </ContactMethod>
              </div>
              <hr className="my-[clamp(1.5rem,5vw,2rem)] border-gray-200" />
              <div className="text-center">
                <h4 className="mb-[clamp(0.75rem,3vw,1.25rem)] font-semibold text-gray-dark text-[clamp(1rem,4vw,1.125rem)]">Siga nas redes sociais</h4>
                <div className="flex justify-center gap-4 sm:gap-6">
                  <SocialLink href="https://instagram.com/andreamacagnanipsicologia" icon={<InstagramIcon />} aria-label="Instagram" />
                  <SocialLink href="https://wa.me/5544988613000?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta!" icon={<WhatsappIcon />} aria-label="WhatsApp" />
                  <SocialLink href="mailto:andrea.macagnani@gmail.com" icon={<EnvelopeIcon />} aria-label="E-mail" />
                </div>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative hidden w-full h-auto lg:block">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Maring%C3%A1_City.jpg"
                alt="Ambiente de consultório de psicologia, simbolizando um espaço para contato"
                className="object-cover w-full h-full"
                decoding="async"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;