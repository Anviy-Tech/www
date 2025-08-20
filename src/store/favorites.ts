import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface FavoritesStore {
  items: FavoriteItem[];
  addItem: (item: Omit<FavoriteItem, 'qty'>) => void;
  removeItem: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          const exists = state.items.find((i) => i.id === item.id);
          if (exists) {
            return state; // Already in favorites
          }
          return { items: [...state.items, item] };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      isFavorite: (id) => {
        return get().items.some((item) => item.id === id);
      },
      
      clearFavorites: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'anviy-favorites-storage',
    }
  )
);
