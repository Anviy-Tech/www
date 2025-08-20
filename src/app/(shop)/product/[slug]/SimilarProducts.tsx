"use client";
import { Product, products } from '@/data/products';
import ProductCard from '../../components/ProductCard';

interface SimilarProductsProps {
  currentProduct: Product;
}

export default function SimilarProducts({ currentProduct }: SimilarProductsProps) {
  // Get similar products based on tags
  const similarProducts = products
    .filter(p => 
      p.id !== currentProduct.id && 
      p.tags.some(tag => currentProduct.tags.includes(tag))
    )
    .slice(0, 4);

  // If not enough similar products, fill with random ones
  const remainingSlots = 4 - similarProducts.length;
  if (remainingSlots > 0) {
    const randomProducts = products
      .filter(p => p.id !== currentProduct.id && !similarProducts.includes(p))
      .slice(0, remainingSlots);
    similarProducts.push(...randomProducts);
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
              key={product.id}
              product={product}
              className={`animate-reveal-delay-${i % 4}`}
            />
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-16">
          <a 
            href={`/shop?tag=${currentProduct.tags[0]}`}
            className="btn-secondary"
          >
            View All {currentProduct.tags[0]?.charAt(0).toUpperCase() + currentProduct.tags[0]?.slice(1) || 'Products'}
          </a>
        </div>
      </div>
    </section>
  );
}
