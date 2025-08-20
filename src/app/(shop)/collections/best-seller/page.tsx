'use client';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import ProductCard from '../../components/ProductCard';
import Pagination from '../../components/Pagination';
import { usePagination } from '../../hooks/usePagination';

export default function BestSellerPage() {
  // Show products with high stock as "best sellers"
  const bestSellers = products.filter(p => p.stock > 30);
  
  const PRODUCTS_PER_PAGE = 8;
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
        <div id="best-sellers-grid" className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
          {currentProducts.map((product, i) => (
            <ProductCard 
              key={product.id}
              product={product}
              className={`animate-reveal-delay-${Math.min(i % 4, 3)}`}
            />
          ))}
        </div>
        
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
