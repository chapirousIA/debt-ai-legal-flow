
import React from 'react';
import { ArrowRight } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import CircuitAnimation from './CircuitAnimation';
import { GlobeDemo } from './ui/globe';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white" id="hero">
      {/* Add globe in background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <GlobeDemo />
      </div>
      
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
                Consulta Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <WhatsAppButton text="Fale Conosco" className="btn-secondary" />
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 animate-float">
              <div className="bg-white/30 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg">
                <CircuitAnimation />
                <div className="mt-6 flex justify-center">
                  <div className="flex flex-col items-center px-4">
                    <div className="text-4xl font-bold text-primary">70%</div>
                    <div className="text-sm text-gray-600">Redução em Multas</div>
                  </div>
                  <div className="flex flex-col items-center px-4 border-l border-gray-200">
                    <div className="text-4xl font-bold text-primary">100%</div>
                    <div className="text-sm text-gray-600">Análise Digital</div>
                  </div>
                  <div className="flex flex-col items-center px-4 border-l border-gray-200">
                    <div className="text-4xl font-bold text-primary">24h</div>
                    <div className="text-sm text-gray-600">Resposta Rápida</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decorations */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-highlight/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/20 rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
