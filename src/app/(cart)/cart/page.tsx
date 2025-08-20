"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart, getCartTotal } from '@/store/cart';
import { useFavorites } from '@/store/favorites';

export default function CartPage() {
  const { items, remove, setQty, clear } = useCart();
  const { addItem: addToFavorites } = useFavorites();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  const subtotal = getCartTotal(items);
  const shipping = shippingMethod === 'express' ? 200 : subtotal > 2000 ? 0 : 150;
  const promoDiscount = appliedPromo === 'WELCOME10' ? subtotal * 0.1 : 0;
  const tax = (subtotal - promoDiscount) * 0.18; // 18% GST
  const total = subtotal + shipping - promoDiscount + tax;

  const handleApplyPromo = () => {
    if (promoCode === 'WELCOME10') {
      setAppliedPromo(promoCode);
    } else {
      alert('Invalid promo code');
    }
  };

  const handleMoveToFavorites = (item: any) => {
    addToFavorites({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      slug: item.slug
    });
    remove(item.id);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary">
        <div className="container-page py-20">
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

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16">
          {/* Cart Items */}
          <div className="xl:col-span-8">
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={item.id} className="bg-white p-8 animate-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
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
                          onClick={() => remove(item.id)}
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
                            onClick={() => setQty(item.id, Math.max(1, item.qty - 1))}
                            className="px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14"/>
                            </svg>
                          </button>
                          <span className="px-4 py-3 min-w-[60px] text-center font-medium">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => setQty(item.id, item.qty + 1)}
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
                          ₹{(item.price * item.qty).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-12">
              <Link href="/shop" className="btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-4">
            <div className="bg-white p-8 space-y-8 sticky top-24">
              <h2 className="text-display text-2xl">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="space-y-4">
                <div className="text-small-caps text-xs text-text-muted tracking-widest">
                  PROMO CODE
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-3 border border-border focus:outline-none focus:border-accent"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="btn-secondary px-6"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="text-sm text-green-600">
                    ✓ Promo code "{appliedPromo}" applied
                  </div>
                )}
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
                <button className="btn-primary w-full py-4 text-lg">
                  Proceed to Checkout
                </button>
                
                <div className="text-center">
                  <button 
                    onClick={clear}
                    className="text-sm text-text-muted hover:text-red-500 transition-colors"
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


