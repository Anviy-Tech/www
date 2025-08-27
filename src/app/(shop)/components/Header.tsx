"use client";
import Link from 'next/link';
import { useCart } from '@/store/cart';
import { useFavorites } from '@/store/favorites';
import { useAuth, useAuthUser, useIsAuthenticated } from '@/store/auth';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const items = useCart(s => s.items);
  const favoriteItems = useFavorites(s => s.items);
  const { logout } = useAuth();
  const user = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const count = items.reduce((n, i) => n + i.qty, 0);
  const favoriteCount = favoriteItems.length;
  const [query, setQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen && !(event.target as Element).closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to shop with search query (you can implement this later)
      console.log('Search for:', query);
      setIsSearchOpen(false);
      setQuery('');
    }
  };

  const navigationLinks = [
    { href: '/collections/new', label: 'New Arrivals' },
    { href: '/shop?tag=ring', label: 'Rings' },
    { href: '/shop?tag=necklace', label: 'Necklaces' },
    { href: '/shop?tag=earrings', label: 'Earrings' },
    { href: '/shop?tag=bracelet', label: 'Bracelets' },
    { href: '/shop', label: 'All Jewelry' },
    { href: '/about', label: 'About Us' },
  ];

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <>
      <header className="nav-minimal sticky top-0 z-50">
        <div className="container-page py-4 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-primary hover:text-accent transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="text-display text-xl lg:text-2xl tracking-tight">
              ANVIY
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              {navigationLinks.slice(0, -2).map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
              <Link href="/about" className="nav-link">About Us</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-6">
              {/* Desktop Search */}
              <div className="hidden md:block">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input 
                    value={query} 
                    onChange={e => setQuery(e.target.value)} 
                    placeholder="Search pieces..." 
                    className="input-minimal w-64 text-sm pr-8"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-primary transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                  </button>
                </form>
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 text-primary hover:text-accent transition-colors duration-300"
                aria-label="Toggle search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
              
              {/* Favorites */}
              <Link href="/favorites" className="nav-link relative p-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </Link>
              
              {/* Cart */}
              <Link href="/cart" className="nav-link relative p-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4z"/>
                </svg>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="nav-link p-2 flex items-center space-x-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span className="hidden lg:block text-sm font-medium">{user?.name?.split(' ')[0] || 'User'}</span>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-2xl border border-gray-100 rounded-sm z-50 animate-fadeIn">
                      <div className="py-2">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <Link
                          href="/profile"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          href="/favorites"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Favorites
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  {/* Sign In Button - Responsive Design */}
                  <Link 
                    href="/login" 
                    className="hidden sm:inline-flex items-center px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-accent transition-colors duration-300 border border-transparent hover:border-accent/20 rounded-sm"
                  >
                    Sign In
                  </Link>
                  
                  {/* Mobile Sign In Icon */}
                  <Link 
                    href="/login" 
                    className="sm:hidden p-2 text-gray-700 hover:text-accent transition-colors duration-300"
                    aria-label="Sign In"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                      <polyline points="10,17 15,12 10,7"/>
                      <line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                  </Link>
                  
                  {/* Sign Up Button - Responsive Design */}
                  <Link 
                    href="/register" 
                    className="inline-flex items-center px-3 sm:px-4 lg:px-6 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-dark transition-colors duration-300 rounded-sm shadow-sm hover:shadow-md"
                  >
                    <span className="hidden sm:inline">Sign Up</span>
                    <span className="sm:hidden">Join</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden mt-4 animate-fadeIn">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search our collection..."
                  className="w-full px-4 py-3 border border-border bg-white text-sm rounded-none focus:outline-none focus:border-accent transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-accent transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="mobile-menu-container fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-50 lg:hidden animate-slideInLeft">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <Link 
                  href="/" 
                  className="text-display text-xl tracking-tight"
                  onClick={handleMobileLinkClick}
                >
                  ANVIY
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-text-muted hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 py-6">
                <nav className="space-y-1">
                  {navigationLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-6 py-4 text-sm font-medium text-text-secondary hover:text-primary hover:bg-gray-50 transition-all duration-300 animate-slideInLeft"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={handleMobileLinkClick}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Quick Actions */}
                <div className="px-6 mt-8">
                  <div className="text-small-caps text-xs text-text-muted mb-4 tracking-widest">
                    QUICK ACCESS
                  </div>
                  <div className="space-y-3">
                    <Link
                      href="/favorites"
                      className="flex items-center justify-between py-3 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                      onClick={handleMobileLinkClick}
                    >
                      <span className="flex items-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mr-3">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        Favorites
                      </span>
                      {favoriteCount > 0 && (
                        <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                          {favoriteCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center justify-between py-3 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                      onClick={handleMobileLinkClick}
                    >
                      <span className="flex items-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mr-3">
                          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4z"/>
                        </svg>
                        Shopping Cart
                      </span>
                      {count > 0 && (
                        <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                          {count}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>

                {/* Mobile Auth Section */}
                <div className="px-6 mt-8">
                  <div className="text-small-caps text-xs text-text-muted mb-4 tracking-widest">
                    ACCOUNT
                  </div>
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center py-3 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                        onClick={handleMobileLinkClick}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mr-3">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center py-3 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                        onClick={handleMobileLinkClick}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mr-3">
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                        </svg>
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full py-3 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mr-3">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                          <polyline points="16,17 21,12 16,7"/>
                          <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/login"
                        className="flex items-center py-3 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                        onClick={handleMobileLinkClick}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mr-3">
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                          <polyline points="10,17 15,12 10,7"/>
                          <line x1="15" y1="12" x2="3" y2="12"/>
                        </svg>
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="flex items-center py-3 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                        onClick={handleMobileLinkClick}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mr-3">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="8.5" cy="7" r="4"/>
                          <line x1="20" y1="8" x2="20" y2="14"/>
                          <line x1="23" y1="11" x2="17" y2="11"/>
                        </svg>
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border p-6">
                <div className="text-xs text-text-muted text-center">
                  Crafted with care since 2024
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}


