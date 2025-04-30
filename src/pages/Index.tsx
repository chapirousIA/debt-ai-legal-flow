
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import CredibilitySection from '@/components/CredibilitySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const Index: React.FC = () => {
  useEffect(() => {
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
      <Helmet>
        <title>Resolva suas Dívidas Tributárias Federais | Advogados Especialistas</title>
        <meta name="description" content="Obtenha até 70% de desconto em multas e juros. Especialistas em transação tributária, execução fiscal e regularização de dívidas federais. Consulta gratuita!" />
        <meta name="keywords" content="transação tributária, execução fiscal, dívidas tributárias federais, advogado tributarista, PGFN" />
      </Helmet>
      
      <Header />
      <main>
        <HeroSection />
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
