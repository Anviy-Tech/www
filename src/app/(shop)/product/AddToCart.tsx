"use client";
import { useCart } from '@/store/cart';

type Props = { id: string; slug: string; name: string; price: number; image: string };

export default function AddToCart(props: Props) {
  const addItemLocal = useCart(s => s.addItemLocal);
  return (
    <button className="btn" onClick={() => addItemLocal({
      id: props.id,
      productId: props.id,
      name: props.name,
      price: props.price,
      image: props.image,
      slug: props.slug
    })}>
      Add to cart
    </button>
  );
}


