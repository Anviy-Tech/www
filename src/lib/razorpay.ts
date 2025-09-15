import { apiRequest } from './api';

export interface RazorpayOrderData {
  amount: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export interface RazorpayPaymentData {
  order_id: string;
  payment_id: string;
  signature: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayPaymentData) => void;
  modal: {
    ondismiss: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export class RazorpayService {
  private static instance: RazorpayService;
  private isLoaded = false;

  private constructor() {}

  static getInstance(): RazorpayService {
    if (!RazorpayService.instance) {
      RazorpayService.instance = new RazorpayService();
    }
    return RazorpayService.instance;
  }

  /**
   * Load Razorpay script
   */
  async loadScript(): Promise<void> {
    if (this.isLoaded) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Failed to load Razorpay script'));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Create a new payment order
   */
  async createOrder(orderData: RazorpayOrderData): Promise<any> {
    try {
      const response = await apiRequest('/payment/create-order', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to create order');
      }

      return response.data;
    } catch (error) {
      console.error('Failed to create Razorpay order:', error);
      throw error;
    }
  }

  /**
   * Initialize Razorpay payment
   */
  async initializePayment(
    orderData: RazorpayOrderData,
    onSuccess: (paymentData: RazorpayPaymentData) => void,
    onFailure: (error: any) => void,
    onDismiss: () => void
  ): Promise<void> {
    try {
      // Load Razorpay script if not already loaded
      await this.loadScript();

      // Create order on backend
      const orderResponse = await this.createOrder(orderData);

      const options: RazorpayOptions = {
        key: orderResponse.razorpay.keyId,
        amount: orderResponse.razorpay.amount,
        currency: orderResponse.razorpay.currency,
        name: 'Anviy',
        description: `Order ${orderResponse.order.orderNumber}`,
        order_id: orderResponse.razorpay.orderId,
        prefill: orderData.prefill || {},
        theme: {
          color: '#3399cc', // Anviy brand color
        },
        handler: async (response: RazorpayPaymentData) => {
          try {
            // Verify payment on backend
            await this.verifyPayment(response);
            onSuccess(response);
          } catch (error) {
            console.error('Payment verification failed:', error);
            onFailure(error);
          }
        },
        modal: {
          ondismiss: onDismiss,
        },
      };

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Failed to initialize Razorpay payment:', error);
      onFailure(error);
    }
  }

  /**
   * Verify payment
   */
  async verifyPayment(paymentData: RazorpayPaymentData): Promise<any> {
    try {
      const response = await apiRequest('/payment/verify', {
        method: 'POST',
        body: JSON.stringify(paymentData),
      });

      if (!response.success) {
        throw new Error(response.error || 'Payment verification failed');
      }

      return response.data;
    } catch (error) {
      console.error('Payment verification failed:', error);
      throw error;
    }
  }

  /**
   * Get available payment methods
   */
  async getPaymentMethods(): Promise<any> {
    try {
      const response = await apiRequest('/payment/methods', {
        method: 'GET',
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to get payment methods');
      }

      return (response.data as any).paymentMethods;
    } catch (error) {
      console.error('Failed to get payment methods:', error);
      throw error;
    }
  }

  /**
   * Get payment history
   */
  async getPaymentHistory(page = 1, limit = 10): Promise<any> {
    try {
      const response = await apiRequest(`/payment/history?page=${page}&limit=${limit}`, {
        method: 'GET',
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to get payment history');
      }

      return response.data;
    } catch (error) {
      console.error('Failed to get payment history:', error);
      throw error;
    }
  }

  /**
   * Process refund
   */
  async processRefund(refundData: {
    payment_id: string;
    amount?: number;
    reason?: string;
    notes?: Record<string, string>;
  }): Promise<any> {
    try {
      const response = await apiRequest('/payment/refund', {
        method: 'POST',
        body: JSON.stringify(refundData),
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to process refund');
      }

      return response.data;
    } catch (error) {
      console.error('Failed to process refund:', error);
      throw error;
    }
  }

  /**
   * Format amount for display
   */
  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  }

  /**
   * Get payment method icon
   */
  getPaymentMethodIcon(method: string): string {
    const icons: Record<string, string> = {
      upi: '💳',
      card: '💳',
      netbanking: '🏦',
      wallet: '📱',
      emi: '📅',
    };

    return icons[method] || '💳';
  }

  /**
   * Get payment method name
   */
  getPaymentMethodName(method: string): string {
    const names: Record<string, string> = {
      upi: 'UPI',
      card: 'Credit/Debit Card',
      netbanking: 'Net Banking',
      wallet: 'Digital Wallet',
      emi: 'EMI',
    };

    return names[method] || method;
  }
}

export default RazorpayService;
