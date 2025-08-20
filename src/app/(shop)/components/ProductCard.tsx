"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/store/cart';
import { useFavorites } from '@/store/favorites';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const add = useCart(s => s.add);
  const { addItem: addToFavorites, removeItem: removeFromFavorites, isFavorite } = useFavorites();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const isProductFavorite = isFavorite(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug
    }, 1);
    
    // Brief loading state for better UX
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 600);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug
      });
    }
  };

  return (
    <div className={`product-card group relative ${className}`}>
      {/* Product Link Container */}
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="product-image mb-6 relative overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          
          {/* Overlay with Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-3">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="btn-primary text-xs py-3 px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 disabled:opacity-50"
              >
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              
              {/* Quick View Button */}
              <button className="btn-secondary text-xs py-3 px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                Quick View
              </button>
            </div>
          </div>

          {/* Favorite Heart - Top Right */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill={isProductFavorite ? "#c9a96e" : "none"} 
              stroke={isProductFavorite ? "#c9a96e" : "#6b6b6b"} 
              strokeWidth="1.5"
              className="transition-colors duration-200"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          {/* Stock Indicator */}
          {product.stock < 10 && (
            <div className="absolute top-4 left-4 bg-accent text-white text-xs px-3 py-1 font-medium">
              Only {product.stock} left
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-3">
          {/* Category */}
          <div className="text-small-caps text-xs text-text-muted tracking-widest">
            {product.tags[0]?.toUpperCase() || 'JEWELRY'}
          </div>
          
          {/* Name */}
          <h3 className="text-display text-xl leading-tight group-hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
            {product.description}
          </p>
          
          {/* Price */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-accent font-medium text-lg">
              ₹{product.price.toLocaleString()}
            </span>
            
            {/* Rating Stars (placeholder) */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#c9a96e" className="opacity-80">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
              <span className="text-xs text-text-muted ml-1">(4.8)</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
