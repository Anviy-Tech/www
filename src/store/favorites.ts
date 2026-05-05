import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/api';

export interface FavoriteItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  addedAt: Date;
  product?: Product;
}

interface FavoritesState {
  items: FavoriteItem[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addToFavorites: (product: Product) => void;
  addToFavoritesFromCart: (item: { id: string; name: string; price: number; image: string; slug: string }) => void;
  removeFromFavorites: (productId: string) => void;
  clearFavorites: () => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
  
  // Getters
  getFavoriteCount: () => number;
  getFavoriteItems: () => FavoriteItem[];
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      addToFavorites: (product: Product) => {
        const { items } = get();
        
        // Check if already in favorites
        if (items.some(item => item.productId === product._id)) {
          return;
        }

        const favoriteItem: FavoriteItem = {
          id: `${product._id}-${Date.now()}`,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0] || '',
          slug: product.name.toLowerCase().replace(/\s+/g, '-'),
          addedAt: new Date(),
          product,
        };

        set({
          items: [favoriteItem, ...items],
          error: null,
        });
      },

      addToFavoritesFromCart: (item: { id: string; name: string; price: number; image: string; slug: string }) => {
        const { items } = get();
        
        // Check if already in favorites
        if (items.some(favItem => favItem.productId === item.id)) {
          return;
        }

        const favoriteItem: FavoriteItem = {
          id: `${item.id}-${Date.now()}`,
          productId: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          slug: item.slug,
          addedAt: new Date(),
          // No full product data available from cart
        };

        set({
          items: [favoriteItem, ...items],
          error: null,
        });
      },

      removeFromFavorites: (productId: string) => {
        set(({ items }) => ({
          items: items.filter(item => item.productId !== productId),
          error: null,
        }));
      },

      clearFavorites: () => {
        set({ items: [], error: null });
      },

      isFavorite: (productId: string) => {
        const { items } = get();
        return items.some(item => item.productId === productId);
      },

      toggleFavorite: (product: Product) => {
        const { isFavorite, addToFavorites, removeFromFavorites } = get();
        
        if (isFavorite(product._id)) {
          removeFromFavorites(product._id);
        } else {
          addToFavorites(product);
        }
      },

      getFavoriteCount: () => {
        const { items } = get();
        return items.length;
      },

      getFavoriteItems: () => {
        const { items } = get();
        return items.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
      },
    }),
    {
      name: 'anviy-favorites',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Selectors for better performance
export const useFavoriteItems = () => useFavorites((state) => state.items);
export const useFavoriteCount = () => useFavorites((state) => state.getFavoriteCount());
export const useIsFavorite = (productId: string) => useFavorites((state) => state.isFavorite(productId));

// Utility functions
export function getFavoriteItems(): FavoriteItem[] {
  return useFavorites.getState().getFavoriteItems();
}

export function isFavoriteProduct(productId: string): boolean {
  return useFavorites.getState().isFavorite(productId);
}