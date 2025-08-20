import { Suspense } from 'react';
import ShopContent from './ShopContent';

function ShopLoading() {
  return (
    <div className="container-page section-standard">
      <div className="mb-16">
        <h1 className="text-display text-4xl lg:text-5xl mb-6">Our Collection</h1>
        <div className="divider"></div>
        <p className="text-xl text-text-secondary max-w-2xl">
          Discover handcrafted pieces that embody timeless elegance and contemporary sophistication.
        </p>
      </div>
      
      <div className="mb-12">
        <div className="text-small-caps text-xs text-text-muted mb-6 tracking-widest">
          FILTER BY CATEGORY
        </div>
        <div className="flex flex-wrap gap-4">
          {['All', 'Necklace', 'Earrings', 'Bracelet', 'Ring', 'Mens', 'Mangalsutra'].map(c => (
            <div 
              key={c} 
              className="px-6 py-3 text-sm font-medium tracking-wide border border-border animate-pulse"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white animate-pulse">
            <div className="aspect-square bg-gray-200 mb-4"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 mb-2"></div>
              <div className="h-4 bg-gray-200 w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopContent />
    </Suspense>
  );
}


