export default function SplitSection() {
  return (
    <section className="split-section">
      <div className="split-container">
        <div className="split-card">
          <div className="card-image ayurveda"></div>
          <div className="card-content">
            <h3>Ayurvedic Diet</h3>
            <p>
              Discover the ancient wisdom of Ayurveda and how mindful eating 
              can balance your doshas and restore harmony to your body and mind. 
              Learn to nourish yourself with foods that align with your unique 
              constitution.
            </p>
            <a href="#" className="card-link">Learn More →</a>
          </div>
        </div>

        <div className="split-card">
          <div className="card-image wellness"></div>
          <div className="card-content">
            <h3>Holistic Wellness</h3>
            <p>
              Embrace a comprehensive approach to health through yoga, meditation, 
              and Ayurvedic practices. Transform your daily routine into a sacred 
              ritual that nurtures your physical, mental, and spiritual wellbeing.
            </p>
            <a href="#" className="card-link">Explore →</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .split-section {
          padding: 5rem 2rem;
          background: white;
        }

        .split-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
        }

        .split-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .split-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .card-image {
          width: 100%;
          height: 300px;
          background-size: cover;
          background-position: center;
          filter: grayscale(100%);
          transition: filter 0.3s ease;
        }

        .split-card:hover .card-image {
          filter: grayscale(30%);
        }

        .card-image.ayurveda {
          background-image: url('/images/ayurveda.jpg');
        }

        .card-image.wellness {
          background-image: url('/images/wellness.jpg');
        }

        .card-content {
          padding: 2rem;
        }

        .card-content h3 {
          font-size: 1.8rem;
          font-weight: 400;
          margin: 0 0 1rem 0;
          color: #333;
          letter-spacing: 1px;
        }

        .card-content p {
          font-size: 1rem;
          line-height: 1.7;
          color: #666;
          margin: 0 0 1.5rem 0;
        }

        .card-link {
          display: inline-block;
          color: #8b7355;
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 1px;
          transition: color 0.3s ease;
        }

        .card-link:hover {
          color: #6b5345;
        }

        @media (max-width: 968px) {
          .split-section {
            padding: 3rem 1rem;
          }

          .split-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .card-image {
            height: 250px;
          }

          .card-content {
            padding: 1.5rem;
          }

          .card-content h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
