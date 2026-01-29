'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef(null);
  const hoverTimerRef = useRef(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('soma-theme');
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
    if (stored === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    function handleClickOutside(event) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  function toggleTheme() {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        window.localStorage.setItem('soma-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        window.localStorage.setItem('soma-theme', 'light');
      }
      return next;
    });
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50">
      <div className="glass-panel soft-ring mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-4 py-3 text-stone-900 shadow-glow sm:px-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl text-brand-600">☸</div>
          <span className="text-sm uppercase tracking-[0.2em] sm:text-lg sm:tracking-[0.25em]">Soma Living</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-stone-700 transition hover:border-stone-400"
          >
            {isDarkMode ? 'Light' : 'Dark'}
          </button>
          <div
            className="relative"
            ref={menuRef}
            onMouseEnter={() => {
              if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
              setIsDropdownOpen(true);
            }}
            onMouseLeave={() => {
              if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
              hoverTimerRef.current = setTimeout(() => {
                setIsDropdownOpen(false);
              }, 150);
            }}
          >
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-stone-900/90 bg-stone-900 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-stone-800"
            >
              Menu
              <span className={`text-sm transition ${isDropdownOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl bg-white/95 text-stone-900 shadow-2xl ring-1 ring-black/10">
                <a
                  href="#home"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60"
                >
                  Home
                </a>
                <Link
                  href="/about"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60"
                >
                  About
                </Link>
                <Link
                  href="/ayurveda"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60"
                >
                  Ayurveda
                </Link>
                <Link
                  href="/yoga"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60"
                >
                  Yoga
                </Link>
                <Link
                  href="/chakra"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60"
                >
                  Chakra
                </Link>
                <Link
                  href="/chakra-system"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60"
                >
                  Chakra System
                </Link>
                <Link
                  href="/crystals"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60"
                >
                  Crystals
                </Link>
                <Link
                  href="/planner"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60"
                >
                  Planner
                </Link>
                <Link
                  href="/products"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-brand-100/60"
                >
                  Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
