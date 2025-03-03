
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { UserPlus, BookOpen, MessageSquare, Briefcase, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      name: t('features.mentors.title'),
      description: t('features.mentors.description'),
      icon: UserPlus,
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      name: t('features.learning.title'),
      description: t('features.learning.description'),
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: t('features.community.title'),
      description: t('features.community.description'),
      icon: MessageSquare,
      color: 'from-pink-500 to-pink-600',
    },
    {
      name: t('features.career.title'),
      description: t('features.career.description'),
      icon: Briefcase,
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      name: t('features.network.title'),
      description: t('features.network.description'),
      icon: Globe,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-indigo-50 to-white section-padding relative overflow-hidden" id="features">
      <div className="bg-dot-pattern absolute inset-0 opacity-50"></div>
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">{t('features.title')}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {t('features.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassCard 
              key={feature.name} 
              className="h-full transition-all duration-300 hover:translate-y-[-8px] animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center bg-gradient-to-r ${feature.color} mb-6 shadow-lg`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-indigo-900">{feature.name}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center text-lg font-medium text-indigo-600 hover:text-indigo-800 transition-colors link-underline">
            {t('features.more')}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-indigo-300 rounded-full filter blur-3xl opacity-20 -z-10 animate-float"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-20 -z-10 animate-float" style={{ animationDelay: '3s' }}></div>
    </section>
  );
};

export default Features;
