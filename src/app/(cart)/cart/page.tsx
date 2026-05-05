"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart, getCartTotal } from '@/store/cart';
import { useFavorites } from '@/store/favorites';
import { Product } from '@/types/api';
import { api } from '@/lib/api';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const { addToFavoritesFromCart } = useFavorites();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  
  const validPromoCodes = {
    'WELCOME10': { discount: 0.1, description: '10% off on first order' },
    'PREPAID75': { discount: 75, description: '₹75 off on prepaid orders' },
    'NEWUSER': { discount: 0.15, description: '15% off for new users' }
  };

  const subtotal = getCartTotal(items);
  
  const getPromoDiscount = () => {
    if (!appliedPromo) return 0;
    const promo = validPromoCodes[appliedPromo as keyof typeof validPromoCodes];
    if (!promo) return 0;
    
    if (typeof promo.discount === 'number' && promo.discount < 1) {
      return subtotal * promo.discount; // Percentage discount
    } else {
      return promo.discount; // Fixed amount discount
    }
  };

  const shipping = shippingMethod === 'express' ? 200 : subtotal > 2000 ? 0 : 150;
  const promoDiscount = getPromoDiscount();
  const tax = (subtotal - promoDiscount) * 0.18; // 18% GST
  const total = subtotal + shipping - promoDiscount + tax;

  const handleApplyPromo = () => {
    if (validPromoCodes[promoCode as keyof typeof validPromoCodes]) {
      setAppliedPromo(promoCode);
    } else {
      alert('Invalid promo code. Try WELCOME10, PREPAID75, or NEWUSER');
    }
  };

  const handleMoveToFavorites = (item: any) => {
    addToFavoritesFromCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      slug: item.slug
    });
    removeItem(item.id);
  };

  // Fetch related products for "Pair with" section
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (items.length === 0) return;
      
      setLoadingRelated(true);
      try {
        // Get products from the same categories as cart items
        const cartProductIds = items.map(item => item.productId);
        const response = await api.products.getProducts({
          page: 1,
          limit: 8
        });
        
        // Filter to get complementary products (different categories)
        const filteredProducts = response.products
          .filter(product => !cartProductIds.includes(product._id))
          .slice(0, 4);
        
        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching related products:', error);
        setRelatedProducts([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelatedProducts();
  }, [items]);

  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary">
        <div className="container-page py-20">
          {/* Free Shipping Banner for Empty Cart */}
          <div className="bg-accent text-white text-center py-3 mb-8 rounded-sm">
            <p className="text-sm font-medium">
              🚚 FREE SHIPPING on orders above ₹2,000 • Extra ₹75 OFF on Prepaid Orders
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto text-center">
            {/* Empty Cart Icon */}
            <div className="mb-8">
              <svg 
                width="120" 
                height="120" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#c9a96e" 
                strokeWidth="0.5" 
                className="mx-auto opacity-30"
              >
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            
            <h1 className="text-display text-4xl mb-6">Your cart is empty</h1>
            <p className="text-xl text-text-secondary mb-12 leading-relaxed">
              Start building your collection with handcrafted pieces that embody timeless elegance.
            </p>
            
            <div className="space-y-4">
              <Link href="/shop" className="btn-primary text-lg px-12 py-4">
                Discover Our Collection
              </Link>
              <div className="text-center">
                <Link href="/favorites" className="btn-minimal">
                  View Your Favorites
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container-page py-12 lg:py-20">
        {/* Free Shipping Banner */}
        <div className="bg-white p-6 mb-8 rounded-sm border border-gray-100 shadow-sm">
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-gray-900">
              {subtotal >= 2000 ? 
                '🎉 Congratulations! Your order qualifies for FREE SHIPPING' :
                `🚚 You are ₹${(2000 - subtotal).toLocaleString()} away from FREE SHIPPING`
              }
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min((subtotal / 2000) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>₹0</span>
              <span className="font-medium">₹2,000 for FREE SHIPPING</span>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-xs text-accent font-medium">
              Extra ₹75 OFF on Prepaid Orders • 30-Day Return Policy
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-16">
          <nav className="text-sm text-text-muted mb-6">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">Shopping Cart</span>
          </nav>
          
          <h1 className="text-display text-4xl lg:text-5xl mb-6">Shopping Cart</h1>
          <div className="divider"></div>
          <p className="text-xl text-text-secondary">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-12 xl:gap-16">
          {/* Cart Items */}
          <div className="xl:col-span-8">
            <div className="space-y-4 lg:space-y-6">
              {items.map((item, index) => (
                <div key={item.id} className="bg-white p-4 lg:p-8 animate-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Mobile Layout */}
                  <div className="block md:hidden space-y-4">
                    <div className="flex space-x-4">
                      <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          width={100} 
                          height={100} 
                          className="w-24 h-24 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="flex-1 space-y-3">
                        <div>
                          <Link 
                            href={`/product/${item.slug}`}
                            className="text-display text-lg hover:text-accent transition-colors duration-300 block"
                          >
                            {item.name}
                          </Link>
                          <div className="text-small-caps text-xs text-text-muted mt-1 tracking-widest">
                            18K GOLD VERMEIL
                          </div>
                        </div>
                        <div className="text-lg font-medium text-accent">
                          ₹{item.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-2 hover:bg-gray-50 transition-colors touch-manipulation"
                          aria-label="Decrease quantity"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14"/>
                          </svg>
                        </button>
                        <span className="px-4 py-2 min-w-[50px] text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 hover:bg-gray-50 transition-colors touch-manipulation"
                          aria-label="Increase quantity"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="text-lg font-medium">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                    
                    {/* Mobile Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-border-light">
                      <button 
                        onClick={() => handleMoveToFavorites(item)}
                        className="flex items-center space-x-2 text-sm text-text-muted hover:text-accent transition-colors touch-manipulation"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span>Save</span>
                      </button>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="flex items-center space-x-2 text-sm text-text-muted hover:text-red-500 transition-colors touch-manipulation"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"/>
                        </svg>
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden md:grid md:grid-cols-12 gap-6 items-center">
                    {/* Product Image */}
                    <div className="md:col-span-3">
                      <Link href={`/product/${item.slug}`}>
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          width={200} 
                          height={200} 
                          className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>

                    {/* Product Details */}
                    <div className="md:col-span-6 space-y-4">
                      <div>
                        <Link 
                          href={`/product/${item.slug}`}
                          className="text-display text-xl hover:text-accent transition-colors duration-300"
                        >
                          {item.name}
                        </Link>
                        <div className="text-small-caps text-xs text-text-muted mt-2 tracking-widest">
                          18K GOLD VERMEIL
                        </div>
                      </div>
                      
                      <div className="text-lg font-medium text-accent">
                        ₹{item.price.toLocaleString()}
                      </div>

                      {/* Size Selection */}
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">Size:</span>
                        <select className="text-sm border border-border px-3 py-2 focus:outline-none focus:border-accent">
                          <option>One Size</option>
                          <option>XS</option>
                          <option>S</option>
                          <option>M</option>
                          <option>L</option>
                        </select>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-6 text-sm">
                        <button 
                          onClick={() => handleMoveToFavorites(item)}
                          className="flex items-center space-x-2 text-text-muted hover:text-accent transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                          <span>Move to Favorites</span>
                        </button>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="flex items-center space-x-2 text-text-muted hover:text-red-500 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"/>
                          </svg>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Quantity & Total */}
                    <div className="md:col-span-3 space-y-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14"/>
                            </svg>
                          </button>
                          <span className="px-4 py-3 min-w-[60px] text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 5v14M5 12h14"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Item Total */}
                      <div className="text-center">
                        <div className="text-lg font-medium">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pair With Recommendations */}
            {(relatedProducts.length > 0 || loadingRelated) && (
              <div className="mt-12 bg-white p-6 rounded-sm border border-gray-100">
                <h3 className="text-display text-xl mb-6">Pair with</h3>
                
                {loadingRelated ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="group">
                        <div className="aspect-square bg-gray-200 rounded-sm mb-3 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded mb-3 w-1/2 animate-pulse"></div>
                        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.map((product) => (
                      <div key={product._id} className="group cursor-pointer">
                        <Link href={`/product/${product._id}`} className="block">
                          <div className="aspect-square bg-gray-100 rounded-sm mb-3 overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={200}
                                height={200}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1">
                                  <circle cx="12" cy="12" r="3"/>
                                  <path d="M12 1v6m0 6v6"/>
                                  <path d="m21 12-6-3-6 3-6-3"/>
                                </svg>
                              </div>
                            )}
                          </div>
                        </Link>
                        <Link href={`/product/${product._id}`}>
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-accent transition-colors truncate">
                            {product.name}
                          </h4>
                        </Link>
                        <p className="text-sm text-accent font-medium">₹{product.price.toLocaleString()}</p>
                        <button 
                          onClick={() => addItem(product)}
                          className="mt-2 w-full text-xs border border-accent text-accent hover:bg-accent hover:text-white transition-colors py-2 rounded-sm"
                        >
                          Quick Add
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Continue Shopping */}
            <div className="mt-12">
              <Link href="/shop" className="btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-4">
            <div className="bg-white p-4 lg:p-8 space-y-6 lg:space-y-8 lg:sticky lg:top-24">
              <h2 className="text-display text-2xl">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="space-y-4">
                <div className="text-small-caps text-xs text-text-muted tracking-widest">
                  PROMO CODE
                </div>
                
                {/* Available Promo Codes */}
                <div className="bg-gray-50 p-3 rounded-sm">
                  <p className="text-xs font-medium text-gray-700 mb-2">Available offers:</p>
                  <div className="space-y-1">
                    {Object.entries(validPromoCodes).map(([code, details]) => (
                      <div key={code} className="flex justify-between items-center text-xs">
                        <span className="font-mono font-medium text-accent">{code}</span>
                        <span className="text-gray-600">{details.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-3 border border-border focus:outline-none focus:border-accent font-mono"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="btn-secondary px-6 w-full sm:w-auto"
                  >
                    Apply Code
                  </button>
                </div>
                {appliedPromo && (
                  <div className="bg-green-50 border border-green-200 p-3 rounded-sm">
                    <div className="flex items-center space-x-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span className="text-sm text-green-700 font-medium">
                        Promo code "{appliedPromo}" applied! 
                        {validPromoCodes[appliedPromo as keyof typeof validPromoCodes]?.description}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Gift Message */}
              <div className="space-y-4">
                <div className="text-small-caps text-xs text-text-muted tracking-widest">
                  GIFT MESSAGE
                </div>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isGift}
                      onChange={(e) => setIsGift(e.target.checked)}
                      className="accent-accent"
                    />
                    <span className="text-sm font-medium">This is a gift</span>
                  </label>
                  
                  {isGift && (
                    <textarea
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="Add a personal message for the recipient..."
                      className="w-full px-4 py-3 border border-border focus:outline-none focus:border-accent text-sm resize-none"
                      rows={3}
                      maxLength={200}
                    />
                  )}
                </div>
              </div>

              {/* Shipping Options */}
              <div className="space-y-4">
                <div className="text-small-caps text-xs text-text-muted tracking-widest">
                  SHIPPING METHOD
                </div>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="accent-accent"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Standard Shipping</div>
                      <div className="text-sm text-text-secondary">5-7 business days</div>
                    </div>
                    <div className="font-medium">
                      {subtotal > 2000 ? 'Free' : '₹150'}
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="accent-accent"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Express Shipping</div>
                      <div className="text-sm text-text-secondary">2-3 business days</div>
                    </div>
                    <div className="font-medium">₹200</div>
                  </label>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 border-t border-border-light pt-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo})</span>
                    <span>-₹{promoDiscount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-border-light pt-4">
                  <div className="flex justify-between text-xl font-medium">
                    <span>Total</span>
                    <span className="text-accent">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Actions */}
              <div className="space-y-4">
                <Link href="/checkout" className="btn-primary w-full py-4 text-lg touch-manipulation text-center block">
                  Proceed to Checkout
                </Link>
                
                <div className="text-center text-sm text-text-muted">
                  <p>✓ Secure checkout available for guests</p>
                  <p>✓ No account required</p>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={clearCart}
                    className="text-sm text-text-muted hover:text-red-500 transition-colors touch-manipulation"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3 pt-6 border-t border-border-light">
                <div className="flex items-center space-x-3 text-sm text-text-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>Secure checkout with SSL encryption</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm text-text-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                    <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                  </svg>
                  <span>30-day return guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


