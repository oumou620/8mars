
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const testimonials = [
  {
    name: 'Emma Johnson',
    role: 'Software Engineer at Google',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    content: 'TechHer gave me the confidence to pursue my dreams in tech. The mentorship I received was invaluable for my career development.'
  },
  {
    name: 'Sophia Chen',
    role: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    content: 'Through TechHer, I found a community that understands the challenges women face in tech. The support I\'ve received has been amazing.'
  },
  {
    name: 'Zoe Martinez',
    role: 'Data Scientist',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    content: 'The courses and resources on TechHer helped me transition into data science. I\'m grateful for this platform and the doors it\'s opened for me.'
  },
];

const Testimonials = () => {
  const { t } = useLanguage();
  
  return (
    <section className="section-padding bg-gradient-to-b from-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="bg-dot-pattern absolute inset-0 opacity-50"></div>
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">{t('testimonials.title')}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {t('testimonials.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <GlassCard 
              key={testimonial.name} 
              className="h-full flex flex-col animate-fade-up card-hover"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Quote className="text-indigo-400 h-8 w-8 mb-4" />
              <div className="flex-1">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">{testimonial.content}</p>
              </div>
              <div className="flex items-center mt-4">
                <div className="h-14 w-14 rounded-full overflow-hidden mr-4 border-2 border-indigo-200 shadow-md">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900">{testimonial.name}</h4>
                  <p className="text-sm text-indigo-600">{testimonial.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center px-8 py-4 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            {t('testimonials.more')}
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-pink-400 rounded-full filter blur-3xl opacity-20 -z-10 animate-float"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-20 -z-10 animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Testimonials;
