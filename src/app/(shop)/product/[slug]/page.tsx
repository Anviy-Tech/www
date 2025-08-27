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

      {/* Finest Quality Infographic Section */}
      <section className="bg-gradient-to-br from-[#E0D6D6] via-white to-[#E0D6D6] py-16 lg:py-24">
        <div className="container-page">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-display text-3xl lg:text-4xl mb-4 text-[#916849]">
              Finest Quality
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#916849] to-transparent mx-auto mb-6"></div>
            <p className="text-[#8DA7A8] text-lg max-w-2xl mx-auto">
              Crafted with premium materials and exceptional attention to detail
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Skin Safe Jewellery */}
            <div className="text-center group">
              <div className="bg-white/60 backdrop-blur-sm border border-[#ADC2C2]/30 rounded-lg p-6 lg:p-8 mb-4 transition-all duration-300 hover:bg-white/80 hover:border-[#916849]/30 hover:shadow-lg">
                <div className="w-16 h-16 bg-[#E7C3A8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-[#916849]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <h3 className="text-[#916849] font-medium text-sm lg:text-base mb-2">Skin Safe Jewellery</h3>
                <p className="text-[#8DA7A8] text-xs lg:text-sm leading-relaxed">
                  Hypoallergenic materials safe for sensitive skin
                </p>
              </div>
            </div>

            {/* 18K Gold Plating */}
            <div className="text-center group">
              <div className="bg-white/60 backdrop-blur-sm border border-[#ADC2C2]/30 rounded-lg p-6 lg:p-8 mb-4 transition-all duration-300 hover:bg-white/80 hover:border-[#916849]/30 hover:shadow-lg">
                <div className="w-16 h-16 bg-[#E7C3A8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-[#916849]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
                <h3 className="text-[#916849] font-medium text-sm lg:text-base mb-2">18K Gold Plating</h3>
                <p className="text-[#8DA7A8] text-xs lg:text-sm leading-relaxed">
                  Premium gold plating for lasting brilliance
                </p>
              </div>
            </div>

            {/* Hypoallergenic */}
            <div className="text-center group">
              <div className="bg-white/60 backdrop-blur-sm border border-[#ADC2C2]/30 rounded-lg p-6 lg:p-8 mb-4 transition-all duration-300 hover:bg-white/80 hover:border-[#916849]/30 hover:shadow-lg">
                <div className="w-16 h-16 bg-[#E7C3A8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-[#916849]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-[#916849] font-medium text-sm lg:text-base mb-2">Hypoallergenic</h3>
                <p className="text-[#8DA7A8] text-xs lg:text-sm leading-relaxed">
                  Nickel-free materials for maximum comfort
                </p>
              </div>
            </div>

            {/* Water Resistant */}
            <div className="text-center group">
              <div className="bg-white/60 backdrop-blur-sm border border-[#ADC2C2]/30 rounded-lg p-6 lg:p-8 mb-4 transition-all duration-300 hover:bg-white/80 hover:border-[#916849]/30 hover:shadow-lg">
                <div className="w-16 h-16 bg-[#E7C3A8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-[#916849]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
                <h3 className="text-[#916849] font-medium text-sm lg:text-base mb-2">Water Resistant</h3>
                <p className="text-[#8DA7A8] text-xs lg:text-sm leading-relaxed">
                  Safe for daily wear and water exposure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Information Tabs */}
      <section className="bg-white">
        <div className="container-page py-20">
          <div className="max-w-4xl mx-auto">
            {/* Product Specifications */}
            <div className="mb-16">
              <h2 className="text-display text-3xl mb-8 text-[#916849]">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                    <span className="text-[#8DA7A8]">Material</span>
                    <span className="font-medium text-[#916849]">18K Gold Plated</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                    <span className="text-[#8DA7A8]">Base Metal</span>
                    <span className="font-medium text-[#916849]">316L Stainless Steel</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                    <span className="text-[#8DA7A8]">Stone</span>
                    <span className="font-medium text-[#916849]">Premium Zirconia</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                    <span className="text-[#8DA7A8]">Category</span>
                    <span className="font-medium text-[#916849] capitalize">{product.tags[0] || 'Jewelry'}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                    <span className="text-[#8DA7A8]">Weight</span>
                    <span className="font-medium text-[#916849]">2.3g</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                    <span className="text-[#8DA7A8]">Dimensions</span>
                    <span className="font-medium text-[#916849]">15mm x 12mm</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                    <span className="text-[#8DA7A8]">Warranty</span>
                    <span className="font-medium text-[#916849]">1 Year</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                    <span className="text-[#8DA7A8]">Stock</span>
                    <span className="font-medium text-[#916849]">{product.stock} pieces</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Care Instructions */}
            <div className="mb-16">
              <h2 className="text-display text-3xl mb-8 text-[#916849]">Care Instructions</h2>
              <div className="bg-[#E0D6D6]/30 rounded-lg p-6 lg:p-8">
                <ul className="space-y-3 text-[#8DA7A8]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#E7C3A8] mt-1">•</span>
                    <span>Store in a cool, dry place away from direct sunlight</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E7C3A8] mt-1">•</span>
                    <span>Clean gently with a soft, lint-free cloth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E7C3A8] mt-1">•</span>
                    <span>Avoid contact with perfumes, lotions, and harsh chemicals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E7C3A8] mt-1">•</span>
                    <span>Safe for water exposure - can be worn while showering</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E7C3A8] mt-1">•</span>
                    <span>Professional cleaning recommended every 6 months</span>
                  </li>
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


