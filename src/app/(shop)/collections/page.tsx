'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { categoriesAPI, productsAPI } from '@/lib/api';
import { Category, Product } from '@/types/api';
import { getFirstImage } from '@/lib/imageUtils';

interface CollectionWithStats extends Category {
  productCount: number;
  featured?: boolean;
  sampleProducts: Product[];
}

const FALLBACK_COLLECTION_IMAGE = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop&q=90&auto=format';

const SPECIAL_COLLECTIONS = [
  {
    id: 'new',
    title: 'New Arrivals',
    description: 'Fresh designs just added to our collection',
    slug: 'new-arrivals',
    href: '/collections/new',
    featured: true,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=600&fit=crop&q=90&auto=format'
  },
  {
    id: 'best-seller',
    title: 'Best Sellers',
    description: 'Our most popular pieces loved by customers worldwide',
    slug: 'best-sellers',
    href: '/collections/best-seller',
    featured: true,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop&q=90&auto=format'
  }
];

export default function CollectionsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [collectionsWithStats, setCollectionsWithStats] = useState<CollectionWithStats[]>([]);
  const [specialCollections, setSpecialCollections] = useState<any[]>(SPECIAL_COLLECTIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollectionsData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch categories
        const categoriesResponse = await categoriesAPI.getCategories({ limit: 20 });
        const fetchedCategories = categoriesResponse.categories;
        setCategories(fetchedCategories);

        // Fetch product counts and sample products for each category
        const collectionsWithStatsPromises = fetchedCategories.map(async (category) => {
          try {
            const productsResponse = await productsAPI.getProducts({
              category: category._id,
              limit: 3 // Get 3 sample products for preview
            });
            
            return {
              ...category,
              productCount: productsResponse.pagination?.total || productsResponse.products.length,
              sampleProducts: productsResponse.products.slice(0, 3),
              featured: false
            };
          } catch (err) {
            console.error(`Error fetching products for category ${category.name}:`, err);
            return {
              ...category,
              productCount: 0,
              sampleProducts: [],
              featured: false
            };
          }
        });

        const collectionsStats = await Promise.all(collectionsWithStatsPromises);
        setCollectionsWithStats(collectionsStats);

        // Fetch product counts for special collections
        const updatedSpecialCollections = await Promise.all(
          SPECIAL_COLLECTIONS.map(async (collection) => {
            try {
              let productsResponse;
              if (collection.id === 'new') {
                // Get newest products
                productsResponse = await productsAPI.getProducts({
                  sort: 'createdAt',
                  order: 'desc',
                  limit: 3
                });
              } else if (collection.id === 'best-seller') {
                // Get products with high stock as best sellers
                productsResponse = await productsAPI.getProducts({
                  sort: 'stock',
                  order: 'desc',
                  limit: 3
                });
              }

              return {
                ...collection,
                productCount: productsResponse?.pagination?.total || productsResponse?.products.length || 0,
                sampleProducts: productsResponse?.products.slice(0, 3) || []
              };
            } catch (err) {
              console.error(`Error fetching products for ${collection.title}:`, err);
              return {
                ...collection,
                productCount: 0,
                sampleProducts: []
              };
            }
          })
        );

        setSpecialCollections(updatedSpecialCollections);

      } catch (err) {
        console.error('Error fetching collections data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load collections');
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionsData();
  }, []);

  const getCollectionImage = (collection: CollectionWithStats | any) => {
    // Use category image if available
    if (collection.image) return collection.image;
    
    // Use first sample product image if available
    if (collection.sampleProducts?.length > 0) {
      const firstProductImage = getFirstImage(collection.sampleProducts[0].images);
      if (firstProductImage) return firstProductImage;
    }
    
    // Use fallback image
    return FALLBACK_COLLECTION_IMAGE;
  };

  const featuredCollections = specialCollections.filter(c => c.featured);
  const regularCollections = collectionsWithStats.filter(c => !c.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary">
        <div className="container-page section-standard">
          {/* Header */}
          <div className="mb-16">
            <nav className="text-sm text-text-muted mb-6">
              <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-text-primary">Collections</span>
            </nav>
            
            <h1 className="text-display text-4xl lg:text-5xl mb-6">Our Collections</h1>
            <div className="divider"></div>
            <p className="text-xl text-text-secondary max-w-2xl">
              Discover our curated collections of handcrafted jewelry, each piece designed with purpose and passion
            </p>
          </div>

          {/* Loading State */}
          <div className="space-y-20">
            {/* Featured Collections Loading */}
            <section>
              <h2 className="text-display text-2xl lg:text-3xl mb-8">Featured Collections</h2>
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-[4/3] rounded-lg mb-4"></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Categories Loading */}
            <section>
              <h2 className="text-display text-2xl lg:text-3xl mb-8">Shop by Category</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary">
        <div className="container-page section-standard">
          <div className="text-center py-20">
            <h2 className="text-display text-2xl mb-4">Oops! Something went wrong</h2>
            <p className="text-text-secondary mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container-page section-standard">
        {/* Header */}
        <div className="mb-16">
          <nav className="text-sm text-text-muted mb-6">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">Collections</span>
          </nav>
          
          <h1 className="text-display text-4xl lg:text-5xl mb-6">Our Collections</h1>
          <div className="divider"></div>
          <p className="text-xl text-text-secondary max-w-2xl">
            Discover our curated collections of handcrafted jewelry, each piece designed with purpose and passion
          </p>
        </div>

        {/* Featured Collections */}
        <section className="mb-20">
          <h2 className="text-display text-2xl lg:text-3xl mb-8">Featured Collections</h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {featuredCollections.map((collection, index) => (
              <Link
                key={collection.id}
                href={collection.href}
                className={`group relative overflow-hidden bg-white transition-all duration-700 hover:shadow-2xl animate-reveal-delay-${index}`}
                style={{ borderRadius: '12px' }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={getCollectionImage(collection)}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="text-white">
                    <h3 className="text-display text-2xl lg:text-3xl mb-3 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                      {collection.title}
                    </h3>
                    <p className="text-white/90 mb-2 leading-relaxed transform transition-all duration-500 delay-100 group-hover:translate-y-[-4px]">
                      {collection.description}
                    </p>
                    {collection.productCount > 0 && (
                      <p className="text-white/70 text-sm mb-4 transform transition-all duration-500 delay-150 group-hover:translate-y-[-4px]">
                        {collection.productCount} {collection.productCount === 1 ? 'piece' : 'pieces'} available
                      </p>
                    )}
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                      <span>Explore Collection</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Collections Grid */}
        <section>
          <h2 className="text-display text-2xl lg:text-3xl mb-8">Shop by Category</h2>
          {regularCollections.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {regularCollections.map((collection, index) => (
                <Link
                  key={collection._id}
                  href={`/collections/${collection.slug}`}
                  className={`group relative overflow-hidden bg-white transition-all duration-500 hover:shadow-xl animate-reveal-delay-${index}`}
                  style={{ borderRadius: '8px' }}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={getCollectionImage(collection)}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
                    <div className="text-white">
                      <h3 className="text-display text-lg lg:text-xl mb-1 transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                        {collection.name}
                      </h3>
                      {collection.description && (
                        <p className="text-white/80 text-sm mb-1 hidden sm:block transform transition-all duration-300 delay-75 group-hover:translate-y-[-2px]">
                          {collection.description}
                        </p>
                      )}
                    <p className="text-white/70 text-xs transform transition-all duration-300 delay-100 group-hover:translate-y-[-2px]">
                      {collection.productCount} {collection.productCount === 1 ? 'piece' : 'pieces'}
                    </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-display text-xl mb-4">No categories found</h3>
              <p className="text-text-secondary mb-6">
                We're working on adding more collections. Check back soon!
              </p>
              <Link href="/shop" className="btn-primary">
                View All Products
              </Link>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center">
          <div className="bg-primary text-white p-12 lg:p-16" style={{ borderRadius: '12px' }}>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-display text-3xl lg:text-4xl mb-6">Can't Find What You're Looking For?</h2>
              <p className="text-white/90 mb-8 text-lg leading-relaxed">
                Explore our complete catalog or get in touch with our team for personalized recommendations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shop" className="btn-accent bg-white text-primary hover:bg-gray-100">
                  View All Products
                </Link>
                <Link href="/contact" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
