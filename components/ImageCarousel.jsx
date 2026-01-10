'use client';

import { useState, useEffect, useRef } from 'react';

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const carouselRef = useRef(null);

  // Auto-scroll slowly
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isDragging]);

  return (
    <section className="carousel-section">
      <div className="carousel-container">
        <h2 className="carousel-heading">Journey to Wellness</h2>
        
        <div className="carousel">
          <button 
            onClick={prevSlide} 
            className="carousel-btn prev" 
            aria-label="Previous"
          >
            ‹
          </button>

          <div 
            className="carousel-track"
            ref={carouselRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-card ${index === currentIndex ? 'active' : ''}`}
                style={{
                  transform: isDragging ? `translateX(${currentTranslate}px)` : 'none'
                }}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  draggable="false"
                />
                <div className="card-overlay">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
      <style jsx>{`
        .carousel-section {
          padding: 3rem 1rem;
          background: #fafafa;
        }

        .carousel-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .carousel-heading {
          text-align: center;
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          font-weight: 300;
          margin-bottom: 2rem;
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
          height: clamp(300px, 60vw, 500px);
          overflow: hidden;
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
        }

        .carousel-track:active {
          cursor: grabbing;
        }

        .carousel-card {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
          display: none;
          pointer-events: none;
        }

        .carousel-card.active {
          opacity: 1;
          display: block;
          pointer-events: auto;
        }

        .carousel-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
          transition: filter 0.5s ease;
          pointer-events: none;
        }

        .carousel-card:hover img {
          filter: grayscale(50%);
        } <button onClick={nextSlide} className="carousel-btn next" aria-label="Next">
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
        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          font-size: clamp(2rem, 4vw, 3rem);
          color: #333;
          cursor: pointer;
          width: clamp(40px, 8vw, 50px);
          height: clamp(40px, 8vw, 50px);
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
          left: clamp(-10px, -2vw, -25px);
        }

        .carousel-btn.next {
          right: clamp(-10px, -2vw, -25px);
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: clamp(8px, 2vw, 12px);
          padding: 1rem 0;
        }

        .dot {
          width: clamp(10px, 2vw, 12px);
          height: clamp(10px, 2vw, 12px);
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
            padding: 2rem 0.5rem;
          }

          .carousel-btn.prev {
            left: 10px;
          }

          .carousel-btn.next {
            right: 10px;
          }

          .card-overlay {
            padding: 1rem;
          }

          .card-overlay h3 {
            font-size: clamp(1.2rem, 4vw, 1.5rem);
          }

          .card-overlay p {
            font-size: clamp(0.85rem, 3vw, 1rem);
          }
        }

        @media (max-width: 480px) {
          .carousel-btn {
            opacity: 0.7;
          }
          
          .carousel-dots {
            gap: 6px;
          }
        }carousel-btn {
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
