'use client';
import Link from 'next/link';
import { products } from '@/data/products';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../components/ProductCard';

export default function ShopContent() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const filtered = tag ? products.filter(p => p.tags.includes(tag)) : products;
  const categories = ['all','necklace','earrings','bracelet','ring','mens','mangalsutra'];
  
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
        <p className="text-text-secondary">
          Showing {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          {tag && (
            <span className="text-accent"> in {tag}</span>
          )}
        </p>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
        {filtered.map((product, i) => (
          <ProductCard 
            key={product.id}
            product={product}
            className={`animate-reveal-delay-${Math.min(i % 4, 3)}`}
          />
        ))}
      </div>
      
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
