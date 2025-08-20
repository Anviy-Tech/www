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
    subtitle: "UP TO 40% OFF",
    description: "Transform your style with handcrafted jewelry that commands attention. Limited time offer on premium collections.",
    buttonText: "Shop Now & Save",
    buttonLink: "/shop",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=2400&h=3200&fit=crop&q=95&auto=format&dpr=2",
    overlayStyle: "bg-gradient-to-br from-black/60 via-black/40 to-black/70",
    textColor: "text-white",
    theme: "dark"
  },
  {
    id: 2,
    title: "BESTSELLERS",
    subtitle: "MOST LOVED",
    description: "Join thousands of happy customers who've elevated their style. These pieces sell out fast.",
    buttonText: "See What's Trending",
    buttonLink: "/collections/best-seller",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=2400&h=3200&fit=crop&q=95&auto=format&dpr=2",
    overlayStyle: "bg-gradient-to-br from-white/90 via-white/80 to-white/95",
    textColor: "text-primary",
    theme: "light"
  },
  {
    id: 3,
    title: "NEW ARRIVALS",
    subtitle: "JUST DROPPED",
    description: "Be the first to own the latest designs. Fresh styles that are already creating buzz.",
    buttonText: "Get Yours First",
    buttonLink: "/collections/new",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=2400&h=3200&fit=crop&q=95&auto=format&dpr=2",
    overlayStyle: "bg-gradient-to-br from-slate-900/65 via-slate-800/50 to-slate-900/75",
    textColor: "text-white",
    theme: "dark"
  },
  {
    id: 4,
    title: "FREE SHIPPING",
    subtitle: "LIMITED TIME",
    description: "No minimum order. Premium packaging included. Get your jewelry delivered anywhere in India.",
    buttonText: "Start Shopping",
    buttonLink: "/shop",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=2400&h=3200&fit=crop&q=95&auto=format&dpr=2",
    overlayStyle: "bg-gradient-to-br from-emerald-900/70 via-emerald-800/55 to-emerald-900/80",
    textColor: "text-white",
    theme: "dark"
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
    }, 7000); // Slightly longer for better UX

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused]);

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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
                  {/* Text Content - Modern Sales Focus */}
                  <div className={`lg:col-span-8 xl:col-span-7 ${slide.textColor} space-y-6 lg:space-y-8 text-center lg:text-left`}>
                    
                    {/* Eye-catching Offer Badge */}
                    <div className="overflow-hidden">
                      <div 
                        className={`inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-[0.1em] uppercase transform transition-all duration-1000 delay-100 ${
                          slide.id === 1 ? 'bg-red-500 text-white animate-pulse' :
                          slide.id === 2 ? 'bg-accent text-white' :
                          slide.id === 3 ? 'bg-blue-500 text-white' :
                          'bg-emerald-500 text-white'
                        } ${
                          index === currentSlide ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                        }`}
                      >
                        {slide.subtitle}
                        {slide.id === 1 && <span className="ml-2 animate-bounce">🔥</span>}
                        {slide.id === 2 && <span className="ml-2">⭐</span>}
                        {slide.id === 3 && <span className="ml-2">✨</span>}
                        {slide.id === 4 && <span className="ml-2">🚚</span>}
                      </div>
                    </div>

                    {/* Main Title with Impact */}
                    <div className="overflow-hidden">
                      <h1 
                        className={`text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight transform transition-all duration-1000 delay-300 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                        }`}
                      >
                        {slide.title}
                      </h1>
                    </div>

                    {/* Sales-focused Description */}
                    <div className="overflow-hidden">
                      <p 
                        className={`text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0 transform transition-all duration-1000 delay-500 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                      >
                        {slide.description}
                      </p>
                    </div>

                    {/* Social Proof & Urgency */}
                    <div className="overflow-hidden">
                      <div 
                        className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 transform transition-all duration-1000 delay-700 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                          <span className="ml-2 text-sm font-medium">4.9/5 (2,847 reviews)</span>
                        </div>
                        <div className="text-sm font-medium px-3 py-1 bg-white/20 rounded-full">
                          🔥 127 people viewing this
                        </div>
                      </div>
                    </div>

                    {/* Enhanced CTA Buttons */}
                    <div className="overflow-hidden pt-4 lg:pt-6">
                      <div 
                        className={`flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start transform transition-all duration-1000 delay-900 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                      >
                        <Link
                          href={slide.buttonLink}
                          className={`group relative inline-flex items-center justify-center px-8 py-4 lg:px-10 lg:py-5 
                            ${slide.theme === 'light' 
                              ? 'bg-primary text-white hover:bg-primary/90 shadow-xl hover:shadow-2xl' 
                              : 'bg-white text-primary hover:bg-white/95 shadow-xl hover:shadow-2xl'
                            } 
                            font-bold text-sm tracking-[0.1em] uppercase will-change-transform transition-all duration-300 ease-out
                            hover:scale-[1.05] border-2 border-transparent hover:border-accent/30 transform`}
                          style={{ 
                            transform: 'translate3d(0, 0, 0)',
                            backfaceVisibility: 'hidden',
                          }}
                        >
                          {/* Animated shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover:animate-pulse"></div>
                          
                          <span className="relative z-10">{slide.buttonText}</span>
                          <svg className="relative z-10 ml-2 w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                        
                        {/* Secondary CTA */}
                        <Link
                          href="/favorites"
                          className={`group inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                            slide.theme === 'light' ? 'text-primary hover:text-accent' : 'text-white hover:text-accent'
                          }`}
                        >
                          <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          Add to Wishlist
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Modern Product Showcase - Desktop Only */}
                  <div className="hidden lg:block lg:col-span-4 xl:col-span-4 xl:col-start-9">
                    <div 
                      className={`transform transition-all duration-700 delay-1100 will-change-transform ${
                        index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                      }`}
                      style={{
                        transform: 'translate3d(0, 0, 0)',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <div 
                        className={`group relative p-6 xl:p-8 border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                          slide.theme === 'light' 
                            ? 'bg-white/90 border-white/50 hover:bg-white' 
                            : 'bg-black/20 border-white/30 hover:bg-black/30'
                        }`}
                        style={{
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          transform: 'translate3d(0, 0, 0)',
                          borderRadius: '12px',
                        }}
                      >
                        {/* Premium badge */}
                        <div className="absolute -top-3 -right-3 bg-accent text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                          HOT SELLER
                        </div>
                        
                        {/* Glass reflection overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                        
                        <div className={`relative z-10 text-small-caps text-xs mb-4 tracking-[0.15em] font-bold ${
                          slide.theme === 'light' ? 'text-accent' : 'text-accent'
                        }`}>
                          TRENDING NOW
                        </div>
                        
                        <div className="relative z-10 aspect-[4/5] mb-6 overflow-hidden rounded-lg group/image">
                          <Image
                            src={slide.image}
                            alt="Featured jewelry"
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-110"
                            style={{
                              transform: 'translate3d(0, 0, 0)',
                              backfaceVisibility: 'hidden',
                            }}
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Quick add button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-500">
                            <button className="bg-white text-primary px-4 py-2 text-sm font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                              Quick Add
                            </button>
                          </div>
                        </div>
                        
                        <div className={`relative z-10 ${slide.theme === 'light' ? 'text-primary' : 'text-white'}`}>
                          <h3 className="text-display text-lg xl:text-xl mb-2 font-bold">Aurora Collection</h3>
                          
                          {/* Price with discount */}
                          <div className="mb-4 flex items-center gap-2">
                            <span className="text-xl font-bold text-accent">₹2,399</span>
                            <span className="text-sm line-through opacity-70">₹2,999</span>
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">20% OFF</span>
                          </div>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                              </svg>
                            ))}
                            <span className="text-xs ml-1 opacity-80">(142)</span>
                          </div>
                          
                          {/* CTA Button */}
                          <Link 
                            href="/shop" 
                            className={`group/link inline-flex items-center justify-center w-full py-3 px-4 font-bold text-sm tracking-wide transition-all duration-300 rounded-lg ${
                              slide.theme === 'light' 
                                ? 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl' 
                                : 'bg-white text-primary hover:bg-white/95 shadow-lg hover:shadow-xl'
                            } hover:scale-105`}
                          >
                            <span>Shop Now</span>
                            <svg className="ml-2 w-4 h-4 transition-transform duration-300 ease-out group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Minimal Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className={`group absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 lg:w-10 lg:h-10 
          rounded-full border transition-all duration-300 ease-out hover:scale-110 focus:outline-none focus:ring-1 focus:ring-white/20
          will-change-transform disabled:opacity-20 disabled:cursor-not-allowed ${
          currentSlideData.theme === 'light'
            ? 'bg-white/20 border-white/30 text-primary hover:bg-white/40 hover:border-white/50'
            : 'bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30'
        }`}
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transform: 'translate3d(0, -50%, 0)',
          backfaceVisibility: 'hidden',
        }}
        onMouseEnter={(e) => {
          if (!isTransitioning) {
            e.currentTarget.style.transform = 'translate3d(-1px, -50%, 0) scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate3d(0, -50%, 0) scale(1)';
        }}
        aria-label="Previous slide"
      >
        <svg className="w-3 h-3 lg:w-4 lg:h-4 mx-auto transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className={`group absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 lg:w-10 lg:h-10 
          rounded-full border transition-all duration-300 ease-out hover:scale-110 focus:outline-none focus:ring-1 focus:ring-white/20
          will-change-transform disabled:opacity-20 disabled:cursor-not-allowed ${
          currentSlideData.theme === 'light'
            ? 'bg-white/20 border-white/30 text-primary hover:bg-white/40 hover:border-white/50'
            : 'bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30'
        }`}
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transform: 'translate3d(0, -50%, 0)',
          backfaceVisibility: 'hidden',
        }}
        onMouseEnter={(e) => {
          if (!isTransitioning) {
            e.currentTarget.style.transform = 'translate3d(1px, -50%, 0) scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate3d(0, -50%, 0) scale(1)';
        }}
        aria-label="Next slide"
      >
        <svg className="w-3 h-3 lg:w-4 lg:h-4 mx-auto transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Modern Slide Indicators */}
      <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3 backdrop-blur-md bg-black/20 px-6 py-3 rounded-full border border-white/20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`relative transition-all duration-500 ease-out will-change-transform disabled:cursor-not-allowed hover:scale-110 ${
              index === currentSlide 
                ? 'w-10 h-2 bg-white rounded-full shadow-lg' 
                : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70 hover:w-3'
            }`}
            style={{
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
            }}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-accent rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
        
        {/* Slide counter */}
        <div className="ml-4 text-white/80 text-sm font-medium">
          {currentSlide + 1} / {heroSlides.length}
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent z-30">
        <div 
          className="h-full bg-gradient-to-r from-accent via-accent to-accent transition-all duration-500 ease-out shadow-lg"
          style={{ 
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
            transform: 'translate3d(0, 0, 0)',
            willChange: 'width',
            boxShadow: '0 0 20px rgba(201, 169, 110, 0.6)',
          }}
        />
      </div>

      {/* Floating Action Buttons - Hidden on Mobile */}
      <div className="hidden lg:flex absolute bottom-8 right-8 z-30 flex-col gap-3">
        <button 
          className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
          aria-label="Share"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </button>
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className={`w-12 h-12 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 ${
            isPaused ? 'bg-accent hover:bg-accent/80' : 'bg-white/20 hover:bg-white/30'
          }`}
          aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
        >
          {isPaused ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6l5-3-5-3z" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile-specific swipe indicator */}
      <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 text-white/60 text-sm">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span>Swipe to navigate</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </section>
  );
}
