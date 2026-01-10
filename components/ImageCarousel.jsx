'use client';

import { useState } from 'react';

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="carousel-section">
      <div className="carousel-container">
        <h2 className="carousel-heading">Journey to Wellness</h2>
        
        <div className="carousel">
          <button onClick={prevSlide} className="carousel-btn prev" aria-label="Previous">
            ‹
          </button>

          <div className="carousel-track">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-card ${index === currentIndex ? 'active' : ''}`}
              >
                <img src={image.src} alt={image.alt} />
                <div className="card-overlay">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={nextSlide} className="carousel-btn next" aria-label="Next">
            ›
          </button>
        </div>

        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .carousel-section {
          padding: 4rem 2rem;
          background: #fafafa;
        }

        .carousel-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .carousel-heading {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 300;
          margin-bottom: 3rem;
          color: #333;
          letter-spacing: 1px;
        }

        .carousel {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .carousel-track {
          position: relative;
          width: 100%;
          max-width: 800px;
          height: 500px;
          overflow: hidden;
        }

        .carousel-card {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          display: none;
        }

        .carousel-card.active {
          opacity: 1;
          display: block;
        }

        .carousel-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
          transition: filter 0.3s ease;
        }

        .carousel-card:hover img {
          filter: grayscale(50%);
        }

        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: white;
          padding: 2rem;
        }

        .card-overlay h3 {
          font-size: 1.8rem;
          font-weight: 300;
          margin: 0 0 0.5rem 0;
        }

        .card-overlay p {
          font-size: 1rem;
          margin: 0;
          opacity: 0.9;
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          font-size: 3rem;
          color: #333;
          cursor: pointer;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .carousel-btn:hover {
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .carousel-btn.prev {
          left: -25px;
        }

        .carousel-btn.next {
          right: -25px;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ccc;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #333;
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .carousel-section {
            padding: 3rem 1rem;
          }

          .carousel-heading {
            font-size: 2rem;
          }

          .carousel-track {
            height: 400px;
          }

          .carousel-btn {
            width: 40px;
            height: 40px;
            font-size: 2rem;
          }

          .carousel-btn.prev {
            left: 10px;
          }

          .carousel-btn.next {
            right: 10px;
          }

          .card-overlay h3 {
            font-size: 1.4rem;
          }

          .card-overlay p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
