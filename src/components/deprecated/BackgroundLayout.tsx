'use client';

import React, { ReactNode } from 'react';

interface BackgroundLayoutProps {
  children: ReactNode;
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Header with Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="relative">
          {/* Blur Background */}
          <div 
            className="absolute inset-0 backdrop-blur-2xl bg-white/10"
            style={{
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border for glass effect
            }}
          />
          
          {/* Content */}
          <div className="relative p-6 pl-10 pr-10 flex justify-between items-center backdrop-blur-sm">
            <div className="text-xl font-bold text-white/90">
              Kareem Saygbe
            </div>
            <nav>
              <ul className="flex gap-10">
                <li>
                  <a 
                    href="#about" 
                    className="text-white/80 hover:text-white/100 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#projects" 
                    className="text-white/80 hover:text-white/100 transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="text-white/80 hover:text-white/100 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer - Fixed position with higher z-index */}
      {/* <footer className="fixed bottom-0 left-0 right-0 z-50 p-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Kareem Saygbe. All rights reserved.
        </p>
      </footer> */}
    </div>
  );
};

export default BackgroundLayout;