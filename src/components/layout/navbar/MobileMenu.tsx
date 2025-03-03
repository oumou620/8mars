
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedLink from '../../ui/AnimatedLink';
import { NavLinks } from './NavLinks';

interface MobileMenuProps {
  isOpen: boolean;
  navigation: { name: string; path: string; icon?: React.ReactNode }[];
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navigation, onClose }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-fade-in">
      <div className="px-4 py-6 space-y-4">
        <NavLinks 
          navigation={navigation} 
          className="flex flex-col space-y-4" 
          onClick={onClose}
        />
        
        {user ? (
          <>
            <AnimatedLink
              to="/profile"
              className="block py-2 font-medium text-gray-800 flex items-center"
              onClick={onClose}
            >
              <span className="mr-2">{t('nav.profile')}</span>
            </AnimatedLink>
            <Button 
              variant="outline" 
              className="w-full border-red-200 text-red-600 hover:bg-red-50 mt-2"
              onClick={() => {
                signOut();
                onClose();
              }}
            >
              {t('nav.logout')}
            </Button>
          </>
        ) : (
          <Button 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-full mt-4"
            onClick={() => {
              navigate('/auth');
              onClose();
            }}
          >
            {t('nav.join')}
          </Button>
        )}
      </div>
    </div>
  );
};
