"use client";
import { useState } from 'react';
import { useCart } from '@/store/cart';
import { useFavorites } from '@/store/favorites';
import { Product } from '@/data/products';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const add = useCart(s => s.add);
  const { addItem: addToFavorites, removeItem: removeFromFavorites, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('One Size');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const isProductFavorite = isFavorite(product.id);
  const sizes = ['XS', 'S', 'M', 'L', 'One Size'];

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug
    }, quantity);
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 800);
  };

  const handleToggleFavorite = () => {
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
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span>Shop</span>
        <span className="mx-2">/</span>
        <span className="capitalize">{product.tags[0] || 'Jewelry'}</span>
        <span className="mx-2">/</span>
        <span className="text-text-primary">{product.name}</span>
      </nav>

      {/* Product Title & Price */}
      <div>
        <div className="text-small-caps text-xs text-text-muted mb-4 tracking-widest">
          {product.tags[0]?.toUpperCase() || 'JEWELRY'}
        </div>
        <h1 className="text-display text-4xl lg:text-5xl mb-6 leading-tight">
          {product.name}
        </h1>
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-3xl font-medium text-accent">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-text-muted line-through">
            ₹{(product.price * 1.2).toLocaleString()}
          </span>
          <span className="bg-accent text-white text-xs px-2 py-1 font-medium">
            17% OFF
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#c9a96e">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="text-sm text-text-secondary">(4.8)</span>
          <span className="text-sm text-text-muted">•</span>
          <span className="text-sm text-text-muted">127 reviews</span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <p className="text-lg text-text-secondary leading-relaxed">
          {product.description}
        </p>
        <p className="text-text-secondary leading-relaxed">
          Crafted with meticulous attention to detail, this exquisite piece embodies 
          timeless elegance. Made from premium 18K gold vermeil over sterling silver, 
          it features ethically sourced stones that catch the light beautifully.
        </p>
      </div>

      {/* Size Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">Size</span>
          <button className="text-sm text-accent hover:underline">Size Guide</button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 text-sm font-medium border transition-all duration-300 ${
                selectedSize === size
                  ? 'border-primary bg-primary text-white'
                  : 'border-border hover:border-primary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Stock */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">Quantity</span>
          <span className="text-sm text-text-muted">
            {product.stock} in stock
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-border">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"/>
              </svg>
            </button>
            <span className="px-4 py-3 min-w-[60px] text-center font-medium">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.stock === 0}
          className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAddingToCart ? 'Adding to Cart...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleToggleFavorite}
            className={`btn-secondary py-4 text-base flex items-center justify-center space-x-2 ${
              isProductFavorite ? 'bg-accent text-white border-accent' : ''
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isProductFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>{isProductFavorite ? 'Favorited' : 'Add to Favorites'}</span>
          </button>
          
          <button className="btn-secondary py-4 text-base flex items-center justify-center space-x-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16,6 12,2 8,6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4 pt-8 border-t border-border-light">
        <div className="flex items-center space-x-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
            <path d="M9 12l2 2 4-4"/>
            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
            <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
            <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
          </svg>
          <span className="text-sm">Lifetime warranty included</span>
        </div>
        <div className="flex items-center space-x-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
            <rect x="1" y="3" width="15" height="13"/>
            <polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          <span className="text-sm">Free shipping on orders over ₹2,000</span>
        </div>
        <div className="flex items-center space-x-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          <span className="text-sm">30-day easy returns</span>
        </div>
      </div>
    </div>
  );
}
