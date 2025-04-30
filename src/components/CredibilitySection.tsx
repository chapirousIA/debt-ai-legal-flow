
import React, { useEffect, useRef, useState } from 'react';
import { Star, FileText, CheckCircle } from 'lucide-react';
import FileX from './FileX';
import HandShake from './HandShake';

const CredibilitySection: React.FC = () => {
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

  const testimonials = [
    {
      name: "Ricardo Martins",
      company: "Comércio Eletrônico Ltda",
      text: "Conseguimos reduzir 65% da nossa dívida tributária federal e voltamos a operar sem restrições. O processo foi muito mais rápido do que esperávamos graças à eficiência tecnológica desse escritório.",
      stars: 5
    },
    {
      name: "Marina Sousa",
      company: "Indústria de Alimentos S/A",
      text: "Estávamos muito preocupados com o bloqueio de contas que afetou nosso fluxo de caixa, mas em apenas 3 semanas conseguiram reverter a situação e estruturar um acordo vantajoso.",
      stars: 5
    },
    {
      name: "Paulo Mendes",
      company: "Transportadora Express",
      text: "A abordagem tecnológica para análise das nossas dívidas identificou inconsistências que nem sabíamos existir. Conseguimos reduzir significativamente o valor devido e negociar um parcelamento adequado ao nosso orçamento.",
      stars: 5
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="bg-white py-16 md:py-24"
      id="credibilidade"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`section-title ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Por que Confiar em Nossa Abordagem
          </h2>
          <p className={`section-subtitle max-w-3xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            Nossa metodologia combina experiência jurídica com tecnologia avançada,
            trazendo resultados consistentes e inovadores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 mb-16">
          <div className={`text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <div className="bg-primary/10 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <FileX className="h-10 w-10 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <p className="text-gray-600">Taxa de sucesso em transações tributárias</p>
          </div>
          
          <div className={`text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
            <div className="bg-primary/10 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary mb-2">R$ 50M+</div>
            <p className="text-gray-600">Em dívidas reduzidas nos últimos 2 anos</p>
          </div>
          
          <div className={`text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>
            <div className="bg-primary/10 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <HandShake className="h-10 w-10 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary mb-2">200+</div>
            <p className="text-gray-600">Empresas assessoradas com sucesso</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className={`text-2xl font-bold text-primary mb-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '700ms' }}>
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
              style={{ animationDelay: `${800 + index * 200}ms` }}
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

        <div className="flex flex-wrap justify-center mt-16 items-center gap-8">
          {['OAB', 'IBDT', 'IBA', 'ABIT'].map((logo, idx) => (
            <div 
              key={idx} 
              className={`bg-white h-16 w-32 flex items-center justify-center rounded-lg shadow-sm ${
                isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`} 
              style={{ animationDelay: `${1400 + idx * 100}ms` }}
            >
              <span className="text-gray-400 font-semibold">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;
