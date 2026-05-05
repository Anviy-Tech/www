"use client";
import React, { useState, useEffect } from 'react';
import { Review } from '@/types/api';
import { reviewsAPI } from '@/lib/api';

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await reviewsAPI.getProductReviews(productId, {
          page: 1,
          limit: 50,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        });
        
        console.log('Reviews API Response:', response); // Debug log
        
        // Handle different possible response structures
        let reviewsData: Review[] = [];
        
        if (Array.isArray(response)) {
          // Direct array response
          reviewsData = response;
        } else if (response.reviews && Array.isArray(response.reviews)) {
          // Paginated response with reviews property
          reviewsData = response.reviews;
        } else if (response.data && Array.isArray(response.data)) {
          // Response with data property
          reviewsData = response.data;
        } else if (typeof response === 'object' && response !== null) {
          // Check for any array property in the response
          const keys = Object.keys(response);
          for (const key of keys) {
            if (Array.isArray(response[key])) {
              reviewsData = response[key];
              break;
            }
          }
        }
        
        setReviews(reviewsData);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(`Failed to load reviews: ${err instanceof Error ? err.message : 'Unknown error'}`);
        
        // For development: Show mock reviews if API fails
        if (process.env.NODE_ENV === 'development') {
          console.log('Using mock reviews for development');
          const mockReviews: Review[] = [
            {
              id: 'mock-1',
              userId: 'user-1',
              productId: productId,
              user: { _id: 'user-1', email: 'john@example.com', fullName: 'John Doe', role: 'user', createdAt: new Date(), updatedAt: new Date() },
              rating: 5,
              title: 'Excellent Quality!',
              comment: 'This jewelry piece exceeded my expectations. The craftsmanship is outstanding and it looks even better in person.',
              isVerified: true,
              createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
              updatedAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
              id: 'mock-2',
              userId: 'user-2',
              productId: productId,
              user: { _id: 'user-2', email: 'jane@example.com', fullName: 'Jane Smith', role: 'user', createdAt: new Date(), updatedAt: new Date() },
              rating: 4,
              title: 'Beautiful piece',
              comment: 'Very elegant and well-made. The only reason I\'m giving 4 stars instead of 5 is that it took a while to arrive.',
              isVerified: true,
              createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
              updatedAt: new Date(Date.now() - 172800000).toISOString()
            },
            {
              id: 'mock-3',
              userId: 'user-3',
              productId: productId,
              user: { _id: 'user-3', email: 'alice@example.com', fullName: 'Alice Johnson', role: 'user', createdAt: new Date(), updatedAt: new Date() },
              rating: 5,
              title: 'Perfect gift',
              comment: 'Bought this as a gift and the recipient absolutely loved it. Great packaging and presentation too.',
              isVerified: false,
              createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
              updatedAt: new Date(Date.now() - 259200000).toISOString()
            }
          ];
          setReviews(mockReviews);
          setError(null); // Clear error when using mock data
        } else {
          setReviews([]);
        }
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  // Calculate statistics from actual reviews
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
    : 0;

  // Calculate rating distribution
  const ratingDistribution = React.useMemo(() => {
    const distribution = [
      { stars: 5, count: 0, percentage: 0 },
      { stars: 4, count: 0, percentage: 0 },
      { stars: 3, count: 0, percentage: 0 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 }
    ];

    reviews.forEach(review => {
      const ratingIndex = 5 - review.rating;
      if (ratingIndex >= 0 && ratingIndex < 5) {
        distribution[ratingIndex].count++;
      }
    });

    // Calculate percentages
    distribution.forEach(item => {
      item.percentage = totalReviews > 0 ? Math.round((item.count / totalReviews) * 100) : 0;
    });

    return distribution;
  }, [reviews, totalReviews]);

  const filteredReviews = selectedRating 
    ? reviews.filter(review => review.rating === selectedRating)
    : reviews;

  // Show loading state
  if (loading) {
    return (
      <section className="bg-white">
        <div className="container-page py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-display text-4xl lg:text-5xl mb-6">Customer Reviews</h2>
              <div className="divider"></div>
            </div>
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
              <p className="mt-4 text-text-secondary">Loading reviews...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="bg-white">
        <div className="container-page py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-display text-4xl lg:text-5xl mb-6">Customer Reviews</h2>
              <div className="divider"></div>
            </div>
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-secondary"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state
  if (totalReviews === 0) {
    return (
      <section className="bg-white">
        <div className="container-page py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-display text-4xl lg:text-5xl mb-6">Customer Reviews</h2>
              <div className="divider"></div>
            </div>
            <div className="text-center py-12">
              <p className="text-text-secondary mb-4">No reviews yet. Be the first to review this product!</p>
              <button className="btn-primary">Write a Review</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="container-page py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h2 className="text-display text-4xl lg:text-5xl mb-6">Customer Reviews</h2>
            <div className="divider"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Rating Summary */}
            <div className="space-y-8">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#c9a96e">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <div className="text-text-secondary">
                  Based on {totalReviews} reviews
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {ratingDistribution.map((rating) => (
                  <button
                    key={rating.stars}
                    onClick={() => setSelectedRating(selectedRating === rating.stars ? null : rating.stars)}
                    className={`w-full flex items-center space-x-3 p-2 rounded transition-colors ${
                      selectedRating === rating.stars ? 'bg-accent/10' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{rating.stars}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#c9a96e">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-500"
                        style={{ width: `${rating.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-text-secondary min-w-[40px] text-right">
                      {rating.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Write Review Button */}
              <button 
                onClick={() => setShowWriteReview(true)}
                className="btn-primary w-full"
              >
                Write a Review
              </button>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-8">
              {/* Sort & Filter */}
              <div className="flex items-center justify-between">
                <div className="text-text-secondary">
                  {selectedRating ? (
                    <>Showing {filteredReviews.length} {selectedRating}-star reviews</>
                  ) : (
                    <>Showing {filteredReviews.length} of {totalReviews} reviews</>
                  )}
                </div>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-border rounded px-3 py-2 focus:outline-none focus:border-accent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>

              {/* Clear Filter */}
              {selectedRating && (
                <button
                  onClick={() => setSelectedRating(null)}
                  className="text-accent hover:underline text-sm"
                >
                  Clear filter
                </button>
              )}

              {/* Reviews */}
              <div className="space-y-8">
                {filteredReviews.map((review, index) => (
                  <div key={review.id || review._id || index} className="border-b border-border-light pb-8 last:border-b-0">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                width="14" 
                                height="14" 
                                viewBox="0 0 24 24" 
                                fill={i < review.rating ? "#c9a96e" : "#e5e7eb"}
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            ))}
                          </div>
                          <h3 className="font-medium text-text-primary">{review.title || 'Review'}</h3>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-text-secondary">
                          <span>{review.user?.fullName || 'Anonymous'}</span>
                          {review.isVerified && (
                            <>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#22c55e">
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>Verified Purchase</span>
                              </div>
                            </>
                          )}
                          <span>•</span>
                          <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-text-secondary leading-relaxed mb-4">
                      {review.comment}
                    </p>

                    {/* Review Actions */}
                    <div className="flex items-center space-x-4 text-sm">
                      <button className="flex items-center space-x-2 text-text-muted hover:text-text-secondary transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                        </svg>
                        <span>Helpful</span>
                      </button>
                      <button className="text-text-muted hover:text-text-secondary transition-colors">
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {filteredReviews.length < totalReviews && (
                <div className="text-center">
                  <button className="btn-secondary">
                    Load More Reviews
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Write a Review</h2>
              <button
                onClick={() => setShowWriteReview(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="focus:outline-none"
                    >
                      <svg 
                        className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({newReview.rating} star{newReview.rating !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your review a title"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your thoughts about this product..."
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Minimum 10 characters ({newReview.comment.length}/10)
                </p>
              </div>

              {/* Guidelines */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Review Guidelines</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Be honest and provide detailed feedback</li>
                  <li>• Focus on the product quality and your experience</li>
                  <li>• Avoid including personal information</li>
                  <li>• Be respectful and constructive</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowWriteReview(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (newReview.comment.length < 10) {
                    alert('Please write at least 10 characters in your review.');
                    return;
                  }
                  
                  try {
                    // For now, just add to local state (in real app, would call API)
                    const mockNewReview: Review = {
                      id: `review-${Date.now()}`,
                      userId: 'current-user',
                      productId: productId,
                      user: { 
                        _id: 'current-user', 
                        email: 'user@example.com', 
                        fullName: 'Current User', 
                        role: 'user', 
                        createdAt: new Date(), 
                        updatedAt: new Date() 
                      },
                      rating: newReview.rating,
                      title: newReview.title || 'Customer Review',
                      comment: newReview.comment,
                      isVerified: false,
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString()
                    };
                    
                    setReviews(prev => [mockNewReview, ...prev]);
                    setNewReview({ rating: 5, title: '', comment: '' });
                    setShowWriteReview(false);
                    
                    // In real app, call the API:
                    // await reviewsAPI.createReview(productId, newReview);
                  } catch (error) {
                    console.error('Error submitting review:', error);
                    alert('Failed to submit review. Please try again.');
                  }
                }}
                disabled={newReview.comment.length < 10}
                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
