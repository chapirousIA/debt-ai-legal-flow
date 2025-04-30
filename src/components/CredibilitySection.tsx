
import React, { useEffect, useRef, useState } from 'react';
import { Handshake, Users, PiggyBank, Percent, ArrowRight } from 'lucide-react';

const CredibilitySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    cases: 0,
    savings: 0,
    clients: 0,
    satisfaction: 0
  });

  const targetCounters = {
    cases: 540,
    savings: 70,
    clients: 320,
    satisfaction: 98
  };

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

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // ms
      const interval = 20; // ms
      const steps = duration / interval;
      let step = 0;
      
      const timer = setInterval(() => {
        if (step < steps) {
          setCounters({
            cases: Math.round((targetCounters.cases / steps) * step),
            savings: Math.round((targetCounters.savings / steps) * step),
            clients: Math.round((targetCounters.clients / steps) * step),
            satisfaction: Math.round((targetCounters.satisfaction / steps) * step)
          });
          step++;
        } else {
          setCounters(targetCounters);
          clearInterval(timer);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const stats = [
    {
      icon: <FileX className="h-10 w-10 text-primary" />,
      value: counters.cases,
      label: "Casos Resolvidos",
      suffix: "+"
    },
    {
      icon: <Percent className="h-10 w-10 text-primary" />,
      value: counters.savings,
      label: "Economia em Multas e Juros",
      suffix: "%"
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      value: counters.clients,
      label: "Clientes Atendidos",
      suffix: "+"
    },
    {
      icon: <HandShake className="h-10 w-10 text-primary" />,
      value: counters.satisfaction,
      label: "Índice de Satisfação",
      suffix: "%"
    }
  ];

  const testimonials = [
    {
      text: "A abordagem tecnológica deles fez toda a diferença. Conseguimos uma redução impressionante e todo o processo foi extremamente transparente.",
      author: "Carlos Mendes",
      position: "Diretor Financeiro"
    },
    {
      text: "Eles analisaram nosso caso e encontraram oportunidades que outros escritórios não viram. O resultado foi muito além do que esperávamos.",
      author: "Ana Paula Silva",
      position: "Empresária"
    },
    {
      text: "A rapidez e precisão da análise me impressionaram. Em poucos dias já tinham um plano completo para resolver nossas pendências.",
      author: "Roberto Almeida",
      position: "Contador"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#f9f9f9] py-16 md:py-24"
      id="credibilidade"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`section-title ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Nossa Credibilidade
          </h2>
          <p className={`section-subtitle max-w-3xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '200ms'}}>
            Resultados comprovados e reconhecimento dos nossos clientes
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center ${isVisible ? 'animate-count-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-block bg-white rounded-full p-4 shadow-md mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <h3 className={`text-2xl font-bold text-center mb-10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '500ms'}}>
          O que nossos clientes dizem
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-xl shadow-lg ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{animationDelay: `${600 + index * 200}ms`}}
            >
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 mr-1">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-primary">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '1200ms'}}>
          <a href="#contato" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
            Fale com nossa equipe
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;
