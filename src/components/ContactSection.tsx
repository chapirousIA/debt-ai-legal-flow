
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import WhatsAppButton from './WhatsAppButton';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome precisa ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(10, { message: 'Telefone inválido' }).max(15),
  message: z.string().min(10, { message: 'Mensagem muito curta' }).max(500)
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', data);
    
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em breve.",
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 md:py-24 relative" id="contato">
      <div className="absolute inset-0 circuit-bg opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title">Entre em Contato</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Agende uma consulta gratuita e descubra como podemos ajudar a resolver suas dívidas tributárias
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition`}
                  placeholder="Seu nome completo"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition`}
                  placeholder="Descreva brevemente sua situação..."
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Enviando...' : 'Solicitar Consulta Gratuita'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="glass-card p-8 bg-primary text-white">
              <h3 className="text-2xl font-bold mb-6">Atendimento Rápido</h3>
              
              <div className="space-y-6 mb-8">
                <p className="flex items-start">
                  <span className="mr-3 mt-1">📞</span>
                  <span>Entre em contato pelos nossos canais de atendimento e receba uma resposta imediata.</span>
                </p>
                
                <p className="flex items-start">
                  <span className="mr-3 mt-1">🔒</span>
                  <span>Suas informações são confidenciais e protegidas pelo sigilo advocatício.</span>
                </p>
                
                <p className="flex items-start">
                  <span className="mr-3 mt-1">💼</span>
                  <span>Nossa equipe está pronta para oferecer a melhor solução para o seu caso.</span>
                </p>
              </div>
              
              <WhatsAppButton text="Falar no WhatsApp" variant="outline" fullWidth />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
