'use client';
import Link from 'next/link';
import { products } from '@/data/products';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { usePagination } from '../hooks/usePagination';

export default function ShopContent() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const filtered = tag ? products.filter(p => p.tags.includes(tag)) : products;
  const categories = ['all','necklace','earrings','bracelet','ring','mens','mangalsutra'];
  
  const PRODUCTS_PER_PAGE = 12;
  const {
    currentPage,
    totalPages,
    currentItems: currentProducts,
    goToPage
  } = usePagination({
    items: filtered,
    itemsPerPage: PRODUCTS_PER_PAGE,
    initialPage: 1,
    scrollToTop: true,
    scrollTargetId: 'shop-products-grid'
  });
  
  return (
    <div className="container-page section-standard">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-display text-4xl lg:text-5xl mb-6">Our Collection</h1>
        <div className="divider"></div>
        <p className="text-xl text-text-secondary max-w-2xl">
          Discover handcrafted pieces that embody timeless elegance and contemporary sophistication.
        </p>
      </div>
      
      {/* Category Filters */}
      <div className="mb-12">
        <div className="text-small-caps text-xs text-text-muted mb-6 tracking-widest">
          FILTER BY CATEGORY
        </div>
        <div className="flex flex-wrap gap-4">
          {categories.map(c => (
            <Link 
              key={c} 
              href={c==='all' ? '/shop' : `/shop?tag=${c}`} 
              className={`px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ${
                tag===c || (c==='all' && !tag) 
                  ? 'bg-primary text-white' 
                  : 'border border-border hover:border-primary hover:text-primary'
              }`}
            >
              {c[0].toUpperCase()+c.slice(1)}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-text-secondary mb-2 sm:mb-0">
            Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, filtered.length)} of {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            {tag && (
              <span className="text-accent"> in {tag}</span>
            )}
          </p>
          {totalPages > 1 && (
            <div className="text-sm text-text-muted">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>
      </div>
      
      {/* Products Grid */}
      <div id="shop-products-grid" className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
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
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-display text-2xl mb-4">No pieces found</h3>
          <p className="text-text-secondary mb-8">
            We couldn't find any pieces in the {tag} category.
          </p>
          <Link href="/shop" className="btn-primary">
            View All Pieces
          </Link>
        </div>
      )}
    </div>
  );
}
