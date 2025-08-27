'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  product: string;
  avatar: string;
  verified: boolean;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    review: "The Aurora ring exceeded all my expectations! The craftsmanship is impeccable and it's become my everyday piece. The gold vermeil finish is so luxurious and hasn't tarnished at all.",
    product: "Aurora Ring",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    verified: true,
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Anjali Patel",
    location: "Delhi, NCR",
    rating: 5,
    review: "I bought the tennis bracelet for my anniversary and my husband was amazed by the quality. The stones sparkle beautifully and the clasp is so secure. Highly recommend!",
    product: "Tennis Bracelet",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    verified: true,
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Riya Mehta",
    location: "Bangalore, Karnataka",
    rating: 5,
    review: "The customer service is outstanding! They helped me choose the perfect piece for my mom's birthday. The gift wrapping was beautiful and delivery was super fast.",
    product: "Pearl Drop Necklace",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    verified: true,
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "Zara Khan",
    location: "Hyderabad, Telangana",
    rating: 5,
    review: "I've been wearing the mini hoops daily for 6 months and they still look brand new. The quality is incredible and they're so comfortable to wear all day long.",
    product: "Mini Hoops",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    verified: true,
    date: "2 months ago"
  },
  {
    id: 5,
    name: "Sneha Reddy",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    review: "The mangalsutra design is so elegant and modern while still being traditional. My husband and I love how it looks and the quality is exceptional.",
    product: "Elegance Mangalsutra",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    verified: true,
    date: "1 week ago"
  },
  {
    id: 6,
    name: "Kavya Singh",
    location: "Pune, Maharashtra",
    rating: 5,
    review: "I bought the heart pendant for my daughter's graduation and she absolutely loves it! The chain is adjustable and the pendant is the perfect size. Great value for money.",
    product: "Heart Pendant",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    verified: true,
    date: "1 month ago"
  }
];

export default function CustomerTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="animate-reveal">
            <div className="text-small-caps text-xs text-gray-500 mb-8 tracking-[0.2em] font-medium">
              CUSTOMER STORIES
            </div>
            <h2 className="text-display text-5xl lg:text-6xl xl:text-7xl mb-10 leading-[0.9] tracking-tight">
              Loved by <span className="text-serif text-accent italic font-normal">Thousands</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-12"></div>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light">
              See what our customers are saying about their jewelry pieces and shopping experience.
            </p>
          </div>
        </div>

        {/* Overall Rating */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-white p-8 rounded-lg shadow-2xl"
               style={{ borderRadius: '2px' }}>
            <div className="text-center mr-12">
              <div className="text-5xl font-light text-accent mb-3">4.9</div>
              <div className="flex items-center justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <div className="text-sm text-gray-500 font-light tracking-wide">Based on 2,847 reviews</div>
            </div>
            
            <div className="border-l border-gray-200 pl-12">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center">
                  <span className="w-12 text-left font-medium">5★</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mx-3">
                    <div className="bg-accent h-2 rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-gray-500 font-light">92%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-12 text-left font-medium">4★</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mx-3">
                    <div className="bg-accent h-2 rounded-full transition-all duration-1000" style={{ width: '6%' }}></div>
                  </div>
                  <span className="text-gray-500 font-light">6%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-12 text-left font-medium">3★</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mx-3">
                    <div className="bg-accent h-2 rounded-full transition-all duration-1000" style={{ width: '2%' }}></div>
                  </div>
                  <span className="text-gray-500 font-light">2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white p-12 lg:p-16 rounded-lg shadow-2xl relative"
               style={{ borderRadius: '2px' }}>
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-accent/10">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>

            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center mb-8">
                {[...Array(currentTestimonialData.rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
                <span className="ml-4 text-sm text-gray-500 font-light tracking-wide">
                  Verified Purchase • {currentTestimonialData.date}
                </span>
              </div>

              {/* Review Text */}
              <blockquote className="text-xl lg:text-2xl text-gray-800 leading-relaxed mb-10 font-light italic">
                "{currentTestimonialData.review}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative mr-6">
                    <Image
                      src={currentTestimonialData.avatar}
                      alt={currentTestimonialData.name}
                      width={72}
                      height={72}
                      className="rounded-full object-cover shadow-lg"
                    />
                    {currentTestimonialData.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-accent text-white rounded-full p-2 shadow-lg">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-lg">{currentTestimonialData.name}</div>
                    <div className="text-sm text-gray-500 font-light tracking-wide">{currentTestimonialData.location}</div>
                    <div className="text-sm text-accent font-medium tracking-wide">{currentTestimonialData.product}</div>
                  </div>
                </div>

                {/* Product Image */}
                <div className="hidden lg:block">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center shadow-lg"
                       style={{ borderRadius: '2px' }}>
                    <span className="text-3xl">💎</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center items-center space-x-4 mb-20">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`transition-all duration-500 ${
                index === currentTestimonial
                  ? 'w-12 h-2 bg-accent rounded-full shadow-lg'
                  : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-accent/50 hover:w-4'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-reveal-delay-${Math.min(index, 3)}`}
              style={{ borderRadius: '2px' }}
            >
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
                <span className="ml-3 text-xs text-gray-500 font-light tracking-wide">{testimonial.date}</span>
              </div>

              {/* Review */}
              <blockquote className="text-sm text-gray-700 leading-relaxed mb-6 font-light italic">
                "{testimonial.review}"
              </blockquote>

              {/* Customer */}
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover mr-4 shadow-md"
                />
                <div>
                  <div className="font-medium text-sm text-gray-800">{testimonial.name}</div>
                  <div className="text-xs text-gray-500 font-light tracking-wide">{testimonial.product}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-accent/5 p-12 rounded-lg max-w-3xl mx-auto shadow-xl"
               style={{ borderRadius: '2px' }}>
            <h3 className="text-display text-2xl mb-6 font-light">Join Our Happy Customers</h3>
            <p className="text-gray-600 mb-8 leading-relaxed font-light">
              Share your experience and help others discover the perfect jewelry piece.
            </p>
            <button className="btn-primary px-12 py-5 text-sm tracking-[0.1em] uppercase font-bold shadow-2xl hover:shadow-3xl transition-all duration-500"
                    style={{ borderRadius: '1px' }}>
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
