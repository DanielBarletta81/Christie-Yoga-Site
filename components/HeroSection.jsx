'use client';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Inner Peace</h1>
          <p className="hero-subtitle">Yoga & Ayurvedic Wellness</p>
        </div>
      </div>
      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 85vh;
          min-height: 500px;
          background-image: url('/images/hero-background.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-content {
          text-align: center;
          color: white;
          z-index: 1;
          padding: 2rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 300;
          margin: 0 0 1rem 0;
          letter-spacing: 2px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 300;
          margin: 0;
          letter-spacing: 4px;
          text-transform: uppercase;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 768px) {
          .hero-section {
            height: 60vh;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
            letter-spacing: 2px;
          }
        }
      `}</style>
    </section>
  );
}
