
import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AnimatedLink from '../../ui/AnimatedLink';

interface NavLinksProps {
  navigation: { name: string; path: string; icon?: React.ReactNode }[];
  className?: string;
  onClick?: () => void;
}

export const NavLinks: React.FC<NavLinksProps> = ({ navigation, className, onClick }) => {
  const location = useLocation();
  
  return (
    <div className={className}>
      {navigation.map((item) => (
        <AnimatedLink
          key={item.name}
          to={item.path}
          className={cn(
            'font-medium text-gray-800 flex items-center gap-1',
            location.pathname === item.path ? 'text-primary font-semibold' : 'text-gray-800 hover:text-foreground'
          )}
          onClick={onClick}
        >
          {item.icon}
          <span>{item.name}</span>
        </AnimatedLink>
      ))}
    </div>
  );
};
