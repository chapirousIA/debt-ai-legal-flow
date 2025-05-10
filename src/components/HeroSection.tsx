
import React from 'react';
import { ArrowRight } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import CircuitAnimation from './CircuitAnimation';
import { motion } from 'framer-motion';
import { Globe } from './ui/globe';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative overflow-hidden bg-white pt-32 md:pt-0" id="hero">
      <div className="absolute inset-0 circuit-bg opacity-10 z-0"></div>
      
      <div className="container-section relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Resolva suas<br />
              <span className="text-secondary">Dívidas Tributárias</span><br />
              Federais com Inovação
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-700">
              Obtenha até <span className="font-bold text-highlight">70% de desconto</span> em multas e juros utilizando nossa abordagem tecnológica avançada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contato"
                className="btn-primary flex items-center justify-center"
              >
                Faça seu Diagnóstico
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <WhatsAppButton text="Fale Conosco" className="btn-secondary" />
            </div>
          </div>
          
          <div className="lg:w-1/2 relative h-80 md:h-96">
            {/* Only show Globe on desktop or position it differently on mobile */}
            {!isMobile ? (
              <div className="relative w-full h-full">
                <Globe className="top-0 left-0" />
                
                {/* Background decorations */}
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-highlight/20 rounded-full filter blur-3xl -z-10"></div>
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/20 rounded-full filter blur-3xl -z-10"></div>
              </div>
            ) : (
              <div className="hidden md:block relative w-full h-full">
                <Globe className="top-0 left-0" />
                
                {/* Background decorations */}
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-highlight/20 rounded-full filter blur-3xl -z-10"></div>
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/20 rounded-full filter blur-3xl -z-10"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
