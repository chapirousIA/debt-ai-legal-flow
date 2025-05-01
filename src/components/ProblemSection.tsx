import React, { useEffect, useRef, useState } from 'react';
import { FileText, Check, Shield, ArrowRight, Calendar } from 'lucide-react';
const ProblemSection: React.FC = () => {
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
  const problems = [{
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Bloqueio de Bens",
    description: "Contas bancárias, veículos e imóveis bloqueados pela Receita Federal e PGFN",
    delay: "100"
  }, {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Negativação",
    description: "Inclusão no CADIN e outros órgãos de restrição de crédito",
    delay: "300"
  }, {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Restrições",
    description: "Impedimento de participar de licitações e obter certidões negativas",
    delay: "500"
  }];
  return <section ref={sectionRef} className="bg-[#f9f9f9] py-16 md:py-24" id="problemas">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`section-title ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>ALERTA: IGNORAR SUAS DÍVIDAS FISCAIS PODE DESTRUIR TUDO QUE VOCÊ CONSTRUIU</h2>
          <p className={`section-subtitle max-w-3xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{
          animationDelay: '200ms'
        }}>Cada dia sem regularização fiscal é um passo mais próximo do colapso empresarial. Dívidas com a Receita Federal e PGFN não esperam - elas crescem silenciosamente enquanto seu patrimônio pessoal e empresarial fica cada vez mais vulnerável.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => <div key={index} className={`neomorphic p-8 transition-all duration-500 ${isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'}`} style={{
          animationDelay: `${problem.delay}ms`
        }}>
              <div className="bg-white rounded-full p-4 w-20 h-20 flex items-center justify-center mb-6 shadow-md mx-auto">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 text-center">{problem.title}</h3>
              <p className="text-gray-600 text-center">{problem.description}</p>
            </div>)}
        </div>

        <div className={`mt-12 text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{
        animationDelay: '700ms'
      }}>
          <a href="#solucao" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
            Conheça nossas soluções
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>;
};
export default ProblemSection;