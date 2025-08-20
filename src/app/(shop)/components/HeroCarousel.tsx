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
  bgColor: string;
  textColor: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "LUXURY",
    subtitle: "REDEFINED",
    description: "Discover handcrafted jewelry that embodies timeless elegance and contemporary sophistication.",
    buttonText: "Explore Collection",
    buttonLink: "/shop",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop",
    bgColor: "from-rose-400 to-pink-500",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "ARTISAN",
    subtitle: "CRAFTED",
    description: "Each piece tells a story of meticulous attention to detail and master craftsmanship.",
    buttonText: "View Process",
    buttonLink: "/about",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=1000&fit=crop",
    bgColor: "from-amber-400 to-orange-500",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "NEW",
    subtitle: "ARRIVALS",
    description: "Fresh designs that capture the essence of modern elegance and timeless beauty.",
    buttonText: "Shop New",
    buttonLink: "/collections/new",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop",
    bgColor: "from-emerald-400 to-teal-500",
    textColor: "text-white"
  },
  {
    id: 4,
    title: "ETHICAL",
    subtitle: "LUXURY",
    description: "Sustainable practices meet exceptional quality in every piece we create.",
    buttonText: "Our Values",
    buttonLink: "/about",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop",
    bgColor: "from-purple-400 to-violet-500",
    textColor: "text-white"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} opacity-90 z-10`}></div>
            
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={`${slide.title} ${slide.subtitle}`}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="container-page">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <div className={`${slide.textColor} space-y-8`}>
                    <div className="overflow-hidden">
                      <h1 
                        className={`text-display text-6xl md:text-8xl lg:text-9xl font-bold leading-none transform transition-all duration-1000 delay-300 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                        }`}
                      >
                        {slide.title}
                      </h1>
                    </div>
                    
                    <div className="overflow-hidden">
                      <h2 
                        className={`text-display text-4xl md:text-6xl lg:text-7xl font-light leading-none transform transition-all duration-1000 delay-500 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                        }`}
                      >
                        {slide.subtitle}
                      </h2>
                    </div>

                    <div className="overflow-hidden">
                      <p 
                        className={`text-xl md:text-2xl leading-relaxed max-w-xl transform transition-all duration-1000 delay-700 ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                        }`}
                      >
                        {slide.description}
                      </p>
                    </div>

                    <div className="overflow-hidden">
                      <Link
                        href={slide.buttonLink}
                        className={`inline-block bg-white text-primary px-8 py-4 font-medium tracking-wide transition-all duration-300 hover:bg-opacity-90 hover:scale-105 transform ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                        }`}
                        style={{ transitionDelay: '900ms' }}
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>

                  {/* Featured Product */}
                  <div className="hidden lg:block">
                    <div 
                      className={`transform transition-all duration-1000 delay-1000 ${
                        index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                      }`}
                    >
                      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                        <div className="text-small-caps text-xs text-white/80 mb-4 tracking-widest">
                          FEATURED PIECE
                        </div>
                        <Image
                          src={slide.image}
                          alt="Featured jewelry"
                          width={400}
                          height={500}
                          className="w-full h-80 object-cover rounded-lg mb-6"
                        />
                        <div className="text-white">
                          <h3 className="text-display text-xl mb-2">Aurora Collection</h3>
                          <p className="text-white/80 mb-4">Starting from ₹2,999</p>
                          <Link 
                            href="/shop" 
                            className="text-white underline decoration-2 underline-offset-4 hover:decoration-white/60 transition-colors"
                          >
                            View Details
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

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Slide Progress */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%` 
          }}
        />
      </div>
    </section>
  );
}
