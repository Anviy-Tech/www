'use client';
import React from 'react';

// Base skeleton component with shimmer effect
interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  animated?: boolean;
}

export function Skeleton({ 
  className = '', 
  width, 
  height, 
  rounded = false, 
  animated = true 
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 animate-pulse';
  const roundedClasses = rounded ? 'rounded-full' : 'rounded';
  const animatedClasses = animated ? 'animate-pulse' : '';
  
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div 
      className={`${baseClasses} ${roundedClasses} ${animatedClasses} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

// Product card skeleton
export function ProductCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white border border-gray-100 shadow-sm ${className}`}>
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200 animate-pulse" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <Skeleton width="30%" height={12} />
        
        {/* Title */}
        <Skeleton width="80%" height={20} />
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton width="100%" height={14} />
          <Skeleton width="70%" height={14} />
        </div>
        
        {/* Price and action */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <Skeleton width="25%" height={20} />
          <Skeleton width={32} height={32} rounded />
        </div>
      </div>
    </div>
  );
}

// Product grid skeleton
export function ProductGridSkeleton({ 
  count = 8, 
  className = '' 
}: { 
  count?: number; 
  className?: string; 
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-12 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton 
          key={index} 
          className={`animate-reveal-delay-${Math.min(index % 4, 3)}`}
        />
      ))}
    </div>
  );
}

// Hero section skeleton
export function HeroSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`min-h-[90vh] bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
      <div className="text-center space-y-6">
        <Skeleton width={400} height={60} className="mx-auto" />
        <Skeleton width={300} height={24} className="mx-auto" />
        <div className="flex gap-4 justify-center">
          <Skeleton width={120} height={48} />
          <Skeleton width={120} height={48} />
        </div>
      </div>
    </div>
  );
}

// Collection section skeleton
export function CollectionSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`py-16 ${className}`}>
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Skeleton width={300} height={40} className="mx-auto" />
          <Skeleton width={200} height={20} className="mx-auto" />
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton width="100%" height={300} />
              <Skeleton width="60%" height={24} />
              <Skeleton width="40%" height={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Cart item skeleton
export function CartItemSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white p-6 border border-gray-100 ${className}`}>
      <div className="flex gap-4">
        {/* Image */}
        <Skeleton width={80} height={80} />
        
        {/* Content */}
        <div className="flex-1 space-y-3">
          <Skeleton width="60%" height={20} />
          <Skeleton width="40%" height={16} />
          <div className="flex items-center justify-between">
            <Skeleton width={80} height={24} />
            <Skeleton width={100} height={32} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Cart page skeleton
export function CartPageSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`py-16 ${className}`}>
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            <Skeleton width={200} height={32} />
            {Array.from({ length: 3 }).map((_, index) => (
              <CartItemSkeleton key={index} />
            ))}
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 border border-gray-100 space-y-4">
              <Skeleton width={150} height={24} />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton width={80} height={16} />
                  <Skeleton width={60} height={16} />
                </div>
                <div className="flex justify-between">
                  <Skeleton width={100} height={16} />
                  <Skeleton width={60} height={16} />
                </div>
                <div className="flex justify-between">
                  <Skeleton width={60} height={16} />
                  <Skeleton width={60} height={16} />
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <Skeleton width={80} height={24} />
                  <Skeleton width={80} height={24} />
                </div>
              </div>
              <Skeleton width="100%" height={48} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Search results skeleton
export function SearchResultsSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`py-16 ${className}`}>
      <div className="container-page">
        {/* Search header */}
        <div className="mb-8">
          <Skeleton width={300} height={32} />
          <Skeleton width={200} height={16} className="mt-2" />
        </div>
        
        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} width={100} height={40} />
          ))}
        </div>
        
        {/* Results */}
        <ProductGridSkeleton count={12} />
      </div>
    </div>
  );
}

// Profile page skeleton
export function ProfileSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`py-16 ${className}`}>
      <div className="container-page">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Skeleton width={120} height={120} rounded className="mx-auto" />
            <Skeleton width={200} height={32} className="mx-auto" />
            <Skeleton width={150} height={20} className="mx-auto" />
          </div>
          
          {/* Form sections */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton width={120} height={24} />
              <Skeleton width="100%" height={48} />
            </div>
          ))}
          
          {/* Save button */}
          <Skeleton width={120} height={48} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}

// Table skeleton
export function TableSkeleton({ 
  rows = 5, 
  columns = 4, 
  className = '' 
}: { 
  rows?: number; 
  columns?: number; 
  className?: string; 
}) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} width={120} height={20} />
          ))}
        </div>
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="flex gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} width={120} height={20} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Navigation skeleton
export function NavigationSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="container-page py-4">
        <div className="flex items-center justify-between">
          <Skeleton width={100} height={32} />
          <div className="flex gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} width={80} height={20} />
            ))}
          </div>
          <div className="flex gap-4">
            <Skeleton width={24} height={24} />
            <Skeleton width={24} height={24} />
            <Skeleton width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Footer skeleton
export function FooterSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-900 text-white py-16 ${className}`}>
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton width={120} height={24} />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, linkIndex) => (
                  <Skeleton key={linkIndex} width={100} height={16} />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <Skeleton width={200} height={16} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}

// Default export - Simple loading skeleton for general use
export default function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
