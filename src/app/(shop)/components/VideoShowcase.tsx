'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-[80vh] sm:min-h-[90vh] lg:h-[100vh] overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=2400&h=1600&fit=crop"
          muted
          loop
          playsInline
        >
          {/* You can add actual video sources here */}
          <source src="/videos/jewelry-showcase.mp4" type="video/mp4" />
          <source src="/videos/jewelry-showcase.webm" type="video/webm" />
        </video>
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center py-16 sm:py-20 lg:py-0">
        <div className="container-page w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="lg:col-span-8 xl:col-span-7 text-white space-y-8 sm:space-y-12">
              <div className="animate-reveal">
                {/* Professional Badge */}
                <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-accent text-primary text-xs sm:text-sm font-medium tracking-wide uppercase mb-6 sm:mb-8"
                     style={{ borderRadius: '1px' }}>
                  <span className="mr-2 sm:mr-3">✨</span>
                  Crafted with Love
                </div>

                {/* Clean Title */}
                <h2 className="text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[0.9] tracking-tight mb-6 sm:mb-8">
                  Every Piece Tells a <span className="text-serif text-accent italic font-normal">Story</span>
                </h2>

                {/* Professional Description */}
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-8 sm:mb-12">
                  Watch our master artisans bring your jewelry to life, from the first sketch to the final polish. 
                  Each piece is a testament to centuries of craftsmanship.
                </p>

                {/* Clean Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-accent mb-2">50+</div>
                    <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-accent mb-2">10K+</div>
                    <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-accent mb-2">100%</div>
                    <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Handcrafted</div>
                  </div>
                </div>

                {/* Professional CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <Link
                    href="/about"
                    className="btn-primary inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-xs sm:text-sm tracking-wide uppercase font-medium transition-all duration-300"
                    style={{ borderRadius: '1px' }}
                  >
                    Our Story
                    <svg className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <button
                    onClick={handlePlayPause}
                    className="btn-secondary inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-xs sm:text-sm tracking-wide uppercase font-medium transition-all duration-300"
                    style={{ borderRadius: '1px' }}
                  >
                    {isPlaying ? 'Pause' : 'Play'} Video
                    <svg className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isPlaying ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 9v6l5-3-5-3z" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Professional Video Controls Panel */}
            <div className="lg:col-span-4 xl:col-span-4 xl:col-start-9">
              <div className="animate-reveal-delay-2">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 rounded-sm shadow-lg"
                     style={{ borderRadius: '2px' }}>
                  <h3 className="text-white text-lg sm:text-xl font-light mb-4 sm:mb-6">Behind the Scenes</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center text-white/90">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full mr-3 sm:mr-4"></div>
                      <span className="text-xs sm:text-sm font-light">Design Process</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full mr-3 sm:mr-4"></div>
                      <span className="text-xs sm:text-sm font-light">Material Selection</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full mr-3 sm:mr-4"></div>
                      <span className="text-xs sm:text-sm font-light">Handcrafting</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full mr-3 sm:mr-4"></div>
                      <span className="text-xs sm:text-sm font-light">Quality Control</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20">
                    <div className="text-white/60 text-xs font-light">
                      Video duration: 2:34
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Video Controls Overlay */}
      <div className="lg:hidden absolute bottom-4 left-4 right-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-sm p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="text-white text-sm font-medium">Video Showcase</div>
            <button
              onClick={handlePlayPause}
              className="bg-accent hover:bg-accent/90 text-white p-2 rounded-sm transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isPlaying ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6l5-3-5-3z" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
