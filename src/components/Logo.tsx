import React from 'react';
import LogoSvg from '../assets/logo.svg?react';

interface LogoProps {
  className?: string;
  height?: number; // Prop para controlar la altura del logo
}

const Logo: React.FC<LogoProps> = ({ className, height = 80 }) => {
  return <LogoSvg height={height} className={className} />;
};

export default Logo;
