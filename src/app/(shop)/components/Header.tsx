"use client";
import Link from 'next/link';
import { useCart } from '@/store/cart';
import { useFavorites } from '@/store/favorites';
import { useState } from 'react';

export default function Header() {
  const items = useCart(s => s.items);
  const favoriteItems = useFavorites(s => s.items);
  const count = items.reduce((n, i) => n + i.qty, 0);
  const favoriteCount = favoriteItems.length;
  const [query, setQuery] = useState('');
  
  return (
    <header className="nav-minimal sticky top-0 z-50">
      <div className="container-page py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-display text-2xl tracking-tight">
            ANVIY
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            <Link href="/collections/new" className="nav-link">New Arrivals</Link>
            <Link href="/shop?tag=ring" className="nav-link">Rings</Link>
            <Link href="/shop?tag=necklace" className="nav-link">Necklaces</Link>
            <Link href="/shop?tag=earrings" className="nav-link">Earrings</Link>
            <Link href="/shop?tag=bracelet" className="nav-link">Bracelets</Link>
            <Link href="/about" className="nav-link">About Us</Link>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:block">
              <input 
                value={query} 
                onChange={e=>setQuery(e.target.value)} 
                placeholder="Search pieces..." 
                className="input-minimal w-64 text-sm"
              />
            </div>
            
            {/* Favorites */}
            <Link href="/favorites" className="nav-link relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>
            
            {/* Cart */}
            <Link href="/cart" className="nav-link relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4z"/>
              </svg>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


