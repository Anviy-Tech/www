'use client';
import Image from 'next/image';
import Link from 'next/link';

const storyPieces = [
  {
    id: 1,
    title: 'The Engagement Ring',
    story: 'A symbol of eternal love, crafted with diamonds that sparkle like the first moment you met.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
    category: 'Love Stories',
    price: '₹45,999',
    emotion: '💕'
  },
  {
    id: 2,
    title: 'The Anniversary Necklace',
    story: 'Marking years of shared memories, each pearl represents a moment of joy and growth together.',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop',
    category: 'Milestones',
    price: '₹32,999',
    emotion: '✨'
  },
  {
    id: 3,
    title: 'The Graduation Bracelet',
    story: 'Celebrating achievement and new beginnings, a reminder of dreams pursued and goals achieved.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    category: 'Achievements',
    price: '₹18,999',
    emotion: '🎓'
  },
  {
    id: 4,
    title: 'The Self-Love Ring',
    story: 'A daily reminder of your worth, because every woman deserves to feel beautiful and confident.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    category: 'Self-Care',
    price: '₹12,999',
    emotion: '💎'
  }
];

const storyCategories = [
  {
    icon: '💕',
    title: 'Love Stories',
    description: 'Pieces that celebrate romance and commitment'
  },
  {
    icon: '✨',
    title: 'Milestones',
    description: 'Jewelry marking life\'s special moments'
  },
  {
    icon: '🎓',
    title: 'Achievements',
    description: 'Rewards for hard work and dedication'
  },
  {
    icon: '💎',
    title: 'Self-Care',
    description: 'Treating yourself with love and respect'
  }
];

export default function EveryPieceStory() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container-page relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="animate-reveal">
            <div className="text-small-caps text-xs text-gray-500 mb-4 sm:mb-6 tracking-[0.2em] font-medium">
              STORYTELLING
            </div>
            <h2 className="text-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-6 sm:mb-8 leading-[0.9] tracking-tight">
              Every Piece <span className="text-serif text-accent italic font-normal">Tells a Story</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8 sm:mb-10"></div>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-light px-4">
              Behind every piece of jewelry lies a unique narrative—of love, achievement, 
              celebration, or self-discovery. Each creation is designed to become part of your story.
            </p>
          </div>
        </div>

        {/* Story Categories */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {storyCategories.map((category, index) => (
              <div 
                key={category.title}
                className="bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-display text-lg sm:text-xl font-medium mb-2">{category.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Pieces Grid */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {storyPieces.map((piece, index) => (
              <div 
                key={piece.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image 
                    src={piece.image}
                    alt={piece.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                      {piece.category}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="text-2xl sm:text-3xl">{piece.emotion}</div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-accent/95 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {piece.price}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-display text-xl sm:text-2xl mb-4 group-hover:text-accent transition-colors duration-300">
                    {piece.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {piece.story}
                  </p>
                  
                  {/* Story elements */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-xs text-gray-500 tracking-wide">Unique Story</span>
                    </div>
                    <Link 
                      href="/shop" 
                      className="text-accent hover:text-accent-dark text-sm font-medium transition-colors duration-300 group/link"
                    >
                      Discover More
                      <svg className="ml-2 w-4 h-4 inline transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Story Experience */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-8 sm:p-12 lg:p-16 rounded-2xl border border-accent/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div>
                <div className="text-small-caps text-xs text-accent mb-4 tracking-widest font-medium">
                  PERSONALIZED STORIES
                </div>
                <h3 className="text-display text-2xl sm:text-3xl lg:text-4xl mb-6 leading-tight">
                  Create Your <span className="text-serif text-accent">Own Story</span>
                </h3>
                <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                  <p>
                    Every piece of jewelry becomes more beautiful when it's connected to your personal journey. 
                    Whether it's marking a milestone, celebrating love, or treating yourself, 
                    each piece carries meaning that grows with time.
                  </p>
                  <p>
                    Our artisans work closely with you to understand your story and create pieces 
                    that reflect your unique personality and experiences.
                  </p>
                </div>
                
                {/* Story features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Personal Consultation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Custom Engraving</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Story Documentation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Lifetime Care</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/consultation" 
                    className="btn-primary inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-sm tracking-[0.1em] uppercase font-bold shadow-xl hover:shadow-2xl transition-all duration-500"
                    style={{ borderRadius: '1px' }}
                  >
                    Book Consultation
                    <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link 
                    href="/custom" 
                    className="btn-secondary px-6 sm:px-8 py-3 sm:py-4 text-sm tracking-[0.1em] uppercase font-bold transition-all duration-500"
                    style={{ borderRadius: '1px' }}
                  >
                    Custom Design
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&h=800&fit=crop"
                    alt="Personalized jewelry consultation"
                    width={600}
                    height={800}
                    className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating testimonial */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-xl border border-white/20 max-w-xs">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-accent text-sm">💕</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Sarah M.</div>
                      <div className="text-xs text-gray-500">Engagement Ring</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    "My ring tells the story of our love journey. Every time I look at it, I remember our first date."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-display text-2xl sm:text-3xl lg:text-4xl mb-4">
            Ready to Start Your <span className="text-serif text-accent">Story</span>?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
            Explore our collections and find the piece that speaks to your heart and tells your unique story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/shop" 
              className="btn-primary inline-flex items-center px-8 sm:px-12 py-4 sm:py-5 text-sm tracking-[0.1em] uppercase font-bold shadow-xl hover:shadow-2xl transition-all duration-500"
              style={{ borderRadius: '1px' }}
            >
              Explore Collections
              <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/stories" 
              className="btn-secondary px-8 sm:px-12 py-4 sm:py-5 text-sm tracking-[0.1em] uppercase font-bold transition-all duration-500"
              style={{ borderRadius: '1px' }}
            >
              Read Customer Stories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
