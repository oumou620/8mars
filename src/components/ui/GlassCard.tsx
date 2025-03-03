
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark';
}

const GlassCard = ({ children, className, variant = 'default', ...props }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        'rounded-2xl p-8 shadow-xl', 
        variant === 'default' ? 'glass' : 'glass-dark',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
