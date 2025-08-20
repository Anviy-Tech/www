import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-soft via-background to-white/50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        {/* 404 Visual */}
        <div className="relative mb-12">
          <h1 className="text-[12rem] sm:text-[16rem] lg:text-[20rem] font-bold leading-none opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Jewelry Icons Animation */}
              <div className="grid grid-cols-3 gap-8 opacity-60">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-strong rounded-2xl flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0s' }}>
                  💍
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-strong rounded-2xl flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                  📿
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-strong rounded-2xl flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>
                  💎
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="card-modern p-8 sm:p-12 mb-8 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Oops!</span> Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            The jewelry piece you're looking for seems to have been misplaced. Don't worry, our collection has plenty of other beautiful treasures waiting to be discovered.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/" className="btn text-lg px-8 py-4">
              ✨ Back to Home
            </Link>
            <Link href="/shop" className="btn-outline text-lg px-8 py-4">
              Browse Collection
            </Link>
          </div>

          {/* Quick Links */}
          <div className="text-sm text-neutral-500">
            <p className="mb-4">Or try one of these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/collections/new" className="hover:text-accent transition-colors">
                New Arrivals
              </Link>
              <Link href="/collections/best-seller" className="hover:text-accent transition-colors">
                Best Sellers
              </Link>
              <Link href="/shop?tag=ring" className="hover:text-accent transition-colors">
                Rings
              </Link>
              <Link href="/shop?tag=necklace" className="hover:text-accent transition-colors">
                Necklaces
              </Link>
              <Link href="/about" className="hover:text-accent transition-colors">
                About Us
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Products Preview */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-semibold mb-6 text-neutral-700">
            While you're here, check out these featured pieces:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: 'Aurora Ring',
                price: '₹2,999',
                image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
                slug: 'aurora-ring'
              },
              {
                name: 'Pearl Necklace',
                price: '₹3,899',
                image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
                slug: 'pearl-drop-necklace'
              },
              {
                name: 'Mini Hoops',
                price: '₹1,999',
                image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
                slug: 'mini-hoops'
              }
            ].map((product, i) => (
              <Link 
                key={product.slug}
                href={`/product/${product.slug}`}
                className="card-modern overflow-hidden group hover-lift"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-accent-strong font-bold">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-sm text-neutral-500 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p>Need help? Contact our support team or visit our FAQ section.</p>
        </div>
      </div>
    </div>
  );
}
