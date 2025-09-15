'use client';

import React, { useEffect, useState } from 'react';
import RazorpayService from '@/lib/razorpay';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  transactionId: string;
  gateway: string;
  createdAt: string;
  order: {
    id: string;
    orderNumber: string;
    status: string;
    totalAmount: number;
    currency: string;
  };
  refunds: Array<{
    id: string;
    amount: number;
    reason: string;
    status: string;
    createdAt: string;
  }>;
}

interface PaymentHistoryData {
  payments: Payment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const PaymentHistory: React.FC = () => {
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefunding, setIsRefunding] = useState<string | null>(null);

  const fetchPaymentHistory = async (page: number) => {
    try {
      setIsLoading(true);
      const data = await RazorpayService.getInstance().getPaymentHistory(page, 10);
      setPaymentHistory(data);
    } catch (err) {
      setError('Failed to load payment history');
      console.error('Error fetching payment history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory(currentPage);
  }, [currentPage]);

  const handleRefund = async (payment: Payment, amount?: number) => {
    if (isRefunding) return;

    setIsRefunding(payment.id);
    
    try {
      await RazorpayService.getInstance().processRefund({
        payment_id: payment.transactionId,
        amount,
        reason: 'Customer request',
      });

      // Refresh payment history
      await fetchPaymentHistory(currentPage);
    } catch (err) {
      console.error('Refund failed:', err);
      alert('Refund failed. Please try again.');
    } finally {
      setIsRefunding(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    return RazorpayService.getInstance().getPaymentMethodIcon(method);
  };

  const formatAmount = (amount: number, currency: string) => {
    return RazorpayService.getInstance().formatAmount(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading payment history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={() => fetchPaymentHistory(currentPage)}
          className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!paymentHistory || paymentHistory.payments.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-6xl mb-4">💳</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No payments yet</h3>
        <p className="text-gray-600">Your payment history will appear here once you make your first purchase.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
        <div className="text-sm text-gray-600">
          {paymentHistory.pagination.total} payments total
        </div>
      </div>

      <div className="space-y-4">
        {paymentHistory.payments.map((payment) => (
          <div key={payment.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-2xl">{getMethodIcon(payment.method)}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Order #{payment.order.orderNumber}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {new Date(payment.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Amount:</span>
                    <p className="font-medium">{formatAmount(payment.amount, payment.currency)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Method:</span>
                    <p className="font-medium capitalize">{payment.method}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Transaction ID:</span>
                    <p className="font-mono text-xs">{payment.transactionId}</p>
                  </div>
                </div>

                {payment.refunds && payment.refunds.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Refunds</h5>
                    {payment.refunds.map((refund) => (
                      <div key={refund.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {formatAmount(refund.amount, payment.currency)} - {refund.reason}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(refund.status)}`}>
                          {refund.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                {payment.status === 'SUCCESS' && payment.refunds?.length === 0 && (
                  <button
                    onClick={() => handleRefund(payment)}
                    disabled={isRefunding === payment.id}
                    className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50 disabled:opacity-50"
                  >
                    {isRefunding === payment.id ? 'Processing...' : 'Request Refund'}
                  </button>
                )}
                
                <button
                  onClick={() => window.open(`/orders/${payment.order.id}`, '_blank')}
                  className="px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded hover:bg-blue-50"
                >
                  View Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {paymentHistory.pagination.pages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          <span className="px-3 py-2 text-sm text-gray-600">
            Page {currentPage} of {paymentHistory.pagination.pages}
          </span>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === paymentHistory.pagination.pages}
            className="px-3 py-2 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
