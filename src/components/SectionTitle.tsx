import React, { useState, useEffect, useRef } from 'react';

interface SectionTitleProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon, title, subtitle }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger once
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
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
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-12 text-center transition-[opacity,transform] duration-1000 ease-out will-change-[opacity,transform] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      <div className="flex items-center justify-center gap-4">
        <span className="text-3xl text-primary md:text-4xl">{icon}</span>
        <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-[clamp(1.375rem,0.834rem+2.71vw,3rem)]">
          {title}
        </h2>
      </div>
      <p className="max-w-3xl mx-auto mt-4 text-gray-500 text-[clamp(1rem,1vw+0.75rem,1.125rem)]">
        {subtitle}
      </p>
      <div className="relative h-1 max-w-xs mx-auto mt-6">
        <div className={`absolute top-0 left-1/2 w-1/2 h-full bg-gray-200 rounded-full transition-transform duration-700 ease-out will-change-transform ${isVisible ? 'transform -translate-x-full' : 'transform -translate-x-0'}`}></div>
        <div className={`absolute top-0 right-1/2 w-1/2 h-full bg-gray-200 rounded-full transition-transform duration-700 ease-out will-change-transform ${isVisible ? 'transform translate-x-full' : 'transform translate-x-0'}`}></div>
        <div className={`absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-transform duration-1000 ease-out delay-200 will-change-transform ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
      </div>
    </div>
  );
};

export default SectionTitle;