"use client";
import { useState } from 'react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Priya S.',
    rating: 5,
    date: '2024-01-15',
    title: 'Absolutely stunning piece!',
    content: 'The quality exceeded my expectations. The gold vermeil finish is beautiful and the craftsmanship is impeccable. I\'ve been wearing it daily for weeks and it still looks brand new.',
    verified: true,
    helpful: 12
  },
  {
    id: '2',
    author: 'Arjun K.',
    rating: 5,
    date: '2024-01-10',
    title: 'Perfect gift',
    content: 'Bought this for my wife\'s anniversary and she absolutely loves it. The packaging was elegant and the piece itself is even more beautiful in person.',
    verified: true,
    helpful: 8
  },
  {
    id: '3',
    author: 'Sneha M.',
    rating: 4,
    date: '2024-01-05',
    title: 'Beautiful but delicate',
    content: 'Gorgeous piece with excellent attention to detail. Only giving 4 stars because it seems quite delicate, so I\'m careful when wearing it. But the beauty makes up for it.',
    verified: true,
    helpful: 5
  }
];

export default function ProductReviews() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  const averageRating = 4.8;
  const totalReviews = 127;
  
  const ratingDistribution = [
    { stars: 5, count: 98, percentage: 77 },
    { stars: 4, count: 23, percentage: 18 },
    { stars: 3, count: 4, percentage: 3 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 }
  ];

  const filteredReviews = selectedRating 
    ? mockReviews.filter(review => review.rating === selectedRating)
    : mockReviews;

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
                  {averageRating}
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
              <button className="btn-primary w-full">
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
                {filteredReviews.map((review) => (
                  <div key={review.id} className="border-b border-border-light pb-8 last:border-b-0">
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
                          <h3 className="font-medium text-text-primary">{review.title}</h3>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-text-secondary">
                          <span>{review.author}</span>
                          {review.verified && (
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
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-text-secondary leading-relaxed mb-4">
                      {review.content}
                    </p>

                    {/* Review Actions */}
                    <div className="flex items-center space-x-4 text-sm">
                      <button className="flex items-center space-x-2 text-text-muted hover:text-text-secondary transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                        </svg>
                        <span>Helpful ({review.helpful})</span>
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
    </section>
  );
}
