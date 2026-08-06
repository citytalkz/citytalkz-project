import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/sampleArticles';
import { useMagazine } from '../context/MagazineContext';

export const HeroSlideshow: React.FC = () => {
  const { navigate } = useMagazine();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = HERO_SLIDES;

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % slides.length);
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, slides.length]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full h-full min-h-[500px] lg:min-h-[650px] bg-black overflow-hidden group flex flex-col justify-end">
      
      {/* Background Image Slides with Smooth Fade */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Zoom effect on current slide */}
          <img
            src={slide.coverImage}
            alt={slide.title}
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
              idx === currentIndex ? 'scale-105' : 'scale-100'
            }`}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />

          {/* Luxury Dark Gradient Overlays for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent"></div>
        </div>
      ))}

      {/* Content Container (Bottom-Left Aligned) */}
      <div className="relative z-20 h-full w-full px-6 sm:px-10 lg:px-12 flex flex-col justify-end pb-12 sm:pb-16">
        <div className="max-w-2xl space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Category Tag & Feature Line */}
          <div className="text-[#c9a227] text-xs uppercase tracking-[0.3em] font-sans flex items-center mb-1">
            <span className="w-8 h-[1px] bg-[#c9a227] mr-3"></span>
            <span>{currentSlide.categoryName} — Cover Feature</span>
          </div>

          {/* Large Serif Gold Headline */}
          <h1 
            onClick={() => navigate(`/article/${currentSlide.articleSlug}`)}
            className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal italic text-white leading-[1.12] tracking-tight cursor-pointer hover:text-[#c9a227] transition-colors drop-shadow-md"
          >
            {currentSlide.title}
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-[#a3a3a3] font-sans font-normal max-w-2xl leading-relaxed drop-shadow line-clamp-2 sm:line-clamp-none">
            {currentSlide.subtitle}
          </p>

          {/* CTA Read Button */}
          <div className="pt-2">
            <button
              onClick={() => navigate(`/article/${currentSlide.articleSlug}`)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#c9a227] text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl group/btn"
            >
              <span>Explore Feature Story</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Controls */}
      
      {/* Prev / Next Side Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/40 hover:bg-[#c9a227] text-white hover:text-black border border-white/20 hover:border-[#c9a227] transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 hidden sm:flex"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/40 hover:bg-[#c9a227] text-white hover:text-black border border-white/20 hover:border-[#c9a227] transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 hidden sm:flex"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Center Dots & Autoplay Toggle */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3 bg-black/50 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-[#a3a3a3] hover:text-[#c9a227] transition-colors pr-1"
          title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'w-6 h-1.5 bg-[#c9a227]'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <span className="text-[10px] font-mono text-[#a3a3a3] pl-1">
          0{currentIndex + 1} / 0{slides.length}
        </span>
      </div>

    </section>
  );
};
