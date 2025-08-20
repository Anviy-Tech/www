import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  slug: string;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  setQty: (id: string, qty: number) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) =>
        set(({ items }) => {
          const existing = items.find(i => i.id === item.id);
          if (existing) {
            return {
              items: items.map(i => (i.id === item.id ? { ...i, qty: i.qty + qty } : i)),
            };
          }
          return { items: [{ ...item, qty }, ...items] };
        }),
      remove: (id) => set(({ items }) => ({ items: items.filter(i => i.id !== id) })),
      clear: () => set({ items: [] }),
      setQty: (id, qty) => set(({ items }) => ({ items: items.map(i => (i.id === id ? { ...i, qty } : i)) })),
    }),
    { name: 'anviy-cart', storage: createJSONStorage(() => localStorage) }
  )
);

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}


