"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFavorites } from '@/store/favorites';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types/api';

export default function FavoritesPage() {
  const { items: favoriteItems, clearFavorites } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (favoriteItems.length === 0) {
        setFavoriteProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const products: Product[] = [];
        
        // Fetch each favorite product
        for (const favItem of favoriteItems) {
          try {
            const response = await productsAPI.getProduct(favItem.id);
            products.push(response.product);
          } catch (err) {
            console.error(`Failed to fetch product ${favItem.id}:`, err);
            // Continue with other products even if one fails
          }
        }
        
        setFavoriteProducts(products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch favorite products');
        console.error('Error fetching favorite products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favoriteItems]);

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
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
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
          <p className="text-gray-500 mb-4">Failed to load favorites</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-minimal"
          >
            Try Again
          </button>
        </div>
      ) : favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
          {favoriteProducts.map((product, i) => (
            <ProductCard 
              key={product._id}
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
