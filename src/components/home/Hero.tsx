import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, UserType } from '@/contexts/AuthContext';
import heroImage from '@/assets/2.jpg';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, userType, updateUserType } = useAuth();

  const handleUserTypeSelection = async (type: UserType) => {
    if (type) {
      await updateUserType(type);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Image d'arrière-plan avec pleine largeur */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#ffffff',
        }}
      />
      
      {/* Superposition orange claire avec très faible opacité pour une meilleure visibilité de l'image et ombre */}
      <div className="absolute inset-0 bg-orange-600/10 dark:bg-orange-900/30 shadow-inner shadow-orange-900/30 z-10"></div>
      
      {/* Contenu */}
      <div className="relative min-h-screen flex items-center z-20 px-6">
        <div className="mx-auto max-w-7xl w-full pt-24 pb-16 text-left">
          <div className="flex flex-col items-start">
            <div className="space-y-4 animate-fade-up max-w-xl text-left pl-6 md:pl-8 lg:pl-12">
              <div>
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight leading-tight text-white drop-shadow-md dark:text-white">
                  {t('hero.title')}
                  <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-300 dark:from-orange-500 dark:via-amber-400 dark:to-orange-400 bg-clip-text text-transparent block md:inline drop-shadow"> {t('hero.titleSpan')}</span>
                </h1>
                <p className="mt-3 text-sm md:text-base lg:text-lg leading-5 text-white/90 drop-shadow dark:text-white/80">
                  {t('hero.description')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-start">
                {user ? (
                  userType ? (
                    // L'utilisateur a déjà sélectionné un type
                    <>
                      <Button 
                        className="rounded-full px-4 py-1 md:py-2 bg-[#ea384c] text-white font-medium text-xs shadow-xl hover:shadow-2xl hover:bg-[#d32e41] transition-all hover:scale-105"
                        onClick={() => navigate('/mentors')}
                      >
                        {t('hero.join')}
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="rounded-full px-4 py-1 md:py-2 border-orange-400/30 bg-purple-600 hover:bg-purple-700 text-white text-xs shadow-lg"
                        onClick={() => navigate('/learning')}
                      >
                        {t('hero.explore')}
                      </Button>
                    </>
                  ) : (
                    // L'utilisateur doit sélectionner un type
                    <>
                      <Button 
                        className="rounded-full px-4 py-1 md:py-2 bg-[#ea384c] text-white font-medium text-xs shadow-xl hover:shadow-2xl hover:bg-[#d32e41] transition-all hover:scale-105"
                        onClick={() => handleUserTypeSelection('mentor')}
                      >
                        {t('profile.mentor')}
                        <Sparkles className="ml-2 h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="rounded-full px-4 py-1 md:py-2 border-orange-400/30 bg-purple-600 hover:bg-purple-700 text-white text-xs shadow-lg"
                        onClick={() => handleUserTypeSelection('learner')}
                      >
                        {t('profile.learner')}
                      </Button>
                    </>
                  )
                ) : (
                  // L'utilisateur n'est pas connecté
                  <>
                    <Button 
                      className="rounded-full px-4 py-1 md:py-2 bg-[#ea384c] text-white font-medium text-xs shadow-xl hover:shadow-2xl hover:bg-[#d32e41] transition-all hover:scale-105"
                      onClick={() => navigate('/auth')}
                    >
                      {t('sign_in')}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="rounded-full px-4 py-1 md:py-2 border-orange-400/30 bg-purple-600 hover:bg-purple-700 text-white text-xs shadow-lg"
                      onClick={() => navigate('/auth')}
                    >
                      {t('sign_up')}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
