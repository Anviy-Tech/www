import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import FAQSection from './components/FAQSection';
import ProductCard from './components/ProductCard';
import HeroCarousel from './components/HeroCarousel';
import MovingTextBanner from './components/MovingTextBanner';

export default function HomePage() {
  return (
    <main>
      {/* Modern Hero Carousel */}
      <HeroCarousel />
      
      {/* Moving Text Banner */}
      <MovingTextBanner />

      {/* Philosophy Section */}
      <section className="section-standard bg-white">
        <div className="container-page">
          <div className="grid-editorial">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
              <div className="animate-reveal">
                <h2 className="text-display text-4xl lg:text-5xl mb-8">
                  Where <span className="text-serif">artistry</span> meets precision
                </h2>
                <div className="divider"></div>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Our atelier combines traditional craftsmanship with contemporary design philosophy. 
                  Each piece undergoes meticulous selection of materials and rigorous quality control 
                  to ensure lasting beauty and comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Product Grid */}
      <section className="section-standard">
        <div className="container-page">
          <div className="animate-reveal mb-16">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-display text-3xl">Curated Selection</h2>
              <Link href="/shop" className="btn-minimal">View All Pieces</Link>
            </div>
            <div className="text-small-caps text-xs text-gray-500 tracking-widest">
              HANDPICKED BY OUR ARTISANS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.slice(0, 6).map((product, i) => (
              <ProductCard 
                key={product.id}
                product={product}
                className={`animate-reveal-delay-${Math.min(i, 3)}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="section-standard bg-gray-50">
        <div className="container-page">
          <div className="grid-editorial">
            <div className="col-span-12 lg:col-span-5">
              <div className="animate-reveal">
                <Image 
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop"
                  alt="Craftsmanship detail"
                  width={600}
                  height={800}
                  className="w-full h-[60vh] object-cover"
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 flex items-center">
              <div className="animate-reveal-delay-2">
                <div className="text-small-caps text-xs text-gray-500 mb-6 tracking-widest">
                  OUR PROCESS
                </div>
                <h2 className="text-display text-4xl mb-8">
                  Meticulous <span className="text-serif">attention</span> to detail
                </h2>
                <div className="space-y-6 text-gray-600">
                  <p className="leading-relaxed">
                    Every piece begins with carefully selected precious metals and ethically sourced stones. 
                    Our master craftspeople employ time-honored techniques refined over generations.
                  </p>
                  <p className="leading-relaxed">
                    From initial sketches to final polish, each creation undergoes numerous quality checks 
                    to ensure it meets our exacting standards of beauty and durability.
                  </p>
                </div>
                <div className="mt-8">
                  <Link href="/about" className="btn-minimal">Learn More About Our Process</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-compact bg-primary text-white">
        <div className="container-page">
          <div className="grid-editorial">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
              <div className="animate-reveal">
                <h2 className="text-display text-3xl mb-4">Stay Connected</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Be the first to discover new collections and exclusive pieces.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="input-minimal bg-transparent border-white/30 text-white placeholder-gray-400 flex-1"
                  />
                  <button className="btn-accent">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </main>
  );
}


