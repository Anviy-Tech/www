'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types/api';
import ProductCard from '../../components/ProductCard';
import Pagination from '../../components/Pagination';
import { usePagination } from '../../hooks/usePagination';

export default function BestSellerPage() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const PRODUCTS_PER_PAGE = 8;

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getProducts({
          page: 1,
          limit: 20, // Get more products for pagination
          sort: 'createdAt',
          order: 'desc'
        });
        // Filter products with good stock as "best sellers"
        const filtered = response.products.filter(p => p.stock > 10);
        setBestSellers(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch best sellers');
        console.error('Error fetching best sellers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  const {
    currentPage,
    totalPages,
    currentItems: currentProducts,
    goToPage
  } = usePagination({
    items: bestSellers,
    itemsPerPage: PRODUCTS_PER_PAGE,
    initialPage: 1,
    scrollToTop: true,
    scrollTargetId: 'best-sellers-grid'
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
            <span className="text-text-primary">Best Sellers</span>
          </nav>
          
          <h1 className="text-display text-4xl lg:text-5xl mb-6">Best Sellers</h1>
          <div className="divider"></div>
          <p className="text-xl text-text-secondary max-w-2xl">
            Our most popular pieces loved by customers worldwide
          </p>
        </div>
        
        {/* Results Count */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-text-secondary mb-2 sm:mb-0">
              Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, bestSellers.length)} of {bestSellers.length} {bestSellers.length === 1 ? 'piece' : 'pieces'}
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
          <div id="best-sellers-grid" className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
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
            <p className="text-gray-500 mb-4">Failed to load best sellers</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-minimal"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div id="best-sellers-grid" className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
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
        {bestSellers.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-display text-2xl mb-4">No best sellers found</h3>
            <p className="text-text-secondary mb-8">
              Check back later for our popular pieces.
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
