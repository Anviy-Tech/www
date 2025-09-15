'use client';

import React, { useEffect, useState } from 'react';
import RazorpayService from '@/lib/razorpay';

interface PaymentMethod {
  name: string;
  description: string;
  icon: string;
  supported: boolean;
}

export const PaymentMethods: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<Record<string, PaymentMethod>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setIsLoading(true);
        const methods = await RazorpayService.getInstance().getPaymentMethods();
        setPaymentMethods(methods);
      } catch (err) {
        setError('Failed to load payment methods');
        console.error('Error fetching payment methods:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading payment methods...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Available Payment Methods</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(paymentMethods).map(([key, method]) => (
          <div
            key={key}
            className={`p-4 border rounded-lg transition-all ${
              method.supported
                ? 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                : 'border-gray-100 bg-gray-50 opacity-60'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{method.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{method.name}</h4>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
              {method.supported && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Available
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-sm text-blue-800">
            <p className="font-medium">Secure Payment Processing</p>
            <p className="mt-1">
              All payments are processed securely through Razorpay, India's leading payment gateway. 
              Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
