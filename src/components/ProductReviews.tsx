'use client';

import React, { useState, useEffect } from 'react';
import { useReviewsStore } from '@/store/reviews';
import { useAuthStore } from '@/store/auth';
import { useToast } from '@/components/Toast';
import { Review } from '@/types/api';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productName }) => {
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const { 
    reviews, 
    loading, 
    error, 
    totalReviews,
    currentPage,
    pageSize,
    fetchReviews, 
    createReview, 
    updateReview, 
    deleteReview,
    setPage 
  } = useReviewsStore();
  
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [reviewForm, setReviewForm] = useState<ReviewFormData>({
    rating: 5,
    title: '',
    comment: '',
  });

  useEffect(() => {
    if (productId) {
      fetchReviews(productId);
    }
  }, [productId, fetchReviews]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      addToast({
        type: 'error',
        title: 'Error!',
        message: 'Please log in to submit a review',
      });
      return;
    }
    
    try {
      if (editingReview) {
        await updateReview(editingReview.id, reviewForm);
        addToast({
          type: 'success',
          title: 'Success!',
          message: 'Review updated successfully',
        });
      } else {
        await createReview(productId, reviewForm);
        addToast({
          type: 'success',
          title: 'Success!',
          message: 'Review submitted successfully',
        });
      }
      
      setIsReviewFormOpen(false);
      setEditingReview(null);
      resetReviewForm();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error!',
        message: error instanceof Error ? error.message : 'Failed to submit review',
      });
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setReviewForm({
      rating: review.rating,
      title: review.title || '',
      comment: review.comment,
    });
    setIsReviewFormOpen(true);
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        addToast({
          type: 'success',
          title: 'Success!',
          message: 'Review deleted successfully',
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Error!',
          message: error instanceof Error ? error.message : 'Failed to delete review',
        });
      }
    }
  };

  const resetReviewForm = () => {
    setReviewForm({
      rating: 5,
      title: '',
      comment: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setReviewForm(prev => ({ ...prev, [name]: parseInt(value) || 5 }));
    } else {
      setReviewForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ));
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const totalPages = Math.ceil(totalReviews / pageSize);

  if (loading && reviews.length === 0) {
    return <LoadingSkeleton.ProductGridSkeleton count={3} />;
  }

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
          <p className="text-gray-600 mt-1">See what customers are saying about {productName}</p>
        </div>
        
        {user && (
          <button
            onClick={() => {
              setIsReviewFormOpen(true);
              setEditingReview(null);
              resetReviewForm();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Reviews Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{getAverageRating()}</div>
            <div className="flex justify-center mb-2">
              {renderStars(parseFloat(getAverageRating()))}
            </div>
            <p className="text-sm text-gray-600">Based on {totalReviews} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="col-span-2">
            <h4 className="font-medium text-gray-900 mb-3">Rating Distribution</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = getRatingDistribution()[rating as keyof ReturnType<typeof getRatingDistribution>];
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-16">
                      <span className="text-sm text-gray-600">{rating}</span>
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {review.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {review.user?.name || 'Anonymous User'}
                  </p>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500 ml-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              {user && (user.id === review.userId || user.role === 'ADMIN') && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            
            {review.title && (
              <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
            )}
            
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}

        {reviews.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setPage(page)}
                className={`px-3 py-2 border rounded-md ${
                  page === currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Review Form Modal */}
      {isReviewFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingReview ? 'Edit Review' : 'Write a Review'}
              </h3>
              <button
                onClick={() => {
                  setIsReviewFormOpen(false);
                  setEditingReview(null);
                  resetReviewForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setReviewForm(prev => ({ ...prev, rating }))}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`w-8 h-8 ${
                          rating <= reviewForm.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Click on the stars to set your rating
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review Title (Optional)
                </label>
                <input
                  type="text"
                  name="title"
                  value={reviewForm.title}
                  onChange={handleInputChange}
                  placeholder="Summarize your experience"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review Comment *
                </label>
                <textarea
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Share your thoughts about this product..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsReviewFormOpen(false);
                    setEditingReview(null);
                    resetReviewForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingReview ? 'Update Review' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
