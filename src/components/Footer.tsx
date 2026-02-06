import React from 'react';
import { ChevronRightIcon, PhoneIcon, MapPinIcon, ClockIcon, InstagramIcon, WhatsappIcon, EnvelopeIcon } from './icons';

// Componente para links do rodapé para evitar repetição
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void; // Adiciona prop onClick
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, onClick }) => (
  <li>
    <a href={href} onClick={onClick} className="flex items-center gap-2 text-gray-300 transition-all duration-300 hover:text-primary hover:translate-x-2">
      <ChevronRightIcon className="text-primary" />
      {children}
    </a>
  </li>
);

// Componente para ícones sociais para um visual consistente
const SocialIcon: React.FC<{ href: string; 'aria-label': string; icon: React.ReactNode }> = ({ href, 'aria-label': ariaLabel, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="flex items-center justify-center w-10 h-10 text-xl rounded-full bg-gray-dark/20 text-gray-300 transition-[transform,color,background-color] duration-300 hover:bg-gradient-to-br hover:from-primary hover:to-accent hover:text-white hover:scale-110"
  >
    {icon}
  </a>
);

interface FooterProps { // Adiciona interface para as props do Footer
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Footer: React.FC<FooterProps> = ({ handleNavClick }) => { // Recebe handleNavClick via props
  return (
    <footer className="bg-secondary text-gray-200 font-roboto">
      <div className="container px-4 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

          {/* Coluna de Branding */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo Andréa Macagnani" className="w-16 h-16" />
              <div>
                <h3 className="text-xl font-bold text-white font-poppins">Andréa Macagnani</h3>
                <p className="text-gray-300">Psicóloga Clínica • CRP-08/09949</p>
              </div>
            </div>
            <p className="mb-6 text-base leading-relaxed text-gray-400 max-w-md">
              Psicoterapia Cognitivo-Comportamental para uma vida mais equilibrada e saudável, com atendimento especializado e acolhedor.
            </p>
            <div className="flex gap-4">
              <SocialIcon href="https://instagram.com/andreamacagnanipsicologia" aria-label="Instagram" icon={<InstagramIcon />} />
              <SocialIcon href="https://wa.me/5544988613000?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta!" aria-label="WhatsApp" icon={<WhatsappIcon />} />
              <SocialIcon href="mailto:andrea.macagnani@gmail.com" aria-label="E-mail" icon={<EnvelopeIcon />} />
            </div>
          </div>

          {/* Colunas de Links e Contato */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div>
              <h3 className="pb-3 mb-4 text-lg font-semibold text-white border-b font-poppins border-primary/30">Navegação</h3>
              <ul className="space-y-3">
                <FooterLink href="#home" onClick={handleNavClick}>Início</FooterLink>
                <FooterLink href="#sobre" onClick={handleNavClick}>Sobre Mim</FooterLink>
                <FooterLink href="#servicos" onClick={handleNavClick}>Serviços</FooterLink>
                <FooterLink href="#contato" onClick={handleNavClick}>Contato</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="pb-3 mb-4 text-lg font-semibold text-white border-b font-poppins border-primary/30">Serviços</h3>
              <ul className="space-y-3">
                <FooterLink href="#servicos" onClick={handleNavClick}>Psicoterapia Individual</FooterLink>
                <FooterLink href="#servicos" onClick={handleNavClick}>Atendimento Infanto-Juvenil</FooterLink>
                <FooterLink href="#servicos" onClick={handleNavClick}>Orientação Parental</FooterLink>
                <FooterLink href="#servicos" onClick={handleNavClick}>Avaliação Psicológica</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="pb-3 mb-4 text-lg font-semibold text-white border-b font-poppins border-primary/30">Contato</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <MapPinIcon className="flex-shrink-0 mt-1 text-lg text-primary" />
                  <div>
                    Maringá, Paraná
                    <br />
                    <span className="text-sm text-gray-400">Atendimento Presencial e Online</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneIcon className="flex-shrink-0 text-lg text-primary" />
                  <a href="https://wa.me/5544988613000" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">(44) 98861-3000</a>
                </li>
                <li className="flex items-start gap-3">
                  <ClockIcon className="flex-shrink-0 mt-1 text-lg text-primary" />
                  <span>Seg-Mex: 8h às 17h</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-dark bg-opacity-20">
        <div className="container px-4 py-6 mx-auto text-center max-w-7xl">
          <p className="text-sm text-primary">&copy; 2025 Andréa Macagnani - Psicóloga. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs text-primary">
            <strong>Atenção:</strong> Este site não oferece atendimento de emergência. Em caso de crise, ligue para <strong>188 (CVV)</strong> ou procure um pronto-socorro.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;