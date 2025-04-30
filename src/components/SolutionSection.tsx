
import React, { useEffect, useRef, useState } from 'react';
import { FileText, Check, Shield, ArrowRight } from 'lucide-react';

const SolutionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const solutions = [
    {
      icon: <FileText className="h-10 w-10 text-white" />,
      title: "Transação Tributária",
      description: "Reduções de até 70% sobre multas, juros e encargos legais, com análises personalizadas de elegibilidade.",
      benefits: ["Até 70% de desconto", "Análise por IA", "Verificação de elegibilidade"],
      bgClass: "bg-gradient-primary"
    },
    {
      icon: <Shield className="h-10 w-10 text-white" />,
      title: "Defesa em Execução Fiscal",
      description: "Estratégias avançadas para contestar cobranças indevidas e suspender execuções fiscais em andamento.",
      benefits: ["Desbloqueio de bens", "Suspensão da execução", "Análise técnica especializada"],
      bgClass: "bg-primary"
    },
    {
      icon: <Check className="h-10 w-10 text-white" />,
      title: "Parcelamentos Especiais",
      description: "Soluções de parcelamento adaptadas à realidade financeira da sua empresa, com prestações reduzidas.",
      benefits: ["Regularização tributária", "Obtenção de certidões", "Planejamento financeiro"],
      bgClass: "bg-gradient-primary"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24"
      id="solucao"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`section-title ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Soluções com Tecnologia Avançada
          </h2>
          <p className={`section-subtitle max-w-3xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '200ms'}}>
            Utilizamos inteligência artificial e análises avançadas para encontrar 
            as melhores estratégias para cada caso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`glass-card overflow-hidden transition-all duration-500 ${
                isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`${solution.bgClass} p-6`}>
                <div className="bg-white/20 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{solution.title}</h3>
              </div>
              <div className="p-6 bg-white">
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <ul className="space-y-3">
                  {solution.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2 flex-shrink-0 w-5 h-5 rounded-full bg-highlight flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '600ms'}}>
          <a href="#credibilidade" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
            Conheça nossa credibilidade
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
