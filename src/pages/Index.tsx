import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import CredibilitySection from '@/components/CredibilitySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import SimuladorTransacao from '@/components/SimuladorTransacao';
import QuemSomosSection from '@/components/QuemSomosSection';

const Index: React.FC = () => {
  useEffect(() => {
    // Set document title directly instead of using react-helmet
    document.title = "Resolva suas Dívidas Tributárias Federais | Pedrosa Peixoto Advogados";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Obtenha até 70% de desconto em multas e juros. Especialistas em transação tributária, execução fiscal e regularização de dívidas federais. Consulta gratuita!');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Obtenha até 70% de desconto em multas e juros. Especialistas em transação tributária, execução fiscal e regularização de dívidas federais. Consulta gratuita!';
      document.head.appendChild(meta);
    }
    
    // Add meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'transação tributária, execução fiscal, dívidas tributárias federais, advogado tributarista, PGFN, Pedrosa Peixoto Advogados');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'transação tributária, execução fiscal, dívidas tributárias federais, advogado tributarista, PGFN, Pedrosa Peixoto Advogados';
      document.head.appendChild(meta);
    }

    // Set up intersection observer for reveal animations
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SimuladorTransacao />
        <QuemSomosSection />
        <ProblemSection />
        <SolutionSection />
        <CredibilitySection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Index;
