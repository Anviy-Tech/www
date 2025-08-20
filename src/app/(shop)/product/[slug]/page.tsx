import { notFound } from 'next/navigation';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import SimilarProducts from './SimilarProducts';
import ProductReviews from './ProductReviews';
import { products } from '@/data/products';

type Props = { params: { slug: string } };

export default function ProductPage({ params }: Props) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-secondary">
      {/* Product Hero Section */}
      <section className="container-page py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <ProductGallery product={product} />
          <ProductDetails product={product} />
        </div>
      </section>

      {/* Product Information Tabs */}
      <section className="bg-white">
        <div className="container-page py-20">
          <div className="max-w-4xl mx-auto">
            {/* Product Specifications */}
            <div className="mb-16">
              <h2 className="text-display text-3xl mb-8">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border-light">
                    <span className="text-text-secondary">Material</span>
                    <span className="font-medium">18K Gold Vermeil</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border-light">
                    <span className="text-text-secondary">Base Metal</span>
                    <span className="font-medium">Sterling Silver</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border-light">
                    <span className="text-text-secondary">Stone</span>
                    <span className="font-medium">Lab-grown Diamond</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border-light">
                    <span className="text-text-secondary">Category</span>
                    <span className="font-medium capitalize">{product.tags[0] || 'Jewelry'}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border-light">
                    <span className="text-text-secondary">Weight</span>
                    <span className="font-medium">2.3g</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border-light">
                    <span className="text-text-secondary">Dimensions</span>
                    <span className="font-medium">15mm x 12mm</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border-light">
                    <span className="text-text-secondary">Warranty</span>
                    <span className="font-medium">Lifetime</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border-light">
                    <span className="text-text-secondary">Stock</span>
                    <span className="font-medium">{product.stock} pieces</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Care Instructions */}
            <div className="mb-16">
              <h2 className="text-display text-3xl mb-8">Care Instructions</h2>
              <div className="prose prose-lg max-w-none text-text-secondary">
                <ul className="space-y-3">
                  <li>Store in a cool, dry place away from direct sunlight</li>
                  <li>Clean gently with a soft, lint-free cloth</li>
                  <li>Avoid contact with perfumes, lotions, and harsh chemicals</li>
                  <li>Remove before swimming, showering, or exercising</li>
                  <li>Professional cleaning recommended every 6 months</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ProductReviews />

      {/* Similar Products */}
      <SimilarProducts currentProduct={product} />
    </div>
  );
}


