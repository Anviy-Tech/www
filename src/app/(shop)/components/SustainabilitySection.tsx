'use client';
import Image from 'next/image';
import Link from 'next/link';

interface SustainabilityFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const sustainabilityFeatures: SustainabilityFeature[] = [
  {
    id: 'ethical-sourcing',
    title: 'Ethical Sourcing',
    description: 'All our materials are responsibly sourced from certified suppliers who share our commitment to fair labor practices and environmental protection.',
    icon: '🌱',
    color: 'bg-green-500'
  },
  {
    id: 'recycled-materials',
    title: 'Recycled Materials',
    description: 'We use recycled precious metals and ethically sourced stones, reducing our environmental footprint while maintaining the highest quality standards.',
    icon: '♻️',
    color: 'bg-blue-500'
  },
  {
    id: 'carbon-neutral',
    title: 'Carbon Neutral',
    description: 'Our entire production process is carbon neutral, and we offset any remaining emissions through verified environmental projects.',
    icon: '🌍',
    color: 'bg-emerald-500'
  },
  {
    id: 'fair-trade',
    title: 'Fair Trade Practices',
    description: 'We ensure fair wages and safe working conditions for all artisans and workers throughout our supply chain.',
    icon: '🤝',
    color: 'bg-purple-500'
  }
];

const impactStats = [
  { number: '100%', label: 'Ethically Sourced Materials' },
  { number: '85%', label: 'Recycled Packaging' },
  { number: '0', label: 'Carbon Footprint' },
  { number: '500+', label: 'Artisans Supported' }
];

export default function SustainabilitySection() {
  return (
    <section className="py-32 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="animate-reveal">
            <div className="text-small-caps text-xs text-gray-500 mb-8 tracking-[0.2em] font-medium">
              OUR COMMITMENT
            </div>
            <h2 className="text-display text-5xl lg:text-6xl xl:text-7xl mb-10 leading-[0.9] tracking-tight">
              Sustainable <span className="text-serif text-accent italic font-normal">Luxury</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-12"></div>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light">
              We believe luxury should never come at the expense of our planet or people. 
              Every piece we create is crafted with respect for the environment and communities.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20">
          {/* Left Column - Image */}
          <div className="animate-reveal">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=1000&fit=crop"
                alt="Sustainable jewelry crafting"
                width={800}
                height={1000}
                className="w-full h-[70vh] object-cover rounded-lg shadow-2xl"
                style={{ borderRadius: '2px' }}
              />
              {/* Overlay with stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-lg" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="grid grid-cols-2 gap-6">
                  {impactStats.map((stat, index) => (
                    <div key={index} className="bg-white/95 backdrop-blur-sm p-6 rounded-lg text-center shadow-xl"
                         style={{ borderRadius: '2px' }}>
                      <div className="text-3xl font-light text-accent mb-2">{stat.number}</div>
                      <div className="text-xs text-gray-600 font-light tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-12">
            {sustainabilityFeatures.map((feature, index) => (
              <div 
                key={feature.id}
                className={`flex items-start space-x-6 animate-reveal-delay-${Math.min(index, 3)}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0 ${feature.color} bg-opacity-10 shadow-lg`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-display text-2xl mb-4 leading-tight">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-gradient-to-br from-accent/5 via-accent/10 to-accent/5 p-12 lg:p-16 rounded-lg mb-20 shadow-xl"
             style={{ borderRadius: '2px' }}>
          <div className="text-center mb-16">
            <h3 className="text-display text-4xl mb-6 font-light">Our Impact</h3>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed font-light">
              See how our commitment to sustainability is making a real difference in the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🌿</span>
              </div>
              <div className="text-4xl font-light text-accent mb-3">2,500+</div>
              <div className="text-sm text-gray-600 font-light tracking-wide">Trees Planted</div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">💧</span>
              </div>
              <div className="text-4xl font-light text-accent mb-3">50,000L</div>
              <div className="text-sm text-gray-600 font-light tracking-wide">Water Saved</div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">⚡</span>
              </div>
              <div className="text-4xl font-light text-accent mb-3">100%</div>
              <div className="text-sm text-gray-600 font-light tracking-wide">Renewable Energy</div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">👥</span>
              </div>
              <div className="text-4xl font-light text-accent mb-3">500+</div>
              <div className="text-sm text-gray-600 font-light tracking-wide">Lives Impacted</div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <h3 className="text-display text-3xl text-center mb-12 font-light">Our Certifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg"
                   style={{ borderRadius: '2px' }}>
                <span className="text-3xl">🏆</span>
              </div>
              <div className="text-sm font-medium tracking-wide">Fair Trade Certified</div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg"
                   style={{ borderRadius: '2px' }}>
                <span className="text-3xl">🌱</span>
              </div>
              <div className="text-sm font-medium tracking-wide">Carbon Neutral</div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg"
                   style={{ borderRadius: '2px' }}>
                <span className="text-3xl">♻️</span>
              </div>
              <div className="text-sm font-medium tracking-wide">Recycled Materials</div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg"
                   style={{ borderRadius: '2px' }}>
                <span className="text-3xl">💎</span>
              </div>
              <div className="text-sm font-medium tracking-wide">Conflict Free</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-accent/5 via-accent/10 to-accent/5 p-12 lg:p-16 rounded-lg max-w-4xl mx-auto shadow-2xl"
               style={{ borderRadius: '2px' }}>
            <h3 className="text-display text-3xl mb-6 font-light">Join Our Mission</h3>
            <p className="text-gray-600 mb-10 leading-relaxed font-light text-lg max-w-2xl mx-auto">
              When you choose our jewelry, you're not just buying a beautiful piece—you're supporting 
              sustainable practices and ethical craftsmanship. Together, we can create a more beautiful world.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/about/sustainability" 
                    className="btn-primary px-12 py-5 text-sm tracking-[0.1em] uppercase font-bold shadow-2xl hover:shadow-3xl transition-all duration-500"
                    style={{ borderRadius: '1px' }}>
                Learn More About Our Impact
              </Link>
              <Link href="/shop" 
                    className="btn-secondary px-12 py-5 text-sm tracking-[0.1em] uppercase font-bold transition-all duration-500"
                    style={{ borderRadius: '1px' }}>
                Shop Sustainable Jewelry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
