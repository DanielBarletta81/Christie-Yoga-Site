'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function ImageCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const trackRef = useRef(null);

  const hasImages = images.length > 0;

  const nextSlide = useCallback(() => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [hasImages, images.length]);

  const prevSlide = useCallback(() => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [hasImages, images.length]);

  const goToSlide = useCallback(
    (index) => {
      if (!hasImages) return;
      setCurrentIndex(index);
    },
    [hasImages]
  );

  useEffect(() => {
    if (!hasImages || isDragging) return undefined;
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, [hasImages, isDragging, nextSlide]);

  const getPositionX = (event) => {
    if (event.touches?.length) {
      return event.touches[0].clientX;
    }
    return event.clientX;
  };

  const handleDragStart = (event) => {
    if (!hasImages) return;
    setIsDragging(true);
    setStartPos(getPositionX(event));
  };

  const handleDragMove = (event) => {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    setDragOffset(currentPosition - startPos);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    const threshold = 50;

    if (dragOffset > threshold) {
      prevSlide();
    } else if (dragOffset < -threshold) {
      nextSlide();
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const translatePercent = (() => {
    if (!trackRef.current || !isDragging) return 0;
    const width = trackRef.current.offsetWidth || 1;
    return (dragOffset / width) * 100;
  })();

  return (
    <section id="services" className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Journey</p>
          <h2 className="mt-3 text-4xl font-light text-ink md:text-5xl">Journey to Wellness</h2>
          <p className="mt-4 text-base text-ink-soft">
            Slow down, breathe deep, and explore rituals that nourish the body, mind, and spirit.
          </p>
        </div>

        <div className="relative mt-12 flex items-center justify-center">
          <button
            onClick={prevSlide}
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl text-stone-900 shadow-lg transition hover:bg-white md:left-4 md:h-12 md:w-12"
            aria-label="Previous"
            type="button"
          >
            ‹
          </button>

          <div
            className="relative h-[360px] w-full max-w-4xl cursor-grab overflow-hidden rounded-[28px] bg-black shadow-2xl ring-1 ring-black/10 active:cursor-grabbing md:h-[520px]"
            ref={trackRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div
              className="flex h-full w-full"
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% + ${translatePercent}%))`,
                transition: isDragging ? 'none' : 'transform 0.6s ease'
              }}
            >
              {images.map((image, index) => {
                const content = (
                  <>
                    <img
                      src={image.src}
                      alt={image.alt}
                      draggable="false"
                      className={`h-full w-full object-cover transition duration-700 ${
                        index === currentIndex ? 'scale-105 grayscale-[35%]' : 'grayscale'
                      }`}
                    />
                    <div
                      className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-6 py-6 text-white transition duration-500 ${
                        index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                      }`}
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">Research</p>
                      <h3 className="mt-2 text-2xl font-light">{image.title}</h3>
                      <p className="mt-2 text-sm text-white/80">{image.description}</p>
                      {image.source && (
                        <div className="mt-3 flex items-center gap-3">
                          <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/90">
                            {image.source}
                          </span>
                          {image.href && (
                            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                              Tap to read
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                );

                return image.href ? (
                  <a
                    key={`${image.src}-${index}`}
                    href={image.href}
                    target="_blank"
                    rel="noreferrer"
                    className="relative h-full min-w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={`${image.src}-${index}`} className="relative h-full min-w-full overflow-hidden">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl text-stone-900 shadow-lg transition hover:bg-white md:right-4 md:h-12 md:w-12"
            aria-label="Next"
            type="button"
          >
            ›
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === currentIndex ? 'bg-stone-900 scale-110' : 'bg-stone-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
