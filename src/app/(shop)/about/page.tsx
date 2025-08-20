import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="section-hero relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern"></div>
        <div className="container-page relative">
          <div className="grid-editorial items-center">
            <div className="col-span-12 lg:col-span-6 lg:col-start-1">
              <div className="animate-reveal">
                <div className="text-small-caps text-xs text-text-muted mb-6 tracking-widest">
                  OUR STORY
                </div>
                <h1 className="text-display-large mb-8">
                  Where
                  <span className="text-serif block text-6xl lg:text-8xl text-accent">
                    Artistry
                  </span>
                  meets precision
                </h1>
                <div className="divider mb-8"></div>
                <p className="text-xl text-text-secondary max-w-md leading-relaxed">
                  Founded with a vision to make luxury accessible, Anviy represents the intersection 
                  of traditional craftsmanship and contemporary design philosophy.
                </p>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <div className="animate-reveal-delay-2">
                <Image 
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop"
                  alt="Artisan crafting jewelry" 
                  width={600} 
                  height={800}
                  className="w-full h-[70vh] object-cover hover-scale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-standard bg-white">
        <div className="container-page">
          <div className="grid-editorial">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3">
              <div className="animate-reveal text-center">
                <h2 className="text-display text-4xl lg:text-5xl mb-8">
                  A Legacy of <span className="text-serif">Excellence</span>
                </h2>
                <div className="divider"></div>
                <div className="space-y-8 text-lg text-text-secondary leading-relaxed">
                  <p>
                    Anviy was born from a simple belief: that exceptional jewelry should be 
                    accessible to those who appreciate true craftsmanship. Our journey began 
                    in 2020, when our founder envisioned creating pieces that seamlessly blend 
                    timeless elegance with contemporary sensibilities.
                  </p>
                  <p>
                    Each piece in our collection tells a story of meticulous attention to detail, 
                    from the initial sketch to the final polish. We work exclusively with master 
                    artisans who have honed their craft over decades, ensuring that every piece 
                    meets our exacting standards of beauty and durability.
                  </p>
                  <p>
                    Today, Anviy stands as a testament to the power of combining traditional 
                    techniques with modern innovation, creating jewelry that transcends trends 
                    and becomes part of your personal narrative.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="section-standard">
        <div className="container-page">
          <div className="mb-16 text-center">
            <h2 className="text-display text-4xl lg:text-5xl mb-6">Our Creative Process</h2>
            <div className="divider"></div>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              From concept to creation, every piece undergoes a meticulous journey of craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                step: "01",
                title: "Design",
                description: "Initial sketches and conceptualization by our design team, inspired by contemporary art and timeless elegance.",
                icon: "✏️"
              },
              {
                step: "02", 
                title: "Selection",
                description: "Careful curation of premium materials - 18K gold vermeil, sterling silver, and ethically sourced stones.",
                icon: "💎"
              },
              {
                step: "03",
                title: "Crafting",
                description: "Master artisans bring designs to life using time-honored techniques refined over generations.",
                icon: "⚒️"
              },
              {
                step: "04",
                title: "Quality",
                description: "Rigorous quality control ensures each piece meets our exacting standards before reaching you.",
                icon: "✨"
              }
            ].map((item, i) => (
              <div key={i} className={`animate-reveal-delay-${i % 4} text-center`}>
                <div className="text-4xl mb-6">{item.icon}</div>
                <div className="text-small-caps text-xs text-text-muted mb-4 tracking-widest">
                  STEP {item.step}
                </div>
                <h3 className="text-display text-xl mb-4">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Mission */}
      <section className="section-standard bg-white">
        <div className="container-page">
          <div className="grid-editorial">
            <div className="col-span-12 lg:col-span-6">
              <div className="animate-reveal">
                <Image 
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop"
                  alt="Sustainable jewelry making"
                  width={600}
                  height={800}
                  className="w-full h-[60vh] object-cover"
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex items-center">
              <div className="animate-reveal-delay-2">
                <div className="text-small-caps text-xs text-text-muted mb-6 tracking-widest">
                  OUR VALUES
                </div>
                <h2 className="text-display text-4xl mb-8">
                  Sustainability meets <span className="text-serif">Beauty</span>
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-display text-xl mb-3">Ethical Sourcing</h3>
                    <p className="text-text-secondary leading-relaxed">
                      We are committed to responsible sourcing, working only with suppliers 
                      who share our values of ethical mining and fair labor practices.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-display text-xl mb-3">Environmental Responsibility</h3>
                    <p className="text-text-secondary leading-relaxed">
                      Our packaging is 100% recyclable, and we offset our carbon footprint 
                      through partnerships with environmental organizations.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-display text-xl mb-3">Artisan Support</h3>
                    <p className="text-text-secondary leading-relaxed">
                      We believe in preserving traditional craftsmanship by providing fair 
                      wages and continuous skill development to our artisan partners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials & Quality */}
      <section className="section-standard">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-display text-4xl lg:text-5xl mb-6">Premium Materials</h2>
            <div className="divider"></div>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Only the finest materials make it into our collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "18K Gold Vermeil",
                description: "Thick layers of 18-karat gold electroplated over sterling silver, providing the luxury look of solid gold with exceptional durability.",
                features: ["Hypoallergenic", "Tarnish resistant", "Long-lasting"]
              },
              {
                title: "Sterling Silver",
                description: "Premium 925 sterling silver forms the foundation of our pieces, ensuring strength and longevity while maintaining an elegant finish.",
                features: ["99.9% pure silver", "Durable base", "Skin-safe"]
              },
              {
                title: "Lab-Grown Stones",
                description: "Ethically created diamonds and gemstones that are chemically identical to mined stones, offering the same brilliance without environmental impact.",
                features: ["Conflict-free", "Exceptional clarity", "Sustainable"]
              }
            ].map((material, i) => (
              <div key={i} className={`animate-reveal-delay-${i} bg-white p-8`}>
                <h3 className="text-display text-xl mb-4">{material.title}</h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {material.description}
                </p>
                <ul className="space-y-2">
                  {material.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-sm text-text-secondary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" className="mr-3">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                        <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                        <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-standard bg-white">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-display text-4xl lg:text-5xl mb-6">Meet Our Founders</h2>
            <div className="divider"></div>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              The visionaries behind Anviy's commitment to exceptional jewelry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                name: "Arjun Patel",
                role: "Co-Founder & CEO",
                background: "Business Leadership",
                vision: "Building a sustainable luxury brand that makes fine jewelry accessible to modern consumers",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
              },
              {
                name: "Kavya Reddy",
                role: "Co-Founder & Creative Director",
                background: "Design & Innovation",
                vision: "Creating timeless pieces that celebrate individual style while honoring traditional craftsmanship",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
              }
            ].map((founder, i) => (
              <div key={i} className={`animate-reveal-delay-${i} text-center`}>
                <div className="mb-8">
                  <Image 
                    src={founder.image}
                    alt={founder.name}
                    width={250}
                    height={250}
                    className="w-64 h-64 object-cover mx-auto rounded-full"
                  />
                </div>
                <h3 className="text-display text-2xl mb-3">{founder.name}</h3>
                <div className="text-small-caps text-xs text-text-muted mb-4 tracking-widest">
                  {founder.role}
                </div>
                <div className="text-accent font-medium mb-6">
                  {founder.background}
                </div>
                <p className="text-text-secondary leading-relaxed max-w-md mx-auto">
                  "{founder.vision}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-compact bg-primary text-white">
        <div className="container-page">
          <div className="grid-editorial">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
              <div className="animate-reveal">
                <h2 className="text-display text-3xl mb-6">Experience Anviy</h2>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Discover pieces that tell your story and celebrate your unique style.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/shop" className="btn-accent">
                    Explore Collection
                  </Link>
                  <Link href="/favorites" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-primary">
                    View Favorites
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
