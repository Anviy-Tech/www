import { notFound } from 'next/navigation';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import SimilarProducts from './SimilarProducts';
import ProductReviews from './ProductReviews';
import { productsAPI } from '@/lib/api';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = { params: { slug: string } };

export default async function ProductPage({ params }: Props) {
  try {
    const response = await productsAPI.getProduct(params.slug);
    const product = response.product;
    
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

            {/* Premium Materials */}
            <div className="text-center group">
              <div className="bg-white/60 backdrop-blur-sm border border-[#ADC2C2]/30 rounded-lg p-6 lg:p-8 mb-4 transition-all duration-300 hover:bg-white/80 hover:border-[#916849]/30 hover:shadow-lg">
                <div className="w-16 h-16 bg-[#E7C3A8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-[#916849]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l14 9-14 9V3z"/>
                  </svg>
                </div>
                <h3 className="text-[#916849] font-medium text-sm lg:text-base mb-2">Premium Materials</h3>
                <p className="text-[#8DA7A8] text-xs lg:text-sm leading-relaxed">
                  Carefully selected high-quality materials
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
                  {/* Dynamic specifications based on product data */}
                  <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                    <span className="text-[#8DA7A8]">Category</span>
                    <span className="font-medium text-[#916849] capitalize">
                      {'Jewelry'}
                    </span>
                  </div>
                  
                  {product.jewelryAttributes?.metalType && (
                    <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                      <span className="text-[#8DA7A8]">Metal Type</span>
                      <span className="font-medium text-[#916849]">{product.jewelryAttributes.metalType}</span>
                    </div>
                  )}
                  
                  {product.jewelryAttributes?.gemstoneDetails?.type && (
                    <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                      <span className="text-[#8DA7A8]">Gemstone</span>
                      <span className="font-medium text-[#916849]">{product.jewelryAttributes.gemstoneDetails.type}</span>
                    </div>
                  )}
                  
                  {product.jewelryAttributes?.gemstoneDetails?.caratWeight && (
                    <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                      <span className="text-[#8DA7A8]">Carat Weight</span>
                      <span className="font-medium text-[#916849]">{product.jewelryAttributes.gemstoneDetails.caratWeight} ct</span>
                    </div>
                  )}
                  
                  {product.jewelryAttributes?.gemstoneDetails?.clarity && (
                    <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                      <span className="text-[#8DA7A8]">Clarity</span>
                      <span className="font-medium text-[#916849]">{product.jewelryAttributes.gemstoneDetails.clarity}</span>
                    </div>
                  )}
                  
                  {product.jewelryAttributes?.gemstoneDetails?.cut && (
                    <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                      <span className="text-[#8DA7A8]">Cut</span>
                      <span className="font-medium text-[#916849]">{product.jewelryAttributes.gemstoneDetails.cut}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {product.inventory?.weight && (
                    <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                      <span className="text-[#8DA7A8]">Weight</span>
                      <span className="font-medium text-[#916849]">{product.inventory.weight}g</span>
                    </div>
                  )}
                  
                  {product.jewelryAttributes?.dimensions && (
                    <>
                      {product.jewelryAttributes.dimensions.width && product.jewelryAttributes.dimensions.height && (
                        <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                          <span className="text-[#8DA7A8]">Dimensions</span>
                          <span className="font-medium text-[#916849]">
                            {product.jewelryAttributes.dimensions.width}mm x {product.jewelryAttributes.dimensions.height}mm
                          </span>
                        </div>
                      )}
                      
                      {product.jewelryAttributes.dimensions.ringSize && (
                        <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                          <span className="text-[#8DA7A8]">Ring Size</span>
                          <span className="font-medium text-[#916849]">{product.jewelryAttributes.dimensions.ringSize}</span>
                        </div>
                      )}
                      
                      {product.jewelryAttributes.dimensions.chainLength && (
                        <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                          <span className="text-[#8DA7A8]">Chain Length</span>
                          <span className="font-medium text-[#916849]">{product.jewelryAttributes.dimensions.chainLength}"</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  {product.inventory?.sku && (
                    <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                      <span className="text-[#8DA7A8]">SKU</span>
                      <span className="font-medium text-[#916849]">{product.inventory.sku}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                    <span className="text-[#8DA7A8]">Stock</span>
                    <span className="font-medium text-[#916849]">{product.stock} pieces</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-[#ADC2C2]/30">
                    <span className="text-[#8DA7A8]">Warranty</span>
                    <span className="font-medium text-[#916849]">1 Year</span>
                  </div>
                </div>
              </div>
              
              {/* Certification Information */}
              {product.jewelryAttributes?.certification && (
                <div className="mt-8 p-6 bg-green-50 rounded-lg">
                  <h3 className="text-xl font-medium text-[#916849] mb-4">Certification Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.jewelryAttributes.certification.certificateNumber && (
                      <div className="flex justify-between py-2 border-b border-green-200">
                        <span className="text-[#8DA7A8]">Certificate Number</span>
                        <span className="font-medium text-[#916849]">{product.jewelryAttributes.certification.certificateNumber}</span>
                      </div>
                    )}
                    {product.jewelryAttributes.certification.issuingAuthority && (
                      <div className="flex justify-between py-2 border-b border-green-200">
                        <span className="text-[#8DA7A8]">Issuing Authority</span>
                        <span className="font-medium text-[#916849]">{product.jewelryAttributes.certification.issuingAuthority}</span>
                      </div>
                    )}
                    {product.jewelryAttributes.certification.grade && (
                      <div className="flex justify-between py-2 border-b border-green-200">
                        <span className="text-[#8DA7A8]">Grade</span>
                        <span className="font-medium text-[#916849]">{product.jewelryAttributes.certification.grade}</span>
                      </div>
                    )}
                    {product.jewelryAttributes.certification.issueDate && (
                      <div className="flex justify-between py-2 border-b border-green-200">
                        <span className="text-[#8DA7A8]">Issue Date</span>
                        <span className="font-medium text-[#916849]">
                          {new Date(product.jewelryAttributes.certification.issueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
      <ProductReviews productId={product._id} />

      {/* Similar Products */}
      <SimilarProducts currentProduct={product} />
    </div>
  );
  } catch (error) {
    console.error('Error fetching product:', error);
    return notFound();
  }
}


