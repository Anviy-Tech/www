'use client';
import Image from 'next/image';
import Link from 'next/link';

const storyTimeline = [
  {
    year: '1995',
    title: 'The Beginning',
    description: 'Founded with a vision to create timeless jewelry that celebrates individual beauty and craftsmanship.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
    milestone: 'Founded'
  },
  {
    year: '2005',
    title: 'First Atelier',
    description: 'Established our first dedicated atelier, bringing together master craftspeople and contemporary designers.',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop',
    milestone: 'Atelier'
  },
  {
    year: '2015',
    title: 'Global Recognition',
    description: 'Our collections gained international acclaim, featured in prestigious fashion publications worldwide.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
    milestone: 'Recognition'
  },
  {
    year: '2023',
    title: 'Digital Innovation',
    description: 'Embracing technology while preserving traditional craftsmanship, creating the perfect blend of old and new.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
    milestone: 'Innovation'
  }
];

const values = [
  {
    icon: '💎',
    title: 'Craftsmanship',
    description: 'Every piece is handcrafted with meticulous attention to detail by our master artisans.'
  },
  {
    icon: '🌱',
    title: 'Sustainability',
    description: 'We source materials ethically and responsibly, ensuring minimal environmental impact.'
  },
  {
    icon: '✨',
    title: 'Innovation',
    description: 'Combining traditional techniques with modern design to create timeless pieces.'
  },
  {
    icon: '💝',
    title: 'Personal Touch',
    description: 'Each creation tells a story, designed to become a cherished part of your journey.'
  }
];

export default function OurStory() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container-page relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="animate-reveal">
            <div className="text-small-caps text-xs text-gray-500 mb-4 sm:mb-6 tracking-[0.2em] font-medium">
              OUR STORY
            </div>
            <h2 className="text-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-6 sm:mb-8 leading-[0.9] tracking-tight">
              A Legacy of <span className="text-serif text-accent italic font-normal">Excellence</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8 sm:mb-10"></div>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-light px-4">
              For over two decades, we've been crafting jewelry that transcends trends, 
              creating pieces that become cherished heirlooms passed down through generations.
            </p>
          </div>
        </div>

        {/* Hero Story Section */}
        <div className="mb-20 sm:mb-24 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&h=800&fit=crop"
                  alt="Our story begins"
                  width={600}
                  height={800}
                  className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-xl border border-white/20">
                <div className="text-2xl sm:text-3xl font-light text-accent">25+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium tracking-wide">Years of Excellence</div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="animate-reveal-delay-1">
                <div className="text-small-caps text-xs text-gray-500 mb-4 tracking-widest">
                  THE BEGINNING
                </div>
                <h3 className="text-display text-2xl sm:text-3xl lg:text-4xl mb-6 leading-tight">
                  Where <span className="text-serif text-accent">passion</span> meets purpose
                </h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded in 1995, Anviy began as a small family workshop with a simple yet profound mission: 
                    to create jewelry that celebrates the unique beauty of every individual while honoring the 
                    timeless traditions of fine craftsmanship.
                  </p>
                  <p>
                    What started as a passion project has grown into a respected name in luxury jewelry, 
                    known for our commitment to quality, innovation, and the personal touch that makes 
                    each piece truly special.
                  </p>
                </div>
              </div>

              {/* Values Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {values.slice(0, 4).map((value, index) => (
                  <div 
                    key={value.title}
                    className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-2xl sm:text-3xl mb-3">{value.icon}</div>
                    <h4 className="text-display text-sm sm:text-base font-medium mb-2">{value.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20 sm:mb-24 lg:mb-32">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-display text-2xl sm:text-3xl lg:text-4xl mb-4">
              Our <span className="text-serif text-accent">Journey</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto px-4">
              From humble beginnings to international recognition, every milestone has shaped who we are today.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-accent/20 via-accent to-accent/20"></div>
            
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {storyTimeline.map((item, index) => (
                <div 
                  key={item.year}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className={`flex-1 text-center lg:text-left ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                    <div className="animate-reveal-delay-1">
                      <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium tracking-wide mb-4">
                        {item.year}
                      </div>
                      <h4 className="text-display text-xl sm:text-2xl lg:text-3xl mb-4">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                        {item.description}
                      </p>
                      <div className="mt-4">
                        <span className="text-xs text-gray-500 tracking-widest uppercase">
                          {item.milestone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex-1">
                    <div className="relative group">
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <Image 
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-8 sm:p-12 lg:p-16 rounded-2xl border border-accent/10">
            <h3 className="text-display text-2xl sm:text-3xl lg:text-4xl mb-4">
              Be Part of Our <span className="text-serif text-accent">Story</span>
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
              Discover our collections and find the perfect piece that will become part of your own story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/about" 
                className="btn-primary inline-flex items-center px-8 sm:px-12 py-4 sm:py-5 text-sm tracking-[0.1em] uppercase font-bold shadow-xl hover:shadow-2xl transition-all duration-500"
                style={{ borderRadius: '1px' }}
              >
                Learn More About Us
                <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/shop" 
                className="btn-secondary px-8 sm:px-12 py-4 sm:py-5 text-sm tracking-[0.1em] uppercase font-bold transition-all duration-500"
                style={{ borderRadius: '1px' }}
              >
                Explore Collections
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
