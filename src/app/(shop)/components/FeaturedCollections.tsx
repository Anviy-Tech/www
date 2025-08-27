'use client';
import Image from 'next/image';
import Link from 'next/link';

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  priceRange: string;
  link: string;
  badge?: string;
}

const collections: Collection[] = [
  {
    id: 'aurora',
    name: 'Aurora Collection',
    description: 'Ethereal pieces inspired by the northern lights',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop',
    productCount: 12,
    priceRange: '₹1,999 - ₹8,999',
    link: '/collections/aurora',
    badge: 'BESTSELLER'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean lines and understated elegance',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=1000&fit=crop',
    productCount: 8,
    priceRange: '₹1,499 - ₹5,999',
    link: '/collections/minimalist'
  },
  {
    id: 'luxe',
    name: 'Luxe',
    description: 'Premium pieces for special occasions',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop',
    productCount: 6,
    priceRange: '₹3,999 - ₹12,999',
    link: '/collections/luxe',
    badge: 'NEW'
  },
  {
    id: 'everyday',
    name: 'Everyday',
    description: 'Versatile pieces for daily wear',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop',
    productCount: 15,
    priceRange: '₹999 - ₹4,999',
    link: '/collections/everyday'
  }
];

export default function FeaturedCollections() {
  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="animate-reveal">
            <div className="text-small-caps text-xs text-gray-500 mb-8 tracking-[0.2em] font-medium">
              CURATED COLLECTIONS
            </div>
            <h2 className="text-display text-5xl lg:text-6xl xl:text-7xl mb-10 leading-[0.9] tracking-tight">
              Discover Your <span className="text-serif text-accent italic">Style</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-12"></div>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light">
              Each collection tells a story, designed for different moments and moods in your life.
            </p>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20">
          {collections.map((collection, index) => (
            <div 
              key={collection.id}
              className={`group relative overflow-hidden bg-white transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 animate-reveal-delay-${Math.min(index, 3)}`}
              style={{
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                borderRadius: '2px'
              }}
            >
              {/* Badge */}
              {collection.badge && (
                <div className="absolute top-6 left-6 z-20">
                  <span className={`inline-block px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase ${
                    collection.badge === 'BESTSELLER' 
                      ? 'bg-accent text-white shadow-lg' 
                      : 'bg-blue-600 text-white shadow-lg'
                  }`}
                  style={{ borderRadius: '1px' }}>
                    {collection.badge}
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                {/* Sophisticated Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                {/* Quick View Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <Link
                    href={collection.link}
                    className="bg-white/95 backdrop-blur-sm text-primary px-8 py-4 font-bold text-sm tracking-[0.1em] uppercase hover:bg-white transition-all duration-500 transform hover:scale-105 shadow-xl"
                    style={{ borderRadius: '1px' }}
                  >
                    Explore Collection
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-display text-2xl mb-4 group-hover:text-accent transition-colors duration-500 leading-tight">
                  {collection.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed font-light">
                  {collection.description}
                </p>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-6 font-medium tracking-wide">
                  <span>{collection.productCount} pieces</span>
                  <span>{collection.priceRange}</span>
                </div>

                {/* CTA */}
                <Link
                  href={collection.link}
                  className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-dark transition-colors duration-500 group/link tracking-wide"
                >
                  Shop Collection
                  <svg className="ml-3 w-4 h-4 transition-transform duration-500 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Collections CTA */}
        <div className="text-center">
          <Link
            href="/collections"
            className="btn-primary inline-flex items-center px-12 py-5 text-sm tracking-[0.1em] uppercase font-bold"
            style={{ borderRadius: '1px' }}
          >
            View All Collections
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
