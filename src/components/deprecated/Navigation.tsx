import React from 'react';

export function Navigation() {
  return (
    <nav className="w-64 p-8 border-r border-border/5 relative z-10">
      <div className="space-y-8">
        {/* Logo */}
        <div className="h-12">
          <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" className="w-12 h-12 text-gray-400">
            <path d="M10 30 L30 10 L50 30 L70 10 L90 30" strokeWidth="2" />
            <path d="M20 25 L40 25 L60 25 L80 25" strokeWidth="2" />
          </svg>
        </div>

        {/* Practice Section */}
        <div className="space-y-4">
          <h2 className="text-xs tracking-wider text-muted-foreground">PROJECTS</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                Case Studies
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                Playground
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                Notes
              </a>
            </li>
          </ul>
        </div>

        {/* Career Section */}
        <div className="space-y-4">
          <h2 className="text-xs tracking-wider text-muted-foreground">CAREER</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                Past
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                Now
              </a>
            </li>
          </ul>
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <h2 className="text-xs tracking-wider text-muted-foreground">INFO</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                Socials
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
