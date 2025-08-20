"use client";
import { useCart } from '@/store/cart';

type Props = { id: string; slug: string; name: string; price: number; image: string };

export default function AddToCart(props: Props) {
  const add = useCart(s => s.add);
  return (
    <button className="btn" onClick={() => add(props)}>
      Add to cart
    </button>
  );
}


