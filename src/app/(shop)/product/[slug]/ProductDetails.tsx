"use client";
import React, { useState } from 'react';
import { useCart } from '@/store/cart';
import { useFavorites } from '@/store/favorites';
import { Product } from '@/types/api';
import { PLACEHOLDER_IMAGES, getFirstImage } from '@/lib/imageUtils';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const addToCart = useCart(s => s.addItem);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCustomization, setSelectedCustomization] = useState<{[key: string]: any}>({});
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  
  const isProductFavorite = isFavorite(product._id);
  
  // Dynamic size options based on product type and dimensions
  const sizes = React.useMemo(() => {
    const productCategory = 'jewelry'; // Default category
    const dimensions = product.jewelryAttributes?.dimensions;
    
    if (productCategory.includes('ring')) {
      // Ring sizes
      const ringSizes = ['5', '6', '7', '8', '9', '10', '11', '12'];
      if (dimensions?.ringSize) {
        return [dimensions.ringSize.toString()];
      }
      return ringSizes;
    } else if (productCategory.includes('necklace') || productCategory.includes('chain')) {
      // Chain lengths
      const chainLengths = ['16"', '18"', '20"', '22"', '24"'];
      if (dimensions?.chainLength) {
        return [`${dimensions.chainLength}"`];
      }
      return chainLengths;
    } else {
      // Default to one size for earrings, bracelets, etc.
      return ['One Size'];
    }
  }, [product.category, product.jewelryAttributes?.dimensions]);

  // Set default size when sizes change
  React.useEffect(() => {
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes, selectedSize]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    console.log('🛒 Add to cart clicked (ProductDetails):', product.name, 'quantity:', quantity, product);
    
    try {
      // The addItem function expects a Product object and quantity
      await addToCart(product, quantity);
      
      // Show success feedback
      console.log('✅ Successfully added to cart (ProductDetails):', product.name, 'quantity:', quantity);
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 800);
    } catch (error) {
      console.error('❌ Failed to add to cart (ProductDetails):', error);
      setIsAddingToCart(false);
      // You might want to show an error toast here
    }
  };

  const handleToggleFavorite = () => {
    if (isProductFavorite) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product);
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
        <span className="capitalize">
          {'Jewelry'}
        </span>
        <span className="mx-2">/</span>
        <span className="text-text-primary">{product.name}</span>
      </nav>

      {/* Product Title & Price */}
      <div>
        <div className="text-small-caps text-xs text-text-muted mb-4 tracking-widest">
          {'JEWELRY'}
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
      </div>

      {/* Size Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">Size</span>
          <button 
            onClick={() => setShowSizeGuide(true)}
            className="text-sm text-accent hover:underline flex items-center space-x-1"
          >
            <span>Size Guide</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>
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

      {/* Customization Options */}
      {product.jewelryAttributes?.customizationOptions && (
        <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-text-primary">Customization Options</h3>
          
          {/* Metal Choice */}
          {product.jewelryAttributes.customizationOptions.metalChoice && (
            <div className="space-y-3">
              <span className="text-sm font-medium text-text-primary">Metal Type</span>
              <div className="grid grid-cols-2 gap-2">
                {['Gold', 'Silver', 'Rose Gold', 'White Gold'].map((metal) => (
                  <button
                    key={metal}
                    onClick={() => setSelectedCustomization(prev => ({ ...prev, metal }))}
                    className={`py-2 px-4 text-sm border transition-all duration-300 ${
                      selectedCustomization.metal === metal
                        ? 'border-accent bg-accent text-white'
                        : 'border-border hover:border-accent'
                    }`}
                  >
                    {metal}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stone Choice */}
          {product.jewelryAttributes.customizationOptions.stoneChoice && (
            <div className="space-y-3">
              <span className="text-sm font-medium text-text-primary">Stone Type</span>
              <div className="grid grid-cols-2 gap-2">
                {['Diamond', 'Ruby', 'Sapphire', 'Emerald'].map((stone) => (
                  <button
                    key={stone}
                    onClick={() => setSelectedCustomization(prev => ({ ...prev, stone }))}
                    className={`py-2 px-4 text-sm border transition-all duration-300 ${
                      selectedCustomization.stone === stone
                        ? 'border-accent bg-accent text-white'
                        : 'border-border hover:border-accent'
                    }`}
                  >
                    {stone}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Engraving */}
          {product.jewelryAttributes.customizationOptions.engraving && (
            <div className="space-y-3">
              <span className="text-sm font-medium text-text-primary">Engraving</span>
              <input
                type="text"
                placeholder="Enter text for engraving (max 20 characters)"
                maxLength={20}
                onChange={(e) => setSelectedCustomization(prev => ({ ...prev, engraving: e.target.value }))}
                className="w-full p-3 border border-border rounded-md focus:border-accent focus:outline-none"
              />
              <p className="text-xs text-text-muted">Additional charges may apply for engraving</p>
            </div>
          )}
        </div>
      )}

      {/* Material & Craftsmanship - Inspired by Taahira */}
      {product.jewelryAttributes && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#f8f6f3] to-white border border-[#e5ddd5] rounded-2xl p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#c9a96e] to-[#916849] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2c2c2c]">Material & Craftsmanship</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {product.jewelryAttributes.metalType && (
                  <div className="flex items-center justify-between py-3 border-b border-[#e5ddd5]/50">
                    <span className="text-[#666] font-medium">Metal Type</span>
                    <span className="text-[#2c2c2c] font-semibold bg-[#c9a96e]/10 px-3 py-1 rounded-full text-sm">
                      {product.jewelryAttributes.metalType}
                    </span>
                  </div>
                )}
                
                {product.jewelryAttributes.gemstoneDetails?.type && (
                  <div className="flex items-center justify-between py-3 border-b border-[#e5ddd5]/50">
                    <span className="text-[#666] font-medium">Gemstone</span>
                    <span className="text-[#2c2c2c] font-semibold bg-[#c9a96e]/10 px-3 py-1 rounded-full text-sm">
                      {product.jewelryAttributes.gemstoneDetails.type}
                    </span>
                  </div>
                )}
                
                {product.jewelryAttributes.gemstoneDetails?.caratWeight && (
                  <div className="flex items-center justify-between py-3 border-b border-[#e5ddd5]/50">
                    <span className="text-[#666] font-medium">Carat Weight</span>
                    <span className="text-[#2c2c2c] font-semibold">
                      {product.jewelryAttributes.gemstoneDetails.caratWeight} ct
                    </span>
                  </div>
                )}
                
                {product.jewelryAttributes.gemstoneDetails?.clarity && (
                  <div className="flex items-center justify-between py-3 border-b border-[#e5ddd5]/50">
                    <span className="text-[#666] font-medium">Clarity</span>
                    <span className="text-[#2c2c2c] font-semibold">
                      {product.jewelryAttributes.gemstoneDetails.clarity}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                {product.jewelryAttributes.gemstoneDetails?.cut && (
                  <div className="flex items-center justify-between py-3 border-b border-[#e5ddd5]/50">
                    <span className="text-[#666] font-medium">Cut Quality</span>
                    <span className="text-[#2c2c2c] font-semibold">
                      {product.jewelryAttributes.gemstoneDetails.cut}
                    </span>
                  </div>
                )}
                
                {product.jewelryAttributes.dimensions?.width && (
                  <div className="flex items-center justify-between py-3 border-b border-[#e5ddd5]/50">
                    <span className="text-[#666] font-medium">Width</span>
                    <span className="text-[#2c2c2c] font-semibold">
                      {product.jewelryAttributes.dimensions.width}mm
                    </span>
                  </div>
                )}
                
                {product.jewelryAttributes.dimensions?.height && (
                  <div className="flex items-center justify-between py-3 border-b border-[#e5ddd5]/50">
                    <span className="text-[#666] font-medium">Height</span>
                    <span className="text-[#2c2c2c] font-semibold">
                      {product.jewelryAttributes.dimensions.height}mm
                    </span>
                  </div>
                )}
                
                {product.inventory?.weight && (
                  <div className="flex items-center justify-between py-3 border-b border-[#e5ddd5]/50">
                    <span className="text-[#666] font-medium">Weight</span>
                    <span className="text-[#2c2c2c] font-semibold">
                      {product.inventory.weight}g
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Quality Features */}
            <div className="mt-8 pt-6 border-t border-[#e5ddd5]/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c9a96e] to-[#916849] rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4"/>
                    </svg>
                  </div>
                  <p className="text-xs text-[#666] font-medium">Hypoallergenic</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c9a96e] to-[#916849] rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <p className="text-xs text-[#666] font-medium">Tarnish Resistant</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c9a96e] to-[#916849] rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </div>
                  <p className="text-xs text-[#666] font-medium">Nickel Free</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c9a96e] to-[#916849] rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    </svg>
                  </div>
                  <p className="text-xs text-[#666] font-medium">Waterproof</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certification */}
      {product.jewelryAttributes?.certification && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-800">Certified Authenticity</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.jewelryAttributes.certification.certificateNumber && (
              <div className="flex items-center justify-between py-3 border-b border-green-200/50">
                <span className="text-green-700 font-medium">Certificate Number</span>
                <span className="text-green-900 font-semibold bg-green-100 px-3 py-1 rounded-full text-sm">
                  {product.jewelryAttributes.certification.certificateNumber}
                </span>
              </div>
            )}
            {product.jewelryAttributes.certification.issuingAuthority && (
              <div className="flex items-center justify-between py-3 border-b border-green-200/50">
                <span className="text-green-700 font-medium">Issuing Authority</span>
                <span className="text-green-900 font-semibold">
                  {product.jewelryAttributes.certification.issuingAuthority}
                </span>
              </div>
            )}
            {product.jewelryAttributes.certification.grade && (
              <div className="flex items-center justify-between py-3 border-b border-green-200/50">
                <span className="text-green-700 font-medium">Grade</span>
                <span className="text-green-900 font-semibold bg-green-100 px-3 py-1 rounded-full text-sm">
                  {product.jewelryAttributes.certification.grade}
                </span>
              </div>
            )}
            {product.jewelryAttributes.certification.issueDate && (
              <div className="flex items-center justify-between py-3 border-b border-green-200/50">
                <span className="text-green-700 font-medium">Issue Date</span>
                <span className="text-green-900 font-semibold">
                  {new Date(product.jewelryAttributes.certification.issueDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
          
          <div className="mt-6 p-4 bg-green-100/50 rounded-lg">
            <p className="text-green-800 text-sm leading-relaxed">
              <svg className="w-4 h-4 inline mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              This product comes with official certification guaranteeing its authenticity, quality, and specifications.
            </p>
          </div>
        </div>
      )}

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

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Size Guide</h2>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {(() => {
                const productCategory = 'jewelry';
                
                if (productCategory.includes('ring')) {
                  return (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Ring Size Guide</h3>
                        <p className="text-gray-600">Find your perfect ring size using our comprehensive guide</p>
                      </div>

                      {/* Ring Size Chart */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Ring Size Chart</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2 font-semibold">US Size</th>
                                <th className="text-left py-2 font-semibold">UK Size</th>
                                <th className="text-left py-2 font-semibold">EU Size</th>
                                <th className="text-left py-2 font-semibold">Diameter (mm)</th>
                                <th className="text-left py-2 font-semibold">Circumference (mm)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {[
                                { us: '5', uk: 'J', eu: '49', diameter: '15.7', circumference: '49.3' },
                                { us: '6', uk: 'L', eu: '52', diameter: '16.5', circumference: '51.9' },
                                { us: '7', uk: 'N', eu: '54', diameter: '17.3', circumference: '54.4' },
                                { us: '8', uk: 'P', eu: '57', diameter: '18.1', circumference: '57.0' },
                                { us: '9', uk: 'R', eu: '59', diameter: '18.9', circumference: '59.5' },
                                { us: '10', uk: 'T', eu: '62', diameter: '19.8', circumference: '62.1' },
                                { us: '11', uk: 'V', eu: '64', diameter: '20.6', circumference: '64.6' },
                                { us: '12', uk: 'X', eu: '67', diameter: '21.4', circumference: '67.2' }
                              ].map((size, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="py-2 font-medium">{size.us}</td>
                                  <td className="py-2">{size.uk}</td>
                                  <td className="py-2">{size.eu}</td>
                                  <td className="py-2">{size.diameter}</td>
                                  <td className="py-2">{size.circumference}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* How to Measure */}
                      <div className="bg-blue-50 rounded-lg p-6">
                        <h4 className="font-semibold text-blue-900 mb-4">How to Measure Your Ring Size</h4>
                        <div className="space-y-3 text-blue-800">
                          <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-blue-900 text-sm font-semibold">1</span>
                            <p>Wrap a piece of string or paper around your finger</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-blue-900 text-sm font-semibold">2</span>
                            <p>Mark where the string or paper overlaps</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-blue-900 text-sm font-semibold">3</span>
                            <p>Measure the length with a ruler (in millimeters)</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-blue-900 text-sm font-semibold">4</span>
                            <p>Compare your measurement to the circumference in the chart above</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else if (productCategory.includes('necklace') || productCategory.includes('chain')) {
                  return (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Necklace Length Guide</h3>
                        <p className="text-gray-600">Choose the perfect necklace length for your style</p>
                      </div>

                      {/* Necklace Length Chart */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Necklace Length Chart</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            { length: '14"', name: 'Collar', description: 'Sits snugly around the neck, perfect for layering' },
                            { length: '16"', name: 'Choker', description: 'Rests at the base of the neck, ideal for V-necks' },
                            { length: '18"', name: 'Princess', description: 'Most popular length, sits on the collarbone' },
                            { length: '20"', name: 'Matinee', description: 'Falls just below the collarbone, versatile for any outfit' },
                            { length: '22"', name: 'Opera', description: 'Sits at the chest, perfect for business attire' },
                            { length: '24"', name: 'Rope', description: 'Falls below the chest, great for layering' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                              <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">{item.length}</span>
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-900">{item.name}</h5>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Styling Tips */}
                      <div className="bg-amber-50 rounded-lg p-6">
                        <h4 className="font-semibold text-amber-900 mb-4">Styling Tips</h4>
                        <div className="space-y-2 text-amber-800">
                          <p>• <strong>Face Shape:</strong> Longer necklaces suit round faces, shorter ones complement long faces</p>
                          <p>• <strong>Neckline:</strong> Choose lengths that complement your outfit's neckline</p>
                          <p>• <strong>Layering:</strong> Mix different lengths for a trendy layered look</p>
                          <p>• <strong>Body Type:</strong> Longer necklaces can elongate your silhouette</p>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">General Size Guide</h3>
                        <p className="text-gray-600">Size information for this jewelry piece</p>
                      </div>

                      {/* General Size Info */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Product Specifications</h4>
                        <div className="space-y-3">
                          {product.jewelryAttributes?.dimensions && (
                            <>
                              {product.jewelryAttributes.dimensions.width && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Width:</span>
                                  <span className="font-medium">{product.jewelryAttributes.dimensions.width}mm</span>
                                </div>
                              )}
                              {product.jewelryAttributes.dimensions.height && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Height:</span>
                                  <span className="font-medium">{product.jewelryAttributes.dimensions.height}mm</span>
                                </div>
                              )}
                              {product.jewelryAttributes.dimensions.depth && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Depth:</span>
                                  <span className="font-medium">{product.jewelryAttributes.dimensions.depth}mm</span>
                                </div>
                              )}
                            </>
                          )}
                          {product.inventory?.weight && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Weight:</span>
                              <span className="font-medium">{product.inventory.weight}g</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Care Instructions */}
                      <div className="bg-green-50 rounded-lg p-6">
                        <h4 className="font-semibold text-green-900 mb-4">Care Instructions</h4>
                        <div className="space-y-2 text-green-800">
                          <p>• Store in a cool, dry place away from direct sunlight</p>
                          <p>• Clean gently with a soft, lint-free cloth</p>
                          <p>• Avoid contact with perfumes, lotions, and harsh chemicals</p>
                          <p>• Remove before swimming, exercising, or sleeping</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Still unsure? Contact our customer service for personalized assistance.
                </p>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
