import React, { useEffect, useRef, useState } from 'react';
import { Users, Award, Check } from 'lucide-react';
const QuemSomosSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return <section ref={sectionRef} className="py-16 md:py-24 bg-white" id="quem-somos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`section-title ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            QUEM SOMOS
          </h2>
          <p className={`section-subtitle max-w-3xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{
          animationDelay: '200ms'
        }}>O Pedrosa &amp; Peixoto Advogados é um escritório de advoacia especializado na resolução de conflitos fiscais e negociação de dívidas junto à Procuradoria-Geral da Fazenda Nacional, com mais de 15 anos de experiência transformando situações críticas em oportunidades de recomeço para nossos clientes.</p>
        </div>

        <div className="mb-12 text-center">
          <h3 className={`text-2xl font-bold text-primary mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{
          animationDelay: '300ms'
        }}>
            POR QUE NOS ESCOLHER?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`glass-card p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{
          animationDelay: '400ms'
        }}>
            <div className="flex items-center mb-4">
              <div className="bg-primary/10 rounded-full p-3 mr-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-primary">Especialização</h4>
            </div>
            <p className="text-gray-600">
              Somos um escritório dedicado ao Direito Tributário, com foco na transação tributária e regularização de 
              dívidas fiscais. Nossa equipe de advogados é formada por especialistas com certificações específicas em 
              Direito Tributário com experiência comprovada em negociações com a PGFN.
            </p>
          </div>

          <div className={`glass-card p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{
          animationDelay: '500ms'
        }}>
            <div className="flex items-center mb-4">
              <div className="bg-primary/10 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-primary">Transparência e Personalização</h4>
            </div>
            <p className="text-gray-600">
              Acreditamos que cada caso é único e merece atenção individualizada. Por isso, realizamos um diagnóstico 
              completo de sua situação fiscal antes de propor qualquer estratégia, apresentando sempre um relatório 
              claro e todas as possibilidades de negociação, com total transparência quanto a custos e resultados esperados.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default QuemSomosSection;