"use client";
import Link from 'next/link';
import { useFavorites } from '@/store/favorites';
import ProductCard from '../components/ProductCard';
import { products } from '@/data/products';

export default function FavoritesPage() {
  const { items: favoriteItems, clearFavorites } = useFavorites();
  
  // Get full product data for favorites
  const favoriteProducts = favoriteItems.map(favItem => 
    products.find(p => p.id === favItem.id)
  ).filter(Boolean) as typeof products;

  return (
    <div className="container-page section-standard">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-display text-4xl lg:text-5xl mb-6">Your Favorites</h1>
        <div className="divider"></div>
        <div className="flex items-center justify-between">
          <p className="text-xl text-text-secondary">
            {favoriteItems.length} {favoriteItems.length === 1 ? 'piece' : 'pieces'} you love
          </p>
          {favoriteItems.length > 0 && (
            <button 
              onClick={clearFavorites}
              className="btn-minimal text-sm"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      
      {/* Favorites Grid */}
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
          {favoriteProducts.map((product, i) => (
            <ProductCard 
              key={product.id}
              product={product}
              className={`animate-reveal-delay-${Math.min(i % 4, 3)}`}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20">
          <div className="mb-8">
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#c9a96e" 
              strokeWidth="1" 
              className="mx-auto opacity-50"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h3 className="text-display text-2xl mb-4">No favorites yet</h3>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Start building your wishlist by adding pieces you love. 
            Click the heart icon on any product to save it here.
          </p>
          <Link href="/shop" className="btn-primary">
            Discover Our Collection
          </Link>
        </div>
      )}
    </div>
  );
}
