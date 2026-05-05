import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem as APICartItem } from '@/types/api';
import { api } from '@/lib/api';

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
  product?: Product;
  variantId?: string;
};

type CartState = {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addItem: (product: Product, quantity?: number, variantId?: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  syncWithBackend: () => Promise<void>;
  
  // Local actions (for offline support)
  addItemLocal: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItemLocal: (id: string) => void;
  updateQuantityLocal: (id: string, quantity: number) => void;
  clearCartLocal: () => void;
  
  // Getters
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemCount: (productId: string) => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      // Backend-integrated actions
      addItem: async (product: Product, quantity = 1, variantId?: string) => {
        console.log('🚀 addItem called with:', { productName: product.name, productId: product._id, quantity });
        set({ isLoading: true, error: null });
        
        // TEMPORARY: Always use local storage for debugging
        console.log('💾 Using local storage (debug mode)...');
        
        get().addItemLocal({
          id: product._id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0] || '',
          slug: product.name.toLowerCase().replace(/\s+/g, '-'),
          product,
          variantId,
        }, quantity);
        
        set({ 
          isLoading: false,
          error: null
        });
        
        const currentItems = get().items;
        console.log('✅ Added to cart via local storage:', product.name, 'Total items:', currentItems.length);
        console.log('📋 Current cart items:', currentItems);
      },

      removeItem: async (itemId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await api.cart.removeFromCart(itemId);
          
          // Convert backend cart items to local format
          const cartItems: CartItem[] = response.items.map((item: APICartItem) => ({
            id: item.id,
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            image: item.product.images[0] || '',
            quantity: item.quantity,
            slug: item.product.name.toLowerCase().replace(/\s+/g, '-'),
            product: item.product,
            variantId: item.variantId,
          }));
          
          set({ items: cartItems, isLoading: false });
        } catch (error) {
          // Fallback to local storage if backend fails
          get().removeItemLocal(itemId);
          
          set({ 
            error: error instanceof Error ? error.message : 'Failed to remove item from cart',
            isLoading: false 
          });
        }
      },

      updateQuantity: async (itemId: string, quantity: number) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await api.cart.updateCartItem(itemId, quantity);
          
          // Convert backend cart items to local format
          const cartItems: CartItem[] = response.items.map((item: APICartItem) => ({
            id: item.id,
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            image: item.product.images[0] || '',
            quantity: item.quantity,
            slug: item.product.name.toLowerCase().replace(/\s+/g, '-'),
            product: item.product,
            variantId: item.variantId,
          }));
          
          set({ items: cartItems, isLoading: false });
        } catch (error) {
          // Fallback to local storage if backend fails
          get().updateQuantityLocal(itemId, quantity);
          
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update cart item',
            isLoading: false 
          });
        }
      },

      clearCart: async () => {
        console.log('🗑️ clearCart called');
        set({ isLoading: true, error: null });
        
        // TEMPORARY: Always use local storage for debugging
        console.log('💾 Clearing cart via local storage (debug mode)...');
        
        get().clearCartLocal();
        
        set({ 
          isLoading: false,
          error: null
        });
        
        console.log('✅ Cart cleared successfully');
      },

      syncWithBackend: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await api.cart.getCart();
          
          // Convert backend cart items to local format
          const cartItems: CartItem[] = response.items.map((item: APICartItem) => ({
            id: item.id,
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            image: item.product.images[0] || '',
            quantity: item.quantity,
            slug: item.product.name.toLowerCase().replace(/\s+/g, '-'),
            product: item.product,
            variantId: item.variantId,
          }));
          
          set({ items: cartItems, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sync cart',
            isLoading: false 
          });
        }
      },

      // Local actions (for offline support)
      addItemLocal: (item, quantity = 1) =>
        set(({ items }) => {
          const existing = items.find(i => i.id === item.id);
          if (existing) {
            return {
              items: items.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i)),
            };
          }
          return { items: [{ ...item, quantity }, ...items] };
        }),

      removeItemLocal: (id) => set(({ items }) => ({ items: items.filter(i => i.id !== id) })),

      updateQuantityLocal: (id, quantity) => 
        set(({ items }) => ({ 
          items: quantity > 0 
            ? items.map(i => (i.id === id ? { ...i, quantity } : i))
            : items.filter(i => i.id !== id)
        })),

      clearCartLocal: () => set({ items: [] }),

      // Getters
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getItemCount: (productId: string) => {
        const { items } = get();
        const item = items.find(i => i.productId === productId);
        return item ? item.quantity : 0;
      },
    }),
    { 
      name: 'anviy-cart', 
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Utility functions
export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

// Selectors for better performance
export const useCartItems = () => useCart((state) => state.items);
export const useCartTotal = () => useCart((state) => state.getTotalPrice());
export const useCartItemCount = () => useCart((state) => state.getTotalItems());
export const useCartLoading = () => useCart((state) => state.isLoading);
export const useCartError = () => useCart((state) => state.error);


