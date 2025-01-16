'use client';

import React, { ReactNode } from 'react';

interface BackgroundLayoutProps {
  children: ReactNode;
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Header - Fixed position with higher z-index */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <div className="text-xl font-bold">
          Kareem Saygbe
        </div>
        <nav>
          <ul className="flex gap-6">
            <li><a href="#about" className="hover:text-blue-500 transition-colors">About</a></li>
            <li><a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a></li>
            <li><a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer - Fixed position with higher z-index */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 p-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Kareem Saygbe. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default BackgroundLayout;