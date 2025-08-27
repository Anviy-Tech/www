'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GiftOption {
  id: string;
  title: string;
  description: string;
  image: string;
  priceRange: string;
  link: string;
  category: string;
}

const giftOptions: GiftOption[] = [
  {
    id: 'anniversary',
    title: 'Anniversary Gifts',
    description: 'Celebrate your love with timeless pieces',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop',
    priceRange: '₹2,999 - ₹12,999',
    link: '/gifts/anniversary',
    category: 'romance'
  },
  {
    id: 'birthday',
    title: 'Birthday Surprises',
    description: 'Make their special day unforgettable',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=400&fit=crop',
    priceRange: '₹1,999 - ₹8,999',
    link: '/gifts/birthday',
    category: 'celebration'
  },
  {
    id: 'wedding',
    title: 'Wedding Jewelry',
    description: 'Perfect pieces for the big day',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop',
    priceRange: '₹3,999 - ₹15,999',
    link: '/gifts/wedding',
    category: 'special'
  },
  {
    id: 'graduation',
    title: 'Graduation Gifts',
    description: 'Mark their achievements with style',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop',
    priceRange: '₹1,499 - ₹6,999',
    link: '/gifts/graduation',
    category: 'achievement'
  },
  {
    id: 'mothers-day',
    title: "Mother's Day",
    description: 'Show her how much she means to you',
    image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&h=400&fit=crop',
    priceRange: '₹2,499 - ₹9,999',
    link: '/gifts/mothers-day',
    category: 'family'
  },
  {
    id: 'self-love',
    title: 'Self Love',
    description: 'Treat yourself to something beautiful',
    image: 'https://images.unsplash.com/photo-1603575449299-0f2f5d6c2c88?w=600&h=400&fit=crop',
    priceRange: '₹999 - ₹5,999',
    link: '/gifts/self-love',
    category: 'personal'
  }
];

const giftCategories = [
  { id: 'all', name: 'All Gifts', icon: '🎁' },
  { id: 'romance', name: 'Romance', icon: '💕' },
  { id: 'celebration', name: 'Celebration', icon: '🎉' },
  { id: 'special', name: 'Special Occasions', icon: '✨' },
  { id: 'achievement', name: 'Achievements', icon: '🏆' },
  { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'personal', name: 'Self Love', icon: '💎' }
];

export default function GiftFinder() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [budget, setBudget] = useState('all');

  const filteredGifts = giftOptions.filter(gift => {
    const categoryMatch = selectedCategory === 'all' || gift.category === selectedCategory;
    return categoryMatch;
  });

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="animate-reveal">
            <div className="text-small-caps text-xs text-gray-500 mb-4 sm:mb-6 lg:mb-8 tracking-[0.2em] font-medium">
              GIFT FINDER
            </div>
            <h2 className="text-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-6 sm:mb-8 lg:mb-10 leading-[0.9] tracking-tight">
              Find the Perfect <span className="text-serif text-accent italic font-normal">Gift</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8 sm:mb-10 lg:mb-12"></div>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light px-4">
              Not sure what to choose? Let us help you find the ideal jewelry piece for any occasion.
            </p>
          </div>
        </div>

        {/* Gift Finder Tool */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6 sm:p-8 lg:p-12 rounded-lg shadow-2xl"
               style={{ borderRadius: '2px' }}>
            <h3 className="text-display text-2xl sm:text-3xl mb-8 sm:mb-10 text-center font-light">Gift Finder Tool</h3>
            
            {/* Category Filter */}
            <div className="mb-8 sm:mb-12">
              <label className="block text-sm font-medium text-gray-600 mb-4 sm:mb-6 tracking-wide">
                What's the occasion?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
                {giftCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 sm:p-6 rounded-lg border-2 transition-all duration-500 text-center hover:scale-105 ${
                      selectedCategory === category.id
                        ? 'border-accent bg-accent text-white shadow-xl'
                        : 'border-gray-200 hover:border-accent/50 bg-white shadow-lg hover:shadow-xl'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{category.icon}</div>
                    <div className="text-xs font-medium tracking-wide">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Filter */}
            <div className="mb-8 sm:mb-12">
              <label className="block text-sm font-medium text-gray-600 mb-4 sm:mb-6 tracking-wide">
                What's your budget?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { id: 'all', name: 'Any Budget', range: 'All Prices' },
                  { id: 'under-2k', name: 'Under ₹2,000', range: '₹999 - ₹1,999' },
                  { id: '2k-5k', name: '₹2,000 - ₹5,000', range: '₹2,000 - ₹5,000' },
                  { id: '5k-plus', name: '₹5,000+', range: '₹5,000+' }
                ].map((budgetOption) => (
                  <button
                    key={budgetOption.id}
                    onClick={() => setBudget(budgetOption.id)}
                    className={`p-4 sm:p-6 rounded-lg border-2 transition-all duration-500 text-center hover:scale-105 ${
                      budget === budgetOption.id
                        ? 'border-accent bg-accent text-white shadow-xl'
                        : 'border-gray-200 hover:border-accent/50 bg-white shadow-lg hover:shadow-xl'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="font-medium mb-1 sm:mb-2 tracking-wide text-sm sm:text-base">{budgetOption.name}</div>
                    <div className="text-xs opacity-80 font-light">{budgetOption.range}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gift Recommendations */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h3 className="text-display text-2xl sm:text-3xl mb-8 sm:mb-12 text-center font-light">
            Recommended for {giftCategories.find(c => c.id === selectedCategory)?.name || 'All Occasions'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {filteredGifts.map((gift, index) => (
              <div 
                key={gift.id}
                className={`group bg-white border border-gray-100 hover:border-accent transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 animate-reveal-delay-${Math.min(index, 3)}`}
                style={{ borderRadius: '2px' }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={gift.image}
                    alt={gift.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  {/* Sophisticated Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  {/* Quick View */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <Link
                      href={gift.link}
                      className="bg-white/95 backdrop-blur-sm text-primary px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm tracking-[0.1em] uppercase hover:bg-white transition-all duration-500 transform hover:scale-105 shadow-xl"
                      style={{ borderRadius: '1px' }}
                    >
                      Explore Gifts
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h4 className="text-display text-xl sm:text-2xl mb-3 sm:mb-4 group-hover:text-accent transition-colors duration-500 leading-tight">
                    {gift.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 sm:mb-6 leading-relaxed font-light">
                    {gift.description}
                  </p>
                  
                  {/* Price Range */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="text-accent font-semibold tracking-wide text-sm sm:text-base">{gift.priceRange}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded-full font-light tracking-wide">
                      {gift.category}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={gift.link}
                    className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-dark transition-colors duration-500 group/link tracking-wide"
                  >
                    Shop Now
                    <svg className="ml-2 sm:ml-3 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-500 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gift Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <span className="text-2xl sm:text-3xl">🎁</span>
            </div>
            <h4 className="text-display text-lg sm:text-xl mb-3 sm:mb-4 font-light">Gift Wrapping</h4>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              Free luxury gift wrapping with personalized message
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <span className="text-2xl sm:text-3xl">🚚</span>
            </div>
            <h4 className="text-display text-lg sm:text-xl mb-3 sm:mb-4 font-light">Express Delivery</h4>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              Same-day delivery available in select cities
            </p>
          </div>
          
          <div className="text-center sm:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <span className="text-2xl sm:text-3xl">💬</span>
            </div>
            <h4 className="text-display text-lg sm:text-xl mb-3 sm:mb-4 font-light">Gift Consultation</h4>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              Free consultation with our gift experts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
