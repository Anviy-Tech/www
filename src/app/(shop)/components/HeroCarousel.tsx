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
  theme: 'light' | 'dark' | 'neutral';
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Timeless Elegance",
    subtitle: "Crafted with Purpose",
    description: "Discover jewelry that transcends trends, where every piece tells a story of craftsmanship and beauty.",
    buttonText: "Explore Collection",
    buttonLink: "/shop",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=2400&h=3200&fit=crop&q=95&auto=format&dpr=2",
    theme: "neutral"
  },
  {
    id: 2,
    title: "Artisan Heritage",
    subtitle: "Handcrafted Excellence",
    description: "Each piece is thoughtfully designed and meticulously crafted by skilled artisans who understand the language of beauty.",
    buttonText: "Discover Stories",
    buttonLink: "/about",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=2400&h=3200&fit=crop&q=95&auto=format&dpr=2",
    theme: "light"
  },
  {
    id: 3,
    title: "Modern Sophistication",
    subtitle: "Contemporary Design",
    description: "Where tradition meets innovation, creating jewelry that speaks to the modern connoisseur.",
    buttonText: "View New Arrivals",
    buttonLink: "/collections/new",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=2400&h=3200&fit=crop&q=95&auto=format&dpr=2",
    theme: "dark"
  },
  {
    id: 4,
    title: "Personal Expression",
    subtitle: "Your Unique Style",
    description: "Find pieces that resonate with your individuality and celebrate your personal journey.",
    buttonText: "Find Your Style",
    buttonLink: "/shop",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=2400&h=3200&fit=crop&q=95&auto=format&dpr=2",
    theme: "neutral"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => setIsAutoPlaying(true), 15000);
    }, 1000);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => setIsAutoPlaying(true), 15000);
    }, 1000);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => setIsAutoPlaying(true), 15000);
    }, 1000);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
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
      className="relative h-[100vh] sm:h-[100svh] overflow-hidden bg-[#E0D6D6] will-change-transform"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      {/* Slides Container */}
      <div className="relative h-full will-change-transform">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 will-change-transform transition-all duration-1000 ease-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100 z-20' 
                : 'opacity-0 scale-[1.02] z-10'
            }`}
            style={{
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
              perspective: '1000px',
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={`${slide.title} ${slide.subtitle}`}
                fill
                className={`object-cover transition-transform duration-1000 ease-out ${
                  index === currentSlide ? 'scale-100' : 'scale-[1.05]'
                }`}
                priority={index <= 1}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                quality={90}
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>

            {/* Enhanced Sophisticated Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50 z-10"></div>
            
            {/* Refined Vignette */}
            <div className="absolute inset-0 z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="container-page w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[80vh] lg:min-h-0">
                  {/* Text Content - Enhanced Appeal */}
                  <div className="lg:col-span-8 xl:col-span-7 text-white space-y-8 lg:space-y-12 text-center lg:text-left">
                    
                    {/* Elegant Subtitle with Badge */}
                    <div className="overflow-hidden">
                      <div 
                        className={`inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium tracking-[0.15em] uppercase text-white transform transition-all duration-1000 delay-200 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                      >
                        <span className="w-2 h-2 bg-[#E7C3A8] rounded-full mr-3"></span>
                        {slide.subtitle}
                      </div>
                    </div>

                    {/* Main Title - Enhanced Typography */}
                    <div className="overflow-hidden">
                      <h1 
                        className={`text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light leading-[0.9] tracking-tight text-white transform transition-all duration-1000 delay-400 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                        }`}
                      >
                        {slide.title}
                      </h1>
                    </div>

                    {/* Enhanced Description */}
                    <div className="overflow-hidden">
                      <p 
                        className={`text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light text-white/90 max-w-2xl mx-auto lg:mx-0 transform transition-all duration-1000 delay-600 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                      >
                        {slide.description}
                      </p>
                    </div>

                    {/* Enhanced CTA with Social Proof */}
                    <div className="overflow-hidden pt-4 lg:pt-8">
                      <div 
                        className={`flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start transform transition-all duration-1000 delay-800 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                      >
                        <Link
                          href={slide.buttonLink}
                          className="group relative inline-flex items-center justify-center px-8 py-4 lg:px-10 lg:py-5 
                            bg-white text-[#916849] hover:bg-[#E7C3A8] hover:text-white transition-all duration-500 ease-out
                            font-medium text-sm tracking-[0.1em] uppercase border border-white hover:border-[#E7C3A8] shadow-lg hover:shadow-xl"
                        >
                          <span className="relative z-10">{slide.buttonText}</span>
                          <svg className="relative z-10 ml-3 w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                        
                        {/* Enhanced Secondary CTA */}
                        <Link
                          href="/collections"
                          className="group inline-flex items-center gap-2 text-sm font-medium transition-all duration-500 text-white/80 hover:text-white"
                        >
                          <span>View All Collections</span>
                          <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                      
                      {/* Subtle Social Proof */}
                      <div className="overflow-hidden mt-6">
                        <div 
                          className={`flex items-center justify-center lg:justify-start gap-6 transform transition-all duration-1000 delay-1000 ${
                            index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                          }`}
                        >
                          <div className="flex items-center gap-2 text-white/70 text-sm">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-[#E7C3A8] fill-current" viewBox="0 0 20 20">
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                </svg>
                              ))}
                            </div>
                            <span className="ml-1">4.9 (2,847 reviews)</span>
                          </div>
                          <div className="text-white/70 text-sm">
                            <span className="text-[#E7C3A8] font-medium">Free Shipping</span> on orders above ₹2,000
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Product Showcase - Desktop Only */}
                  <div className="hidden lg:block lg:col-span-4 xl:col-span-4 xl:col-start-9">
                    <div 
                      className={`transform transition-all duration-1000 delay-1000 will-change-transform ${
                        index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                      }`}
                      style={{
                        transform: 'translate3d(0, 0, 0)',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <div 
                        className="group relative p-8 border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-700 hover:bg-white/15 hover:border-white/30"
                        style={{
                          borderRadius: '12px',
                        }}
                      >
                        {/* Enhanced badge */}
                        <div className="absolute -top-3 -right-3 bg-[#E7C3A8] text-[#916849] px-3 py-1 text-xs font-medium rounded-full shadow-lg">
                          New Arrival
                        </div>
                        
                        <div className="text-small-caps text-xs mb-6 tracking-[0.15em] font-medium text-white/80">
                          FEATURED PIECE
                        </div>
                        
                        <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-lg group/image">
                          <Image
                            src={slide.image}
                            alt="Featured jewelry"
                            fill
                            className="object-cover transition-transform duration-1000 ease-out group-hover/image:scale-105"
                            style={{
                              transform: 'translate3d(0, 0, 0)',
                              backfaceVisibility: 'hidden',
                            }}
                          />
                          {/* Enhanced overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-700"></div>
                          
                          {/* Quick view button */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-500">
                            <button className="bg-white text-[#916849] px-4 py-2 text-sm font-medium rounded-full shadow-lg hover:bg-[#E7C3A8] hover:text-white transition-all duration-300">
                              Quick View
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-white">
                          <h3 className="text-display text-lg xl:text-xl mb-3 font-medium">Signature Collection</h3>
                          
                          {/* Enhanced Price */}
                          <div className="mb-6 flex items-center gap-3">
                            <span className="text-2xl font-medium text-[#E7C3A8]">₹3,200</span>
                            <span className="text-sm line-through text-white/50">₹3,800</span>
                            <span className="bg-[#E7C3A8] text-[#916849] text-xs px-2 py-1 rounded-full font-medium">Save 16%</span>
                          </div>
                          
                          {/* Enhanced CTA Button */}
                          <Link 
                            href="/shop" 
                            className="group/link inline-flex items-center justify-center w-full py-3 px-4 font-medium text-sm tracking-wide transition-all duration-500 rounded-lg bg-white text-[#916849] hover:bg-[#E7C3A8] hover:text-white shadow-lg hover:shadow-xl"
                          >
                            <span>Discover Now</span>
                            <svg className="ml-2 w-4 h-4 transition-transform duration-500 ease-out group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="group absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-8 h-8 lg:w-10 lg:h-10 
          rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-500 ease-out hover:bg-white/20 focus:outline-none
          will-change-transform disabled:opacity-30 disabled:cursor-not-allowed text-white hover:text-[#E7C3A8]"
        style={{
          transform: 'translate3d(0, -50%, 0)',
          backfaceVisibility: 'hidden',
        }}
        aria-label="Previous slide"
      >
        <svg className="w-3 h-3 lg:w-4 lg:h-4 mx-auto transition-transform duration-500 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="group absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-8 h-8 lg:w-10 lg:h-10 
          rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-500 ease-out hover:bg-white/20 focus:outline-none
          will-change-transform disabled:opacity-30 disabled:cursor-not-allowed text-white hover:text-[#E7C3A8]"
        style={{
          transform: 'translate3d(0, -50%, 0)',
          backfaceVisibility: 'hidden',
        }}
        aria-label="Next slide"
      >
        <svg className="w-3 h-3 lg:w-4 lg:h-4 mx-auto transition-transform duration-500 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-4">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`relative transition-all duration-500 ease-out will-change-transform disabled:cursor-not-allowed ${
              index === currentSlide 
                ? 'w-16 h-1.5 bg-[#E7C3A8] rounded-full shadow-lg' 
                : 'w-10 h-1.5 bg-white/50 hover:bg-white/70 hover:w-12'
            }`}
            style={{
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div 
          className="h-full bg-gradient-to-r from-[#E7C3A8] to-[#916849] transition-all duration-1000 ease-out shadow-lg"
          style={{ 
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
            transform: 'translate3d(0, 0, 0)',
            willChange: 'width',
          }}
        />
      </div>

      {/* Enhanced Floating Action Button */}
      <div className="hidden lg:flex absolute bottom-8 right-8 z-30">
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className={`w-14 h-14 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
            isPaused ? 'bg-[#E7C3A8] text-[#916849]' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
        >
          {isPaused ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 9v6l5-3-5-3z" />
            </svg>
          )}
        </button>
      </div>

      {/* Enhanced Mobile swipe indicator */}
      <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 text-white/80 text-sm font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span>Swipe to explore</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </section>
  );
}
