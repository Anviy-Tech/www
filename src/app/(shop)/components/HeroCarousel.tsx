"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  overlayStyle: string;
  textColor: string;
  theme: 'light' | 'dark' | 'neutral';
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "LUXURY",
    subtitle: "REDEFINED",
    description: "Discover handcrafted jewelry that embodies timeless elegance and contemporary sophistication.",
    buttonText: "Explore Collection",
    buttonLink: "/shop",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=2400&h=3200&fit=crop&q=95&auto=format&dpr=2",
    overlayStyle: "bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/50",
    textColor: "text-white",
    theme: "dark"
  },
  {
    id: 2,
    title: "ARTISAN",
    subtitle: "CRAFTED",
    description: "Each piece tells a story of meticulous attention to detail and master craftsmanship.",
    buttonText: "View Process",
    buttonLink: "/about",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=2400&h=3200&fit=crop&q=95&auto=format&dpr=2",
    overlayStyle: "bg-gradient-to-br from-stone-50/80 via-white/70 to-stone-100/85",
    textColor: "text-primary",
    theme: "light"
  },
  {
    id: 3,
    title: "NEW",
    subtitle: "ARRIVALS",
    description: "Fresh designs that capture the essence of modern elegance and timeless beauty.",
    buttonText: "Shop New",
    buttonLink: "/collections/new",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=2400&h=3200&fit=crop&q=95&auto=format&dpr=2",
    overlayStyle: "bg-gradient-to-br from-neutral-800/45 via-neutral-700/35 to-neutral-900/55",
    textColor: "text-white",
    theme: "dark"
  },
  {
    id: 4,
    title: "ETHICAL",
    subtitle: "LUXURY",
    description: "Sustainable practices meet exceptional quality in every piece we create.",
    buttonText: "Our Values",
    buttonLink: "/about",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=2400&h=3200&fit=crop&q=95&auto=format&dpr=2",
    overlayStyle: "bg-gradient-to-br from-amber-50/75 via-white/65 to-stone-100/80",
    textColor: "text-primary",
    theme: "light"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => setIsAutoPlaying(true), 12000);
    }, 800);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => setIsAutoPlaying(true), 12000);
    }, 800);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => setIsAutoPlaying(true), 12000);
    }, 800);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section 
      className="relative h-[100svh] overflow-hidden bg-secondary will-change-transform"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
      }}
    >
      {/* Slides Container */}
      <div className="relative h-full will-change-transform">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 will-change-transform transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              index === currentSlide 
                ? 'opacity-100 scale-100 z-20' 
                : 'opacity-0 scale-[1.01] z-10'
            }`}
            style={{
              transform: 'translate3d(0, 0, 0)', // GPU acceleration
              backfaceVisibility: 'hidden',
              perspective: '1000px',
            }}
          >
            {/* Background Image with Enhanced Quality */}
            <div 
              className="absolute inset-0"
              style={{
                transform: 'translate3d(0, 0, 0) scale(1.05)',
                willChange: 'transform',
              }}
            >
              <Image
                src={slide.image}
                alt={`${slide.title} ${slide.subtitle}`}
                fill
                className={`object-cover will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                  index === currentSlide ? 'scale-100' : 'scale-[1.02]'
                }`}
                priority={index <= 1} // Load first two slides with priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                quality={95}
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>

            {/* Premium Glass Overlay */}
            <div 
              className={`absolute inset-0 ${slide.overlayStyle} z-10`}
              style={{
                backdropFilter: 'blur(0.5px)',
                WebkitBackdropFilter: 'blur(0.5px)',
              }}
            ></div>
            
            {/* Multi-layer Vignette for Depth */}
            <div className="absolute inset-0 z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10"></div>
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="container-page w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh] lg:min-h-0">
                  {/* Text Content - Mobile First */}
                  <div className={`lg:col-span-7 xl:col-span-6 ${slide.textColor} space-y-6 lg:space-y-8 text-center lg:text-left`}>
                    
                    {/* Subtitle with Elegant Animation */}
                    <div className="overflow-hidden">
                      <div 
                        className={`text-small-caps text-xs sm:text-sm tracking-[0.2em] font-medium opacity-80 transform transition-all duration-1000 delay-200 ${
                          index === currentSlide ? 'translate-y-0 opacity-80' : 'translate-y-8 opacity-0'
                        }`}
                      >
                        {slide.subtitle}
                      </div>
                    </div>

                    {/* Main Title with Staggered Animation */}
                    <div className="overflow-hidden">
                      <h1 
                        className={`text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.9] tracking-tight transform transition-all duration-1000 delay-400 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                        }`}
                      >
                        {slide.title}
                      </h1>
                    </div>

                    {/* Description with Refined Typography */}
                    <div className="overflow-hidden">
                      <p 
                        className={`text-base sm:text-lg lg:text-xl leading-relaxed opacity-90 max-w-2xl mx-auto lg:mx-0 transform transition-all duration-1000 delay-600 ${
                          index === currentSlide ? 'translate-y-0 opacity-90' : 'translate-y-8 opacity-0'
                        }`}
                      >
                        {slide.description}
                      </p>
                    </div>

                    {/* CTA Button with Premium Glass Effect */}
                    <div className="overflow-hidden pt-4 lg:pt-6">
                      <Link
                        href={slide.buttonLink}
                        className={`group relative inline-flex items-center justify-center px-8 py-4 lg:px-10 lg:py-5 
                          ${slide.theme === 'light' 
                            ? 'bg-primary/90 text-white hover:bg-primary shadow-lg hover:shadow-xl' 
                            : 'bg-white/90 text-primary hover:bg-white shadow-lg hover:shadow-xl'
                          } 
                          font-medium text-sm tracking-[0.1em] uppercase will-change-transform transition-all duration-300 ease-out
                          hover:scale-[1.03] backdrop-blur-md border border-white/20 transform ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                        style={{ 
                          transitionDelay: '800ms',
                          transform: 'translate3d(0, 0, 0)',
                          backfaceVisibility: 'hidden',
                          WebkitBackdropFilter: 'blur(12px)',
                          backdropFilter: 'blur(12px)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translate3d(0, -2px, 0) scale(1.03)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)';
                        }}
                      >
                        {/* Glass reflection effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <span className="relative z-10">{slide.buttonText}</span>
                        <svg className="relative z-10 ml-2 w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Featured Product Card with Premium Glass - Desktop Only */}
                  <div className="hidden lg:block lg:col-span-5 xl:col-span-5 xl:col-start-8">
                    <div 
                      className={`transform transition-all duration-700 delay-1000 will-change-transform ${
                        index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                      }`}
                      style={{
                        transform: 'translate3d(0, 0, 0)',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <div 
                        className={`group relative p-6 xl:p-8 border transition-all duration-300 hover:shadow-2xl ${
                          slide.theme === 'light' 
                            ? 'bg-white/70 border-white/30 hover:bg-white/80' 
                            : 'bg-white/10 border-white/20 hover:bg-white/15'
                        }`}
                        style={{
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          transform: 'translate3d(0, 0, 0)',
                        }}
                      >
                        {/* Glass reflection overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className={`relative z-10 text-small-caps text-xs mb-4 tracking-[0.15em] ${
                          slide.theme === 'light' ? 'text-primary/70' : 'text-white/70'
                        }`}>
                          FEATURED PIECE
                        </div>
                        
                        <div className="relative z-10 aspect-[3/4] mb-6 overflow-hidden group/image">
                          <Image
                            src={slide.image}
                            alt="Featured jewelry"
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover/image:scale-110"
                            style={{
                              transform: 'translate3d(0, 0, 0)',
                              backfaceVisibility: 'hidden',
                            }}
                          />
                          {/* Image overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <div className={`relative z-10 ${slide.theme === 'light' ? 'text-primary' : 'text-white'}`}>
                          <h3 className="text-display text-lg xl:text-xl mb-2 font-light">Aurora Collection</h3>
                          <p className="mb-4 text-sm opacity-80">Starting from ₹2,999</p>
                          <Link 
                            href="/shop" 
                            className={`group/link inline-flex items-center text-sm font-medium tracking-wide transition-all duration-300 ${
                              slide.theme === 'light' 
                                ? 'text-primary hover:text-accent' 
                                : 'text-white hover:text-accent'
                            }`}
                          >
                            View Details
                            <svg className="ml-1 w-3 h-3 transition-transform duration-300 ease-out group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Glass Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className={`group absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 
          border transition-all duration-200 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/30
          will-change-transform disabled:opacity-50 disabled:cursor-not-allowed ${
          currentSlideData.theme === 'light'
            ? 'bg-white/80 border-white/40 text-primary hover:bg-white/90 hover:shadow-lg'
            : 'bg-white/15 border-white/30 text-white hover:bg-white/25 hover:shadow-lg'
        }`}
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transform: 'translate3d(0, -50%, 0)',
          backfaceVisibility: 'hidden',
        }}
        onMouseEnter={(e) => {
          if (!isTransitioning) {
            e.currentTarget.style.transform = 'translate3d(0, -50%, 0) scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate3d(0, -50%, 0) scale(1)';
        }}
        aria-label="Previous slide"
      >
        {/* Glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        <svg className="relative z-10 w-4 h-4 lg:w-5 lg:h-5 mx-auto transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className={`group absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 
          border transition-all duration-200 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/30
          will-change-transform disabled:opacity-50 disabled:cursor-not-allowed ${
          currentSlideData.theme === 'light'
            ? 'bg-white/80 border-white/40 text-primary hover:bg-white/90 hover:shadow-lg'
            : 'bg-white/15 border-white/30 text-white hover:bg-white/25 hover:shadow-lg'
        }`}
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transform: 'translate3d(0, -50%, 0)',
          backfaceVisibility: 'hidden',
        }}
        onMouseEnter={(e) => {
          if (!isTransitioning) {
            e.currentTarget.style.transform = 'translate3d(0, -50%, 0) scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate3d(0, -50%, 0) scale(1)';
        }}
        aria-label="Next slide"
      >
        {/* Glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        <svg className="relative z-10 w-4 h-4 lg:w-5 lg:h-5 mx-auto transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Premium Glass Slide Indicators */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2 backdrop-blur-sm bg-black/10 px-4 py-2 rounded-full">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`h-1 transition-all duration-300 ease-out will-change-transform disabled:cursor-not-allowed ${
              index === currentSlide 
                ? 'w-8 bg-white shadow-sm' 
                : 'w-2 bg-white/40 hover:bg-white/60 hover:w-3'
            }`}
            style={{
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Premium Progress Bar with Glass Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-30">
        <div 
          className="h-full bg-gradient-to-r from-accent/80 via-accent to-accent/80 transition-all duration-300 ease-out shadow-sm"
          style={{ 
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
            transform: 'translate3d(0, 0, 0)',
            willChange: 'width',
          }}
        />
      </div>
    </section>
  );
}
