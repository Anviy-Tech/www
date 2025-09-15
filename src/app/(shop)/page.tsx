'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types/api';
import FAQSection from './components/FAQSection';
import ProductCard from './components/ProductCard';
import HeroCarousel from './components/HeroCarousel';
import MovingTextBanner from './components/MovingTextBanner';
import Pagination from './components/Pagination';
import { usePagination } from './hooks/usePagination';
import FeaturedCollections from './components/FeaturedCollections';
import CustomerTestimonials from './components/CustomerTestimonials';
import InstagramFeed from './components/InstagramFeed';
import SustainabilitySection from './components/SustainabilitySection';
import GiftFinder from './components/GiftFinder';
import VideoShowcase from './components/VideoShowcase';
import OurStory from './components/OurStory';
import EveryPieceStory from './components/EveryPieceStory';
import { PAGINATION } from '@/lib/constants';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getProducts({
          page: 1,
          limit: 20, // Get more products for the homepage
          sort: 'createdAt',
          order: 'desc'
        });
        setProducts(response.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const {
    currentPage,
    totalPages,
    currentItems: currentProducts,
    goToPage
  } = usePagination({
    items: products,
    itemsPerPage: PAGINATION.DEFAULT_PAGE_SIZE,
    initialPage: 1,
    scrollToTop: true,
    scrollTargetId: 'products-section'
  });

  return (
    <main>
      {/* Modern Hero Carousel */}
      <HeroCarousel />
      
      {/* Moving Text Banner */}
      <MovingTextBanner />

      {/* Our Story Section */}
      <OurStory />

      {/* Featured Collections Section */}
      <FeaturedCollections />

      {/* Video Showcase Section */}
      <VideoShowcase />

      {/* Every Piece Tells a Story Section */}
      <EveryPieceStory />

      {/* Editorial Product Grid */}
      <section id="products-section" className="section-standard">
        <div className="container-page">
          <div className="animate-reveal mb-16">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-display text-3xl">Curated Selection</h2>
              <Link href="/shop" className="btn-minimal">View All Pieces</Link>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-small-caps text-xs text-gray-500 tracking-widest mb-2 sm:mb-0">
                HANDPICKED BY OUR ARTISANS
              </div>
              <div className="text-sm text-text-secondary">
                Showing {((currentPage - 1) * PAGINATION.DEFAULT_PAGE_SIZE) + 1}-{Math.min(currentPage * PAGINATION.DEFAULT_PAGE_SIZE, products.length)} of {products.length} pieces
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Failed to load products</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-minimal"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-12">
              {currentProducts.map((product, i) => (
                <ProductCard 
                  key={product._id}
                  product={product}
                  className={`animate-reveal-delay-${Math.min(i % 4, 3)}`}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                className=""
              />
            </div>
          )}
        </div>
      </section>

      {/* Gift Finder Section */}
      <GiftFinder />

      {/* Craftsmanship Section */}
      <section className="section-standard bg-gray-50">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="animate-reveal">
                <Image 
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop"
                  alt="Craftsmanship detail"
                  width={600}
                  height={800}
                  className="w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-center">
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

      {/* Customer Testimonials Section */}
      <CustomerTestimonials />

      {/* Sustainability Section */}
      <SustainabilitySection />

      {/* Instagram Feed Section */}
      <InstagramFeed />

      {/* Newsletter Section */}
      <section className="section-compact bg-primary text-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-reveal">
              <h2 className="text-display text-2xl sm:text-3xl mb-4">Stay Connected</h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-sm sm:text-base">
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
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </main>
  );
}


