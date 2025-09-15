'use client';

import React, { useState } from 'react';
import RazorpayService, { RazorpayOrderData } from '@/lib/razorpay';
import { useAuth } from '@/hooks/useAuth';

interface RazorpayPaymentButtonProps {
  amount: number;
  currency?: string;
  orderNumber: string;
  onSuccess: (paymentData: any) => void;
  onFailure: (error: any) => void;
  onDismiss?: () => void;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const RazorpayPaymentButton: React.FC<RazorpayPaymentButtonProps> = ({
  amount,
  currency = 'INR',
  orderNumber,
  onSuccess,
  onFailure,
  onDismiss,
  className = '',
  disabled = false,
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!user) {
      onFailure(new Error('User not authenticated'));
      return;
    }

    setIsLoading(true);

    try {
      const orderData: RazorpayOrderData = {
        amount,
        currency,
        receipt: orderNumber,
        notes: {
          order_type: 'ecommerce',
          user_id: user.id,
        },
        prefill: {
          name: user.name || '',
          email: user.email || '',
          contact: user.phone || '',
        },
      };

      const razorpayService = RazorpayService.getInstance();
      
      await razorpayService.initializePayment(
        orderData,
        (paymentData) => {
          setIsLoading(false);
          onSuccess(paymentData);
        },
        (error) => {
          setIsLoading(false);
          onFailure(error);
        },
        () => {
          setIsLoading(false);
          onDismiss?.();
        }
      );
    } catch (error) {
      setIsLoading(false);
      onFailure(error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Processing...
        </div>
      ) : (
        children || `Pay ₹${amount.toFixed(2)}`
      )}
    </button>
  );
};

export default RazorpayPaymentButton;
