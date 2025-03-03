
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AnimatedLink from '../ui/AnimatedLink';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen, GraduationCap, Users, Briefcase, Award, Calendar, Laptop } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageDropdown } from './navbar/LanguageDropdown';
import { ThemeToggle } from './navbar/ThemeToggle';
import { UserProfileDropdown } from './navbar/UserProfileDropdown';
import { NavLinks } from './navbar/NavLinks';
import { MobileMenu } from './navbar/MobileMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, userType } = useAuth();
  const location = useLocation();

  // Common navigation items for all users
  const commonNavItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.blog'), path: '/blog' },
  ];

  // Mentor-specific navigation items
  const mentorNavItems = [
    { name: t('nav.mentoring'), path: '/mentoring', icon: <Users size={16} /> },
    { name: t('nav.resources'), path: '/mentor-resources', icon: <Calendar size={16} /> },
    { name: t('nav.workshops'), path: '/workshops', icon: <Laptop size={16} /> },
  ];

  // Learner-specific navigation items
  const learnerNavItems = [
    { name: t('nav.learning'), path: '/learning-path', icon: <BookOpen size={16} /> },
    { name: t('nav.courses'), path: '/courses', icon: <GraduationCap size={16} /> },
    { name: t('nav.my_mentors'), path: '/my-mentors', icon: <Users size={16} /> },
    { name: t('nav.internships'), path: '/internships', icon: <Briefcase size={16} /> },
    { name: t('nav.jobs'), path: '/job-opportunities', icon: <Award size={16} /> },
  ];

  // Dynamic navigation based on user type
  const getNavigation = () => {
    const navItems = [...commonNavItems];
    
    if (user) {
      if (userType === 'mentor') {
        return [...navItems, ...mentorNavItems];
      } else if (userType === 'learner') {
        return [...navItems, ...learnerNavItems];
      }
    } else {
      // Add additional items for non-authenticated users
      return [...navItems, 
        { name: t('nav.mentors'), path: '/mentors' },
        { name: t('nav.opportunities'), path: '/opportunities' },
      ];
    }
    
    return navItems;
  };

  const navigation = getNavigation();

  // Determine if we should hide the profile dropdown on certain pages
  const shouldHideProfileMenu = () => {
    // Hide profile dropdown on the my-mentors page for learners
    if (userType === 'learner' && location.pathname === '/my-mentors') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4',
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-sm' 
          : 'bg-white dark:bg-gray-900',
        location.pathname === '/my-mentors' 
          ? 'border-b border-orange-100 dark:border-gray-800' 
          : '',
        location.pathname === '/mentoring' 
          ? 'border-b border-purple-100 dark:border-gray-800' 
          : ''
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center">
          <AnimatedLink to="/" className="text-2xl font-bold text-gradient mr-8" underline={false}>
            TechHer
          </AnimatedLink>
          
          <NavLinks 
            navigation={navigation}
            className="hidden md:flex space-x-8"
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageDropdown />
          <ThemeToggle />
          
          {user ? (
            !shouldHideProfileMenu() && <UserProfileDropdown />
          ) : (
            <Button 
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6"
              onClick={() => navigate('/auth')}
            >
              {t('nav.join')}
            </Button>
          )}
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <LanguageDropdown />
          <ThemeToggle />
          
          <button
            className="rounded-md p-2 text-gray-800 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        navigation={navigation} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
