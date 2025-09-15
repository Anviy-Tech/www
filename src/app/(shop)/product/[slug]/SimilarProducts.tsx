"use client";
import { useEffect, useState } from 'react';
import { Product } from '@/types/api';
import { productsAPI } from '@/lib/api';
import ProductCard from '../../components/ProductCard';

interface SimilarProductsProps {
  currentProduct: Product;
}

export default function SimilarProducts({ currentProduct }: SimilarProductsProps) {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true);
        
        // Get products from the same category
        const response = await productsAPI.getProductsByCategory(currentProduct.category?._id, {
          page: 1,
          limit: 8
        });
        
        // Filter out the current product
        const filtered = response.products.filter(p => p._id !== currentProduct._id);
        setSimilarProducts(filtered.slice(0, 4));
      } catch (error) {
        console.error('Error fetching similar products:', error);
        setSimilarProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [currentProduct._id, currentProduct.category?._id]);

  if (loading) {
    return (
      <section className="bg-secondary">
        <div className="container-page py-20">
          <div className="mb-16 text-center">
            <h2 className="text-display text-4xl lg:text-5xl mb-6">
              You might also love
            </h2>
            <div className="divider"></div>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Handpicked pieces that complement your style perfectly
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (similarProducts.length === 0) return null;

  return (
    <section className="bg-secondary">
      <div className="container-page py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-display text-4xl lg:text-5xl mb-6">
            You might also love
          </h2>
          <div className="divider"></div>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Handpicked pieces that complement your style perfectly
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {similarProducts.map((product, i) => (
            <ProductCard 
              key={product._id}
              product={product}
              className={`animate-reveal-delay-${i % 4}`}
            />
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-16">
          <a 
            href={`/shop?tag=${currentProduct.category?._id}`}
            className="btn-secondary"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
