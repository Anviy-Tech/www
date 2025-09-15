"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/store/cart';
import { useFavorites } from '@/store/favorites';
import { PLACEHOLDER_IMAGES, getFirstImage } from '@/lib/imageUtils';
import { Product } from '@/types/api';
import { TIMING, ANIMATION_DELAYS } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const add = useCart(s => s.add);
  const { addItem: addToFavorites, removeItem: removeFromFavorites, isFavorite } = useFavorites();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const isProductFavorite = isFavorite(product._id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    
    try {
      add({
        id: product._id,
        name: product.name,
        price: product.price,
        image: getFirstImage(product.images),
        slug: product._id // Using _id as slug for now
      }, 1);
      
      // Success feedback
      // Note: You can integrate with toast system here
      console.log('Added to cart successfully');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Error feedback
    } finally {
      // Brief loading state for better UX
      setTimeout(() => {
        setIsAddingToCart(false);
      }, TIMING.CART_ADD_DELAY);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProductFavorite) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites({
        id: product._id,
        name: product.name,
        price: product.price,
        image: getFirstImage(product.images),
        slug: product._id // Using _id as slug for now
      });
    }
  };

  return (
    <article className={`group relative bg-white hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1 ${className}`}>
      <Link href={`/product/${product._id}`} className="block h-full">
        {/* Image Container with Modern Aspect Ratio */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Main Product Image */}
          <div className="aspect-square relative">
            <Image 
              src={imageError ? PLACEHOLDER_IMAGES.productCard : getFirstImage(product.images)} 
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-all duration-700 group-hover:scale-110"
              priority={false}
              onError={() => setImageError(true)}
            />
            
            {/* Modern Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Mobile-First Actions Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                {/* Add to Cart Button - Primary Action */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="px-4 py-2.5 sm:px-6 sm:py-3 bg-white/95 hover:bg-white text-primary font-medium text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm"
                  aria-label={isAddingToCart ? 'Adding to cart...' : `Add ${product.name} to cart`}
                  aria-busy={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border border-gray-400 border-t-primary rounded-full animate-spin" />
                      <span className="hidden sm:inline">Adding...</span>
                    </div>
                  ) : (
                    <span>Add to Cart</span>
                  )}
                </button>
                
                {/* Quick View Button - Secondary Action */}
                <button 
                  className="px-4 py-2.5 sm:px-6 sm:py-3 bg-primary/90 hover:bg-primary text-white font-medium text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm"
                  aria-label={`Quick view ${product.name}`}
                >
                  <span className="hidden sm:inline">Quick View</span>
                  <span className="sm:hidden">View</span>
                </button>
              </div>
            </div>

            {/* Stock Badge - Modern Design */}
            {!product.inStock && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1.5 uppercase tracking-wide shadow-lg">
                Out of Stock
              </div>
            )}
            {product.inStock && product.stock < 10 && (
              <div className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-2.5 py-1.5 uppercase tracking-wide shadow-lg">
                <span className="hidden sm:inline">Only {product.stock} left</span>
                <span className="sm:hidden">{product.stock} left</span>
              </div>
            )}

            {/* Favorite Button - Enhanced Mobile */}
            <button
              onClick={handleToggleFavorite}
              className="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 bg-white/95 hover:bg-white backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label={isProductFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill={isProductFavorite ? "#c9a96e" : "none"} 
                stroke={isProductFavorite ? "#c9a96e" : "#6b6b6b"} 
                strokeWidth="1.5"
                className="transition-all duration-300"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Product Information - Refined Typography */}
        <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
          {/* Category Tag */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-muted uppercase tracking-widest">
              {product.category?.name || 'Jewelry'}
            </span>
            {/* Rating - Compact Mobile */}
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#c9a96e" className="opacity-90">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-xs text-text-muted font-medium hidden sm:inline">(4.8)</span>
            </div>
          </div>
          
          {/* Product Name - Responsive Typography */}
          <h3 className="text-display text-lg sm:text-xl leading-tight group-hover:text-accent transition-colors duration-300 font-medium">
            {product.name}
          </h3>
          
          {/* Description - Mobile Optimized */}
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 hidden sm:block">
            {product.description}
          </p>
          
          {/* Price Section - Enhanced Layout */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <span className="text-accent font-semibold text-lg sm:text-xl">
                ₹{product.price.toLocaleString()}
              </span>
              {/* Stock Status for Mobile */}
              <span className="text-xs text-green-600 font-medium sm:hidden">
                {product.inStock ? (product.stock > 10 ? 'In Stock' : `${product.stock} left`) : 'Out of Stock'}
              </span>
            </div>
            
            {/* Quick Add Button for Mobile */}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="sm:hidden w-8 h-8 bg-accent hover:bg-accent-dark text-white flex items-center justify-center transition-all duration-300 disabled:opacity-50"
              aria-label="Quick add to cart"
            >
              {isAddingToCart ? (
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
