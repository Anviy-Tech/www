'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { productsAPI, categoriesAPI } from '@/lib/api';
import { Product, Category } from '@/types/api';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { usePagination } from '../hooks/usePagination';

export default function ShopContent() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching products and categories...');
        
        // Fetch products
        const productsResponse = await productsAPI.getProducts({
          page: 1,
          limit: 100, // Get more products for filtering
          sort: 'createdAt',
          order: 'desc'
        });
        
        console.log('Products response:', productsResponse);
        console.log('First product sample:', productsResponse.products?.[0]);
        setProducts(productsResponse.products || []);

        // Fetch categories
        const categoriesResponse = await categoriesAPI.getCategories({
          page: 1,
          limit: 50
        });
        
        console.log('Categories response:', categoriesResponse);
        setCategories(categoriesResponse.categories || []);
        
        console.log('Data fetched successfully');
        console.log('Products with categories:', productsResponse.products?.filter(p => p.category).length);
        console.log('Products without categories:', productsResponse.products?.filter(p => !p.category).length);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
        setError(errorMessage);
        console.error('Error fetching data:', err);
        
        // Set empty arrays on error to prevent crashes
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products by category if tag is selected
  const filtered = React.useMemo(() => {
    if (!tag || tag === 'all') {
      console.log('Showing all products:', products.length);
      return products;
    }
    
    // Handle both category names (from header nav) and category IDs
    const filteredProducts = products.filter(p => {
      // Check if tag matches category ID
      if (p.category?._id === tag) {
        return true;
      }
      
      // Check if tag matches category name (case-insensitive)
      if (p.category?.name && p.category.name.toLowerCase() === tag.toLowerCase()) {
        return true;
      }
      
      return false;
    });
    
    console.log(`Filtering by category ${tag}:`, filteredProducts.length, 'products found');
    console.log('Available categories in products:', [...new Set(products.map(p => p.category?._id).filter(Boolean))]);
    console.log('Available category names in products:', [...new Set(products.map(p => p.category?.name).filter(Boolean))]);
    return filteredProducts;
  }, [products, tag]);

  // Get the current category name for display
  const currentCategory = React.useMemo(() => {
    if (!tag || tag === 'all') return null;
    
    // First try to find by ID
    let category = categories.find(cat => cat._id === tag);
    
    // If not found by ID, try to find by name (case-insensitive)
    if (!category) {
      category = categories.find(cat => cat.name.toLowerCase() === tag.toLowerCase());
    }
    
    // If still not found, create a temporary category object for display
    if (!category) {
      category = { 
        _id: tag, 
        name: tag.charAt(0).toUpperCase() + tag.slice(1),
        description: '',
        slug: tag.toLowerCase(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    
    return category;
  }, [tag, categories]);
  
  const {
    currentPage,
    totalPages,
    currentItems: currentProducts,
    goToPage
  } = usePagination({
    items: filtered,
    itemsPerPage: PRODUCTS_PER_PAGE,
    initialPage: 1,
    scrollToTop: true,
    scrollTargetId: 'shop-products-grid'
  });
  
  return (
    <div className="container-page section-standard">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-display text-4xl lg:text-5xl mb-6">Our Collection</h1>
        <div className="divider"></div>
        <p className="text-xl text-text-secondary max-w-2xl">
          Discover handcrafted pieces that embody timeless elegance and contemporary sophistication.
        </p>
      </div>
      
      {/* Category Filters */}
      <div className="mb-12">
        <div className="text-small-caps text-xs text-text-muted mb-6 tracking-widest">
          FILTER BY CATEGORY
        </div>
        <div className="flex flex-wrap gap-4">
          <Link 
            href="/shop" 
            className={`px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ${
              !tag || tag === 'all'
                ? 'bg-primary text-white' 
                : 'border border-border hover:border-primary hover:text-primary'
            }`}
          >
            All ({products.length})
          </Link>
          {categories.map(category => {
            const categoryProductCount = products.filter(p => 
              p.category?._id === category._id || p.category?.name?.toLowerCase() === category.name.toLowerCase()
            ).length;
            return (
              <Link 
                key={category._id} 
                href={`/shop?tag=${category._id}`} 
                className={`px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ${
                  tag === category._id || tag === category.name?.toLowerCase()
                    ? 'bg-primary text-white' 
                    : 'border border-border hover:border-primary hover:text-primary'
                }`}
              >
                {category.name} ({categoryProductCount})
              </Link>
            );
          })}
        </div>
        {categories.length === 0 && !loading && (
          <div className="text-sm text-gray-500 mt-4">
            No categories available. This might indicate an API connection issue.
          </div>
        )}
      </div>
      
      {/* Results Count */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-text-secondary mb-2 sm:mb-0">
            Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, filtered.length)} of {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            {currentCategory && (
              <span className="text-accent"> in {currentCategory.name}</span>
            )}
          </p>
          {totalPages > 1 && (
            <div className="text-sm text-text-muted">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>
      </div>
      
      {/* Products Grid */}
      {loading ? (
        <div id="shop-products-grid" className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <div className="text-sm text-gray-400 mb-4">
              <p>Make sure your backend API is running on <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8000</code></p>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-minimal"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div id="shop-products-grid" className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
          {currentProducts.map((product, i) => (
            <ProductCard 
              key={product._id}
              product={product}
              className={`animate-reveal-delay-${Math.min(i % 4, 3)}`}
            />
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            className=""
          />
        </div>
      )}
      
      {/* No Results */}
      {filtered.length === 0 && !loading && (
        <div className="text-center py-20">
          <h3 className="text-display text-2xl mb-4">No pieces found</h3>
          <p className="text-text-secondary mb-8">
            We couldn't find any pieces in the {currentCategory?.name || tag} category.
          </p>
          <Link href="/shop" className="btn-primary">
            View All Pieces
          </Link>
        </div>
      )}
    </div>
  );
}
