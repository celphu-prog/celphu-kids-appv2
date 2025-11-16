import React from 'react';

export const CelphuLogo: React.FC<{ className?: string }> = ({ className = "h-12 w-auto" }) => (
    <a 
        href="https://celphukids.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ir a la página de Celphu Kids"
    >
        <img 
          src="https://fotos.sklainvest.com/logcelphusf.png" 
          alt="Celphu Kids Logo" 
          className={className} 
        />
    </a>
);