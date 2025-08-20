"use client";
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/data/products';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Generate multiple views for demo (in real app, this would come from product data)
  const images = [
    product.image,
    product.image, // Front view
    product.image, // Side view  
    product.image, // Detail view
  ];

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative group">
        <div 
          className={`relative overflow-hidden bg-white transition-all duration-500 ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <Image
            src={images[selectedImage]}
            alt={product.name}
            width={800}
            height={800}
            className={`w-full aspect-square object-cover transition-transform duration-700 ${
              isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'
            }`}
          />
          
          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
              <path d="M11 8v6M8 11h6"/>
            </svg>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button 
          onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square overflow-hidden bg-white transition-all duration-300 ${
              selectedImage === index 
                ? 'ring-2 ring-accent' 
                : 'hover:ring-2 hover:ring-border'
            }`}
          >
            <Image
              src={image}
              alt={`${product.name} view ${index + 1}`}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 transition-opacity duration-300 ${
              selectedImage === index ? 'bg-transparent' : 'bg-white/20'
            }`} />
          </button>
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center">
        <span className="text-sm text-text-muted">
          {selectedImage + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
