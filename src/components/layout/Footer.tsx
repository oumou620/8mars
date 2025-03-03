
import React from 'react';
import AnimatedLink from '../ui/AnimatedLink';
import { Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gradient">TechHer</h2>
            <p className="text-sm text-gray-600 max-w-xs">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-techher-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-techher-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-techher-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-techher-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">{t('footer.navigation')}</h3>
            <ul className="mt-4 space-y-2">
              <li><AnimatedLink to="/" className="text-gray-600 hover:text-techher-purple">{t('nav.home')}</AnimatedLink></li>
              <li><AnimatedLink to="/mentors" className="text-gray-600 hover:text-techher-purple">{t('nav.mentors')}</AnimatedLink></li>
              <li><AnimatedLink to="/learning" className="text-gray-600 hover:text-techher-purple">{t('nav.learning')}</AnimatedLink></li>
              <li><AnimatedLink to="/community" className="text-gray-600 hover:text-techher-purple">{t('nav.community')}</AnimatedLink></li>
              <li><AnimatedLink to="/opportunities" className="text-gray-600 hover:text-techher-purple">{t('nav.opportunities')}</AnimatedLink></li>
              <li><AnimatedLink to="/blog" className="text-gray-600 hover:text-techher-purple">{t('nav.blog')}</AnimatedLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">{t('footer.resources')}</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-techher-purple link-underline">{t('footer.resources.start')}</a></li>
              <li><a href="#" className="text-gray-600 hover:text-techher-purple link-underline">{t('footer.resources.docs')}</a></li>
              <li><a href="#" className="text-gray-600 hover:text-techher-purple link-underline">{t('footer.resources.support')}</a></li>
              <li><a href="#" className="text-gray-600 hover:text-techher-purple link-underline">{t('footer.resources.faq')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">{t('footer.contact')}</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-techher-purple" />
                <a href="mailto:info@techher.org" className="text-gray-600 hover:text-techher-purple link-underline">
                  info@techher.org
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium">{t('footer.newsletter')}</h4>
              <div className="mt-2 flex max-w-md">
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="w-full min-w-0 rounded-l-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-primary focus:ring-primary"
                />
                <button
                  type="submit"
                  className="rounded-r-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {t('footer.newsletter.button')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
