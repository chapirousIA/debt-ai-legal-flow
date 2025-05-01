
import React from 'react';
import { ArrowRight } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import CircuitAnimation from './CircuitAnimation';
import ModernStatsCard from './ModernStatsCard';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white" id="hero">
      {/* Fundo com imagem do escritório */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10"></div>
        <img 
          src="/lovable-uploads/9079cc12-417d-47af-8ea0-58d36848bbf6.png" 
          alt="Escritório Pedrosa Peixoto" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute inset-0 circuit-bg opacity-10 z-0"></div>
      
      <div className="container-section relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d3748] mb-6 leading-tight">
              Resolva suas<br />
              <span className="text-[#f59e0b]">Dívidas Tributárias</span><br />
              Federais com Excelência
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-700">
              Obtenha até <span className="font-bold text-[#f59e0b]">70% de desconto</span> em multas e juros com nossa expertise jurídica especializada.
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
            <div className="relative z-10">
              <ModernStatsCard />
              
              <div className="mt-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src="/lovable-uploads/ae0527df-92cb-4eb7-8435-e9dba055ca3d.png" 
                    alt="Pedrosa & Peixoto" 
                    className="h-16 mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Expertise jurídica que faz a diferença</h3>
                    <p className="text-gray-600">Advogados especialistas em Direito Tributário</p>
                  </div>
                </div>
                <CircuitAnimation />
              </div>
            </div>
            
            {/* Background decorations */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#f59e0b]/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/10 rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
