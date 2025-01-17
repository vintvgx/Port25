import { ReactNode } from 'react';
import { typography } from '@/lib/typography';

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function H1({ children, className = '' }: TypographyProps) {
  return (
    <h1 className={`${typography.h1} ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = '' }: TypographyProps) {
  return (
    <h2 className={`${typography.h2} ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ children, className = '' }: TypographyProps) {
  return (
    <h3 className={`${typography.h3} ${className}`}>
      {children}
    </h3>
  );
}

export function P({ children, className = '' }: TypographyProps) {
  return (
    <p className={`${typography.p} ${className}`}>
      {children}
    </p>
  );
}

export function Blockquote({ children, className = '' }: TypographyProps) {
  return (
    <blockquote className={`${typography.blockquote} ${className}`}>
      {children}
    </blockquote>
  );
}

export function Link({ children, className = '', ...props }: TypographyProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${typography.link} ${className}`} {...props}>
      {children}
    </a>
  );
} 