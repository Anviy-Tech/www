'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { productsAPI, categoriesAPI } from '@/lib/api';
import { Product, Category } from '@/types/api';
import ProductCard from './components/ProductCard';
import HeroCarousel from './components/HeroCarousel';
import MovingTextBanner from './components/MovingTextBanner';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [heroProducts, setHeroProducts] = useState<Product[]>([]);
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<(Category & { latestProduct?: Product | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [productsResponse, categoriesResponse, featuredResponse, newResponse, heroResponse] = await Promise.all([
          productsAPI.getProducts({
            page: 1,
            limit: 12,
            sort: 'createdAt',
            order: 'desc'
          }),
          categoriesAPI.getCategories({
            page: 1,
            limit: 8,
            sort: 'name',
            order: 'asc'
          }),
          productsAPI.getProducts({
            page: 1,
            limit: 8,
            sort: 'createdAt',
            order: 'desc'
          }),
          productsAPI.getProducts({
            page: 1,
            limit: 4,
            sort: 'createdAt',
            order: 'desc'
          }),
          // Hero products - Latest 4 products for carousel
          productsAPI.getProducts({
            page: 1,
            limit: 4,
            sort: 'createdAt',
            order: 'desc'
          })
        ]);

        setProducts(productsResponse.products);
        setCategories(categoriesResponse.categories);
        setFeaturedProducts(featuredResponse.products);
        setNewProducts(newResponse.products);
        setHeroProducts(heroResponse.products);

        // Fetch latest product for each category
        const categoriesWithLatestProducts = await Promise.all(
          categoriesResponse.categories.slice(0, 4).map(async (category) => {
            try {
              const categoryProducts = await productsAPI.getProductsByCategory(category._id, {
                page: 1,
                limit: 1,
                sort: 'createdAt',
                order: 'desc'
              });
              return {
                ...category,
                latestProduct: categoryProducts.products[0] || null
              };
            } catch {
              return {
                ...category,
                latestProduct: null
              };
            }
          })
        );

        setCategoriesWithProducts(categoriesWithLatestProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      {/* Hero Carousel - Now Dynamic */}
      <HeroCarousel products={heroProducts} loading={loading} />
      
      {/* Moving Text Banner */}
      <MovingTextBanner />

      {/* Featured Categories Section - Similar to Taahira's approach */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <div className="text-center mb-16">
            <div className="animate-reveal">
              <h2 className="text-display text-3xl md:text-4xl mb-4">Shop by Category</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover our curated collections designed for every occasion
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categoriesWithProducts.map((category, index) => (
                <Link
                  key={category._id}
                  href={`/shop?tag=${category._id}`}
                  className={`group text-center animate-reveal-delay-${index}`}
                >
                  <div className="aspect-square rounded-lg mb-4 overflow-hidden group-hover:shadow-lg transition-all duration-300 relative">
                    {category.image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={category.image}
                          alt={`${category.name} category`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            // Fallback to category icon on image error
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <span className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            Browse {category.name}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl text-gray-400 group-hover:text-accent transition-colors mb-2">
                            {/* Category icon based on name */}
                            {category.name.toLowerCase().includes('ring') ? '💍' :
                             category.name.toLowerCase().includes('necklace') ? '📿' :
                             category.name.toLowerCase().includes('earring') ? '👂' :
                             category.name.toLowerCase().includes('bracelet') ? '🔗' : '✨'}
                          </div>
                          <p className="text-xs text-gray-500 font-medium">Browse {category.name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-lg mb-2 group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {category.description}
                  </p>
                  {category.latestProduct && (
                    <p className="text-xs text-accent mt-1 font-medium">
                      From ₹{category.latestProduct.price.toLocaleString()}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/shop" className="btn-primary">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Section - Like Taahira's "Fresh Drops" */}
      <section className="py-20 bg-gray-50">
        <div className="container-page">
          <div className="flex items-center justify-between mb-12">
            <div className="animate-reveal">
              <h2 className="text-display text-3xl md:text-4xl mb-2">Fresh Drops Just In ✨</h2>
              <p className="text-gray-600">Because your jewelry box deserves something new.</p>
            </div>
            <Link href="/collections/new" className="btn-minimal hidden md:inline-flex">
              View All New
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product, i) => (
                <ProductCard 
                  key={product._id}
                  product={product}
                  className={`animate-reveal-delay-${Math.min(i, 3)}`}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12 md:hidden">
            <Link href="/collections/new" className="btn-primary">
              View All New
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <div className="flex items-center justify-between mb-12">
            <div className="animate-reveal">
              <h2 className="text-display text-3xl md:text-4xl mb-2">Customer Favorites</h2>
              <p className="text-gray-600">Pieces our customers can't get enough of.</p>
            </div>
            <Link href="/collections/best-seller" className="btn-minimal hidden md:inline-flex">
              View All Best Sellers
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, i) => (
                <ProductCard 
                  key={product._id}
                  product={product}
                  className={`animate-reveal-delay-${Math.min(i % 4, 3)}`}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12 md:hidden">
            <Link href="/collections/best-seller" className="btn-primary">
              View All Best Sellers
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section - Simple and Clean */}
      <section className="py-20 bg-gray-50">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-reveal">
              <Image 
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop"
                alt="Craftsmanship detail"
                width={600}
                height={800}
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg"
              />
            </div>
            <div className="animate-reveal-delay-1">
              <h2 className="text-display text-3xl md:text-4xl mb-6">
                Crafted with <span className="text-accent">Passion</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Every piece begins with carefully selected precious metals and ethically sourced stones. 
                Our master craftspeople employ time-honored techniques refined over generations.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From initial sketches to final polish, each creation undergoes numerous quality checks 
                to ensure it meets our exacting standards of beauty and durability.
              </p>
              <Link href="/about" className="btn-primary">
                Learn Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}


