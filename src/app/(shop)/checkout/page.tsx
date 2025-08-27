'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/store/cart';
import { useAuth, useIsAuthenticated } from '@/store/auth';
import { Address } from '@/types/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear: clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    shippingAddress: {
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      phone: '',
    },
    billingAddress: {
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      phone: '',
    },
    useSameAddress: true,
    paymentMethod: 'card',
    notes: '',
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
    }
  }, [isAuthenticated, router]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 2000 ? 0 : 150;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleInputChange = (section: 'shippingAddress' | 'billingAddress', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSameAddressChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      useSameAddress: checked,
      billingAddress: checked ? prev.shippingAddress : prev.billingAddress,
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1: // Shipping Address
        const shipping = formData.shippingAddress;
        return shipping.firstName && shipping.lastName && shipping.addressLine1 && 
               shipping.city && shipping.state && shipping.postalCode && shipping.phone;
      case 2: // Payment
        return formData.paymentMethod;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    
    try {
      // Here you would integrate with your payment gateway and order API
      // For now, we'll simulate a successful order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Order placement failed:', error);
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect to cart
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container-page py-12 lg:py-20">
        {/* Header */}
        <div className="mb-16">
          <nav className="text-sm text-text-muted mb-6">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/cart" className="hover:text-text-primary transition-colors">Cart</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">Checkout</span>
          </nav>
          
          <h1 className="text-display text-4xl lg:text-5xl mb-6">Checkout</h1>
          <div className="divider"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                {[
                  { number: 1, label: 'Shipping', icon: '📍' },
                  { number: 2, label: 'Payment', icon: '💳' },
                  { number: 3, label: 'Review', icon: '✅' },
                ].map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.number 
                        ? 'border-accent bg-accent text-white' 
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}>
                      <span className="text-lg">{step.icon}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Step {step.number}</div>
                      <div className="text-xs text-gray-500">{step.label}</div>
                    </div>
                    {index < 2 && (
                      <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                        currentStep > step.number ? 'bg-accent' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Shipping Address */}
            {currentStep === 1 && (
              <div className="bg-white p-8 shadow-xl border border-gray-100 rounded-sm">
                <h2 className="text-display text-2xl mb-8">Shipping Address</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={formData.shippingAddress.firstName}
                      onChange={(e) => handleInputChange('shippingAddress', 'firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={formData.shippingAddress.lastName}
                      onChange={(e) => handleInputChange('shippingAddress', 'lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1 *</label>
                    <input
                      type="text"
                      value={formData.shippingAddress.addressLine1}
                      onChange={(e) => handleInputChange('shippingAddress', 'addressLine1', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                    <input
                      type="text"
                      value={formData.shippingAddress.addressLine2}
                      onChange={(e) => handleInputChange('shippingAddress', 'addressLine2', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      value={formData.shippingAddress.city}
                      onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      value={formData.shippingAddress.state}
                      onChange={(e) => handleInputChange('shippingAddress', 'state', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
                    <input
                      type="text"
                      value={formData.shippingAddress.postalCode}
                      onChange={(e) => handleInputChange('shippingAddress', 'postalCode', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={formData.shippingAddress.phone}
                      onChange={(e) => handleInputChange('shippingAddress', 'phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.useSameAddress}
                      onChange={(e) => handleSameAddressChange(e.target.checked)}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                    />
                    <span className="ml-2 text-sm text-gray-700">Use same address for billing</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="bg-white p-8 shadow-xl border border-gray-100 rounded-sm">
                <h2 className="text-display text-2xl mb-8">Payment Method</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-gray-200 rounded-sm cursor-pointer hover:border-accent transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
                    />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">Credit/Debit Card</div>
                      <div className="text-sm text-gray-500">Pay securely with your card</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-200 rounded-sm cursor-pointer hover:border-accent transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
                    />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">UPI</div>
                      <div className="text-sm text-gray-500">Pay using UPI apps</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-200 rounded-sm cursor-pointer hover:border-accent transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
                    />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">Cash on Delivery</div>
                      <div className="text-sm text-gray-500">Pay when you receive your order</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="bg-white p-8 shadow-xl border border-gray-100 rounded-sm">
                <h2 className="text-display text-2xl mb-8">Review Order</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
                    <div className="bg-gray-50 p-4 rounded-sm">
                      <p className="text-gray-900">
                        {formData.shippingAddress.firstName} {formData.shippingAddress.lastName}
                      </p>
                      <p className="text-gray-600">{formData.shippingAddress.addressLine1}</p>
                      {formData.shippingAddress.addressLine2 && (
                        <p className="text-gray-600">{formData.shippingAddress.addressLine2}</p>
                      )}
                      <p className="text-gray-600">
                        {formData.shippingAddress.city}, {formData.shippingAddress.state} {formData.shippingAddress.postalCode}
                      </p>
                      <p className="text-gray-600">{formData.shippingAddress.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                    <div className="bg-gray-50 p-4 rounded-sm">
                      <p className="text-gray-900 capitalize">{formData.paymentMethod}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Notes</h3>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any special instructions for your order..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="btn-minimal"
                >
                  Previous Step
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="btn-primary ml-auto"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                  className="btn-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Place Order'}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-xl border border-gray-100 rounded-sm sticky top-8">
              <h2 className="text-display text-2xl mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-sm flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ₹{(item.price * item.qty).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (18% GST)</span>
                  <span className="text-gray-900">₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-medium border-t border-gray-200 pt-3">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                <p>• Free shipping on orders above ₹2,000</p>
                <p>• 30-day return policy</p>
                <p>• Secure payment processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
