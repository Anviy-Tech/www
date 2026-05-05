'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { productsAPI, categoriesAPI } from '@/lib/api';
import { Product } from '@/types/api';
import ProductCard from '../../components/ProductCard';
import Pagination from '../../components/Pagination';
import { usePagination } from '../../hooks/usePagination';

export default function NecklacesPage() {
  const [necklaces, setNecklaces] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const PRODUCTS_PER_PAGE = 8;

  useEffect(() => {
    const fetchNecklaces = async () => {
      try {
        setLoading(true);
        
        // First try to get category by slug
        let categoryId = null;
        try {
          const categoryResponse = await categoriesAPI.getCategoryBySlug('necklaces');
          categoryId = categoryResponse.category._id;
        } catch (categoryErr) {
          console.warn('Category not found by slug, fetching all products');
        }

        // Fetch products with category filter if we found the category
        const response = await productsAPI.getProducts({
          page: 1,
          limit: 20,
          ...(categoryId && { category: categoryId })
        });
        
        setNecklaces(response.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch necklaces');
        console.error('Error fetching necklaces:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNecklaces();
  }, []);

  const {
    currentPage,
    totalPages,
    currentItems: currentProducts,
    goToPage
  } = usePagination({
    items: necklaces,
    itemsPerPage: PRODUCTS_PER_PAGE,
    initialPage: 1,
    scrollToTop: true,
    scrollTargetId: 'necklaces-grid'
  });
  
  return (
    <div className="min-h-screen bg-secondary">
      <div className="container-page section-standard">
        {/* Header */}
        <div className="mb-16">
          <nav className="text-sm text-text-muted mb-6">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="hover:text-text-primary transition-colors">Collections</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">Necklaces</span>
          </nav>
          
          <h1 className="text-display text-4xl lg:text-5xl mb-6">Necklaces</h1>
          <div className="divider"></div>
          <p className="text-xl text-text-secondary max-w-2xl">
            Elegant necklaces to complement your unique style and make every moment special
          </p>
        </div>
        
        {/* Results Count */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-text-secondary mb-2 sm:mb-0">
              Showing {necklaces.length > 0 ? ((currentPage - 1) * PRODUCTS_PER_PAGE) + 1 : 0}-{Math.min(currentPage * PRODUCTS_PER_PAGE, necklaces.length)} of {necklaces.length} {necklaces.length === 1 ? 'piece' : 'pieces'}
            </p>
            {totalPages > 1 && (
              <div className="text-sm text-text-muted">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </div>
        </div>
        
        {/* Products Grid */}
        {loading ? (
          <div id="necklaces-grid" className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
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
            <p className="text-gray-500 mb-4">Failed to load necklaces</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-minimal"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div id="necklaces-grid" className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
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
        
        {/* No Results */}
        {necklaces.length === 0 && !loading && (
          <div className="text-center py-20">
            <h3 className="text-display text-2xl mb-4">No necklaces found</h3>
            <p className="text-text-secondary mb-8">
              Check back later for beautiful necklace designs.
            </p>
            <Link href="/shop" className="btn-primary">
              View All Pieces
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
