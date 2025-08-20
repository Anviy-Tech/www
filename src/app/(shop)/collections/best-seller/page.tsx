import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';

export default function BestSellerPage() {
  // Show products with high stock as "best sellers"
  const bestSellers = products.filter(p => p.stock > 30);
  
  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-semibold">Best Sellers</h1>
      <p className="mt-2 text-neutral-700">Our most popular pieces loved by customers</p>
      
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestSellers.map((p) => (
          <Link key={p.id} href={`/product/${p.slug}`} className="card overflow-hidden">
            <Image src={p.image} alt={p.name} width={800} height={800} className="w-full aspect-square object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{p.name}</p>
                <p className="text-neutral-700">₹{p.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
