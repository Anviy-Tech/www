"use client";
import { useState } from 'react';
import { products as seedProducts, type Product } from '@/data/products';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [draft, setDraft] = useState<Partial<Product>>({});

  function handleCreate() {
    if (!draft.name || !draft.price || !draft.image) return;
    const slug = (draft.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct: Product = {
      id: `${slug}-${Date.now()}`,
      slug,
      name: draft.name!,
      price: Number(draft.price),
      image: draft.image!,
      description: draft.description || '',
      tags: [],
      stock: Number(draft.stock || 0)
    };
    setProducts([newProduct, ...products]);
    setDraft({});
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold">Create product</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input placeholder="Name" className="border rounded-lg px-3 py-2" value={draft.name || ''} onChange={e=>setDraft({ ...draft, name: e.target.value })} />
          <input placeholder="Price" type="number" className="border rounded-lg px-3 py-2" value={draft.price?.toString() || ''} onChange={e=>setDraft({ ...draft, price: Number(e.target.value) })} />
          <input placeholder="Image URL" className="border rounded-lg px-3 py-2" value={draft.image || ''} onChange={e=>setDraft({ ...draft, image: e.target.value })} />
          <input placeholder="Stock" type="number" className="border rounded-lg px-3 py-2" value={draft.stock?.toString() || ''} onChange={e=>setDraft({ ...draft, stock: Number(e.target.value) })} />
          <input placeholder="Description" className="sm:col-span-3 border rounded-lg px-3 py-2" value={draft.description || ''} onChange={e=>setDraft({ ...draft, description: e.target.value })} />
        </div>
        <div className="mt-4"><button className="btn" onClick={handleCreate}>Add product</button></div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold">Catalog ({products.length})</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-600">
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Slug</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">₹{p.price}</td>
                  <td className="p-2">{p.stock}</td>
                  <td className="p-2 text-neutral-500">{p.slug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


