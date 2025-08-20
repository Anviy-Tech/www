import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';

export default function NewArrivalsPage() {
  // Show newest products (last 4 in array)
  const newProducts = products.slice(-4);
  
  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-semibold">New Arrivals</h1>
      <p className="mt-2 text-neutral-700">Fresh designs just added to our collection</p>
      
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newProducts.map((p) => (
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
