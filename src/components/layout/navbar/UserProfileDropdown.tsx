
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users, GraduationCap, BookOpen, Calendar, Briefcase, Award, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const UserProfileDropdown = () => {
  const navigate = useNavigate();
  const { user, userType, signOut } = useAuth();
  const { t } = useLanguage();
  
  // Mentor-specific navigation items
  const mentorNavItems = [
    { name: t('nav.mentoring'), path: '/mentoring', icon: <Users className="h-4 w-4 mr-2" /> },
    { name: t('nav.resources'), path: '/mentor-resources', icon: <Calendar className="h-4 w-4 mr-2" /> },
    { name: t('nav.workshops'), path: '/workshops', icon: <Laptop className="h-4 w-4 mr-2" /> },
  ];

  // Learner-specific navigation items
  const learnerNavItems = [
    { name: t('nav.learning'), path: '/learning-path', icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: t('nav.courses'), path: '/courses', icon: <GraduationCap className="h-4 w-4 mr-2" /> },
    { name: t('nav.my_mentors'), path: '/my-mentors', icon: <Users className="h-4 w-4 mr-2" /> },
    { name: t('nav.internships'), path: '/internships', icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { name: t('nav.jobs'), path: '/job-opportunities', icon: <Award className="h-4 w-4 mr-2" /> },
  ];

  // Determine the user type icon and color
  const getUserTypeDisplay = () => {
    if (userType === 'mentor') {
      return {
        icon: <Users className="h-4 w-4 mr-2" />,
        label: 'Mentor',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800'
      };
    } else {
      return {
        icon: <GraduationCap className="h-4 w-4 mr-2" />,
        label: 'Apprenant',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-800'
      };
    }
  };

  const userDisplay = getUserTypeDisplay();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`rounded-full border-gray-200 hover:bg-gray-50 ${userType ? userDisplay.bgColor : 'bg-white'}`}
        >
          {userType ? userDisplay.icon : <User className="h-4 w-4 mr-2" />}
          <span className={userType ? userDisplay.textColor : ''}>{userType ? userDisplay.label : t('nav.profile')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem className="font-medium text-sm">
          {user?.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="h-4 w-4 mr-2" />
          {t('nav.profile')}
        </DropdownMenuItem>
        
        {userType === 'mentor' && (
          <>
            {mentorNavItems.map((item) => (
              <DropdownMenuItem key={item.path} onClick={() => navigate(item.path)}>
                {item.icon}
                {item.name}
              </DropdownMenuItem>
            ))}
          </>
        )}
        
        {userType === 'learner' && (
          <>
            {learnerNavItems.map((item) => (
              <DropdownMenuItem key={item.path} onClick={() => navigate(item.path)}>
                {item.icon}
                {item.name}
              </DropdownMenuItem>
            ))}
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="text-red-600 hover:text-red-700 hover:bg-red-50">
          {t('nav.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
