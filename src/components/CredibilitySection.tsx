
import React, { useEffect, useRef, useState } from 'react';
import { Star, FileText, CheckCircle } from 'lucide-react';
import FileX from './FileX';
import HandShake from './HandShake';

const CredibilitySection: React.FC = () => {
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

  const steps = [{
    title: "Diagnóstico",
    description: "Analisamos todas as suas dívidas federais para identificar como você pode reduzi-las. Detectamos erros que podem anular partes da dívida, prazos vencidos e outras oportunidades, calculando os potenciais benefícios – como descontos de até 70%",
    icon: <FileText className="h-10 w-10 text-primary" />,
    delay: "100"
  }, {
    title: "Planejamento",
    description: "Criamos um plano personalizado, ajustado à sua capacidade financeira, para aproveitar as melhores condições de parcelamento (até 145 vezes) e descontos disponíveis nos editais.",
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    delay: "300"
  }, {
    title: "Apresentação",
    description: "Entregamos um relatório claro com todos os benefícios que você pode obter, mostrando como sair da inadimplência com segurança",
    icon: <FileX className="h-10 w-10 text-primary" />,
    delay: "500"
  }, {
    title: "Efetivação",
    description: "Gerenciamos todo o processo no portal REGULARIZE, desde a adesão até a confirmação do seu acordo, garantindo um caminho tranquilo para você.",
    icon: <HandShake className="h-10 w-10 text-primary" />,
    delay: "700"
  }];

  const testimonials = [{
    name: "Ricardo Martins",
    company: "Comércio Eletrônico Ltda",
    text: "Conseguimos reduzir 65% da nossa dívida tributária federal e voltamos a operar sem restrições. O processo foi muito mais rápido do que esperávamos graças à eficiência tecnológica desse escritório.",
    stars: 5
  }, {
    name: "Marina Sousa",
    company: "Indústria de Alimentos S/A",
    text: "Estávamos muito preocupados com o bloqueio de contas que afetou nosso fluxo de caixa, mas em apenas 3 semanas conseguiram reverter a situação e estruturar um acordo vantajoso.",
    stars: 5
  }, {
    name: "Paulo Mendes",
    company: "Transportadora Express",
    text: "A abordagem tecnológica para análise das nossas dívidas identificou inconsistências que nem sabíamos existir. Conseguimos reduzir significativamente o valor devido e negociar um parcelamento adequado ao nosso orçamento.",
    stars: 5
  }];

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24" id="credibilidade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`section-title ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>Diagnóstico e Gestão do Passivo Tributário</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`glass-card p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{
                animationDelay: `${step.delay}ms`
              }}
            >
              <div className="bg-primary/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 text-center">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h3
            className={`text-2xl font-bold text-primary mb-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{
              animationDelay: '900ms'
            }}
          >
            O que Nossos Clientes Dizem
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`glass-card overflow-hidden transition-all duration-500 ${
                isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${1000 + index * 200}ms`
              }}
            >
              <div className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-highlight fill-highlight" />
                  ))}
                </div>
                <p className="italic text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* A seção de logos foi removida daqui */}
      </div>
    </section>
  );
};

export default CredibilitySection;
