
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* Learning Paths Section */}
        <section className="section-padding relative">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 animate-fade-up">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('learning.title')}</h2>
                <p className="text-gray-600 text-sm mb-6">
                  {t('learning.description')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-techher-light-purple flex items-center justify-center mt-1">
                      <span className="text-techher-purple font-semibold text-xs">1</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-base font-semibold">{t('learning.path1.title')}</h3>
                      <p className="text-gray-600 text-xs">{t('learning.path1.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-techher-light-purple flex items-center justify-center mt-1">
                      <span className="text-techher-purple font-semibold text-xs">2</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-base font-semibold">{t('learning.path2.title')}</h3>
                      <p className="text-gray-600 text-xs">{t('learning.path2.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-techher-light-purple flex items-center justify-center mt-1">
                      <span className="text-techher-purple font-semibold text-xs">3</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-base font-semibold">{t('learning.path3.title')}</h3>
                      <p className="text-gray-600 text-xs">{t('learning.path3.description')}</p>
                    </div>
                  </div>
                </div>
                <Button 
                  className="mt-6 rounded-full px-5 py-4 bg-orange-600 hover:bg-orange-700 text-white text-sm"
                  onClick={() => navigate('/learning')}
                >
                  {t('learning.explore')}
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
              <div className="order-1 lg:order-2 animate-fade-in">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-techher-blue/20 to-techher-purple/20 rounded-3xl blur-xl opacity-70"></div>
                  <div className="relative glass rounded-3xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80" 
                      alt="Learning paths" 
                      className="w-full h-auto rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Testimonials />
        
        {/* CTA Section */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-techher-purple/10 to-techher-blue/10"></div>
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-8">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="rounded-full px-6 py-5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium"
                onClick={() => navigate('/mentors')}
              >
                {t('cta.join')}
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full px-6 py-5 border-gray-300 text-sm"
                onClick={() => navigate('/learning')}
              >
                {t('cta.explore')}
              </Button>
            </div>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute top-1/3 left-10 w-64 h-64 bg-techher-soft-pink rounded-full filter blur-3xl opacity-20 -z-10 animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-techher-light-purple rounded-full filter blur-3xl opacity-20 -z-10 animate-pulse-slow"></div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
