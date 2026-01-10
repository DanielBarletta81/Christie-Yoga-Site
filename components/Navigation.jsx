'use client';

import { useState } from 'react';

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand">
          <div className="brand-logo">☸</div>
          <span className="brand-name">Soma Living</span>
        </div>

        <div className="nav-menu">
          <div 
            className="dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="dropdown-toggle">
              Menu
              <span className="dropdown-arrow">▾</span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <a href="#home" className="dropdown-item">Home</a>
                <a href="#about" className="dropdown-item">About</a>
                <a href="#services" className="dropdown-item">Services</a>
                <a href="#ayurveda" className="dropdown-item">Ayurveda</a>
                <a href="#contact" className="dropdown-item">Contact</a>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .brand-logo {
          font-size: 1.8rem;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: 2px;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .nav-menu {
          display: flex;
          align-items: center;
        }

        .dropdown {
          position: relative;
        }

        .dropdown-toggle {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: white;
          padding: 0.5rem 1.25rem;
          font-size: 1rem;
          letter-spacing: 1px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .dropdown-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .dropdown-arrow {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .dropdown:hover .dropdown-arrow {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          min-width: 180px;
          overflow: hidden;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-item {
          display: block;
          padding: 0.75rem 1.25rem;
          color: #333;
          font-size: 1rem;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background: rgba(139, 115, 85, 0.1);
          padding-left: 1.5rem;
          color: #8b7355;
        }

        @media (max-width: 768px) {
          .nav-container {
            padding: 0.75rem 1rem;
          }

          .brand-logo {
            font-size: 1.5rem;
          }

          .brand-name {
            font-size: 1.2rem;
            letter-spacing: 1px;
          }

          .dropdown-toggle {
            padding: 0.4rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </nav>
  );
}
