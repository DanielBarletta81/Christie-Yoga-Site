'use client';

import { useState } from 'react';

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50">
      <div className="glass-panel soft-ring mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-4 py-3 text-stone-900 shadow-glow sm:px-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl text-brand-600">☸</div>
          <span className="text-sm uppercase tracking-[0.2em] sm:text-lg sm:tracking-[0.25em]">Soma Living</span>
        </div>

        <div className="flex items-center">
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-2 rounded-full border border-stone-900/90 bg-stone-900 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-stone-800">
              Menu
              <span className={`text-sm transition ${isDropdownOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl bg-white/95 text-stone-900 shadow-2xl ring-1 ring-black/10">
                <a href="#home" className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60">
                  Home
                </a>
                <a href="#about" className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60">
                  About
                </a>
                <a href="#services" className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60">
                  Services
                </a>
                <a href="#ayurveda" className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60">
                  Ayurveda
                </a>
                <a href="#contact" className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60">
                  Contact
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
