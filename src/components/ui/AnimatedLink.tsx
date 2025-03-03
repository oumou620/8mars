
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AnimatedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
}

const AnimatedLink = ({ 
  to, 
  children, 
  className, 
  underline = true,
  ...props 
}: AnimatedLinkProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        'relative transition-all duration-300 ease-in-out',
        underline && 'link-underline',
        className
      )} 
      {...props}
    >
      {children}
    </Link>
  );
};

export default AnimatedLink;
