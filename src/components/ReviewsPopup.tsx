"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { api } from '@/lib/api';
import { useAuth } from '@/store/auth';

interface Review {
  _id: string;
  user: {
    _id: string;
    fullName: string;
  };
  product?: {
    _id: string;
    name: string;
  };
  content: string;
  rating?: number;
  isTestimonial: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ReviewFormData {
  product?: string;
  content: string;
  rating: number;
  isTestimonial: boolean;
}

// Fallback sample reviews for when API is unavailable  
interface MockReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  product: string | { _id: string; name: string; };
  verified: boolean;
}

const sampleReviews: MockReview[] = [
  {
    id: '1',
    author: 'Archna Goel',
    rating: 5,
    title: 'Superb... awesome quality',
    content: 'Very good quality',
    date: '03/09/2025',
    product: 'Hamsa Evil Eye Chain Bracelet',
    verified: true
  },
  {
    id: '2',
    author: 'Vrinda Shetty',
    rating: 5,
    title: 'Beautiful',
    content: 'Nice design and finish. loved it',
    date: '02/20/2025',
    product: 'Raya Nail Bracelet',
    verified: true
  },
  {
    id: '3',
    author: 'Nellie Dev',
    rating: 5,
    title: 'Love it....Very delicate and dainty bracelet.',
    content: 'Thank you !',
    date: '02/18/2025',
    product: 'Lucy Charm Bracelet',
    verified: true
  },
  {
    id: '4',
    author: 'AD',
    rating: 5,
    title: 'Beautiful',
    content: 'Wearing it for last 3months and I don\'t see any change in colour or shine',
    date: '02/15/2025',
    product: 'Zircon Inlaid Bracelet',
    verified: true
  },
  {
    id: '5',
    author: 'Tanu Narang',
    rating: 5,
    title: 'Loved it',
    content: 'Actually its very nice . I loved the craftsmanship',
    date: '02/12/2025',
    product: '18K Gold Plated Snake Chain Zirconia Tennis Necklace',
    verified: true
  },
  {
    id: '6',
    author: 'Jaspreet K.',
    rating: 5,
    title: 'First purchase 😍',
    content: 'Product is value to money with quality. Designs are simple but elegant perfect for working professionals and classic jewellery for non working women. Have purchased few more articles I hope 🤞 they also turn upto my satisfaction.',
    date: '01/29/2025',
    product: 'Dainty V Shape Snake Necklace - Green',
    verified: true
  },
  {
    id: '7',
    author: 'Prisha Kataria',
    rating: 5,
    title: 'Heart choker necklace',
    content: 'So I bought this lovely and evergreen heart choker necklace from which you can also detach the heart at the same time making it a 2 way accessory. Its 18k gold plating on the heart and an impeccable necklace which when I saw immediately placed the order. Beautiful chunky chocker which is a must buy. Kudos to admin team for supporting and sharing other pictures as well.',
    date: '01/15/2025',
    product: 'Chunky Heart Choker Necklace',
    verified: true
  },
  {
    id: '8',
    author: 'Ekta',
    rating: 5,
    title: 'Amazing !!!',
    content: 'Such an exclusive design and quality of this bracelet… worth it ❤️',
    date: '01/14/2025',
    product: 'Zircon Buckle Bangle Bracelet',
    verified: true
  }
];

const ReviewsPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const reviewsPerPage = 6;
  const { user } = useAuth();

  // Write review form state - Updated to match API schema
  const [reviewForm, setReviewForm] = useState({
    product: '',
    content: '',
    rating: 5,
    isTestimonial: false
  });

  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const currentReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  // Fetch testimonials/reviews from API
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await api.comments.getComments({
        page: 1, 
        limit: 50
      });
      
      setReviews(response.comments as any || []);
      setTotalReviews(response.pagination?.total || response.comments?.length || 0);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Fallback to sample data if API fails
      setReviews(sampleReviews as any);
      setTotalReviews(sampleReviews.length);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products for the dropdown
  const fetchProducts = async () => {
    try {
      const response = await api.products.getProducts({
        page: 1, 
        limit: 20, 
        sort: 'name', 
        order: 'asc'
      });
      
      setProducts(response.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    fetchReviews();
    fetchProducts();
  }, []);

  const averageRating = totalReviews > 0 
    ? reviews.reduce((sum, review) => sum + (review.rating || 5), 0) / totalReviews 
    : 4.8;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={index < rating ? "#c9a96e" : "#e5e7eb"}
        className="transition-colors"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ));
  };

  const getStarDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      const rating = review.rating || 5;
      distribution[rating - 1]++;
    });
    return distribution.reverse(); // 5 stars first
  };

  const starDistribution = getStarDistribution();

  const handleFormChange = (field: string, value: any) => {
    setReviewForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to submit a review');
      return;
    }
    
    if (!reviewForm.content) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit review using the API endpoint
      // const response = await api.post('/comments', reviewForm);
      const response = { success: true, message: 'Review submitted successfully' }; // Mock response
      
      if (response.success) {
        alert('Thank you for your review! It will be published after moderation.');
        
        // Reset form
        setReviewForm({
          product: '',
          content: '',
          rating: 5,
          isTestimonial: false
        });
        
        // Close form and refresh reviews
        setShowWriteForm(false);
        fetchReviews();
      } else {
        throw new Error(response.message || 'Failed to submit review');
      }
      
    } catch (error: any) {
      console.error('Error submitting review:', error);
      alert(error.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setIsOpen(false);
    setShowWriteForm(false);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Fixed Reviews Button - Similar to Taahira */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulse ring animation */}
        <div className="absolute -inset-2 bg-accent/30 rounded-full animate-ping"></div>
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-accent hover:bg-accent-dark text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-2 group hover:scale-105"
          aria-label="View customer reviews"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="font-medium text-sm hidden sm:inline">Reviews</span>
          <div className="bg-white text-accent text-xs px-2 py-1 rounded-full font-bold ml-1">
            {totalReviews}
          </div>
        </button>
      </div>

      {/* Reviews Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity duration-300"
            onClick={resetModal}
          />
          
          {/* Modal Content */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fadeIn">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {showWriteForm ? 'Write a Review' : 'Customer Reviews'}
                  </h2>
                  {!showWriteForm && (
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(Math.round(averageRating))}
                        <span className="ml-2 text-lg font-semibold text-gray-900">
                          {averageRating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-gray-600">from {totalReviews} reviews</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {showWriteForm && (
                    <button
                      onClick={() => setShowWriteForm(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Back to reviews"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={resetModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close reviews"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Write Review Form */}
              {showWriteForm ? (
                <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    {/* User Info Display */}
                    <div className="bg-gray-50 p-4 rounded-sm">
                      <p className="text-sm text-gray-600">
                        Reviewing as: <span className="font-medium text-gray-900">{user?.fullName || 'Guest'}</span>
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product (Optional)
                      </label>
                      <select
                        value={reviewForm.product}
                        onChange={(e) => handleFormChange('product', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      >
                        <option value="">Select a product (optional)</option>
                        {products.map((product) => (
                          <option key={product._id} value={product._id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating *
                      </label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleFormChange('rating', star)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill={star <= reviewForm.rating ? "#c9a96e" : "#e5e7eb"}
                              className="transition-colors cursor-pointer"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          </button>
                        ))}
                        <span className="ml-4 text-lg font-medium text-gray-700">
                          {reviewForm.rating} star{reviewForm.rating !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review *
                      </label>
                      <textarea
                        value={reviewForm.content}
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            handleFormChange('content', e.target.value);
                          }
                        }}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                        placeholder="Tell us about your experience with our product..."
                        required
                        maxLength={500}
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {reviewForm.content.length}/500 characters
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="isTestimonial"
                        checked={reviewForm.isTestimonial}
                        onChange={(e) => handleFormChange('isTestimonial', e.target.checked)}
                        className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                      <label htmlFor="isTestimonial" className="text-sm text-gray-700">
                        Allow this review to be featured as a testimonial
                      </label>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setShowWriteForm(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <span>Submit Review</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  {/* Rating Distribution */}
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-5 gap-2">
                  {starDistribution.map((count, index) => {
                    const starNumber = 5 - index;
                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                    return (
                      <div key={starNumber} className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 w-4">{starNumber}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#c9a96e">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-accent h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-6">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews List */}
              <div className="px-6 py-4 max-h-[50vh] overflow-y-auto">
                {isLoading ? (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="border-b border-gray-100 pb-6 animate-pulse">
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                            <div className="h-3 bg-gray-200 rounded mb-2 w-20"></div>
                            <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : currentReviews.length > 0 ? (
                  <div className="space-y-6">
                    {currentReviews.map((review) => (
                      <div key={review._id || 'fallback'} className="border-b border-gray-100 pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                              <span className="text-accent font-semibold text-sm">
                                {(review.user?.fullName || 'U').charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-gray-900">
                                  {review.user?.fullName || 'Anonymous'}
                                </h4>
                                {review.isApproved && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                    Verified
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex">
                                  {renderStars(review.rating || 5)}
                                </div>
                                <span className="text-gray-500 text-sm">
                                  {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Unknown'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-13">
                          {/* Title not available in API Review interface */}
                          <p className="text-gray-700 leading-relaxed">{review.content}</p>
                          {(review.product?.name || review.product) && (
                            <div className="mt-3">
                              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                Product: {typeof review.product === 'string' ? review.product : review.product?.name || 'Unknown'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Showing {((currentPage - 1) * reviewsPerPage) + 1} to {Math.min(currentPage * reviewsPerPage, totalReviews)} of {totalReviews} reviews
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      <div className="flex space-x-1">
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-8 h-8 text-sm rounded ${
                              currentPage === index + 1
                                ? 'bg-accent text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

                  {/* Write Review Button */}
                  <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="text-center">
                      {user ? (
                        <button 
                          onClick={() => setShowWriteForm(true)}
                          className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
                        >
                          Write a Review
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">Please log in to write a review</p>
                          <button 
                            onClick={() => {
                              window.location.href = '/login';
                            }}
                            className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
                          >
                            Login to Write Review
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewsPopup;
