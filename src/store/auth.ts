import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, LoginCredentials, RegisterCredentials } from '@/types/api';
import { authAPI } from '@/lib/api';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; user?: User; error?: string }>;
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  updateUser: (user: User) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authAPI.login(credentials);
          
          set({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          return { success: true, user: response.user };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({
            isLoading: false,
            error: errorMessage,
          });
          
          return { success: false, error: errorMessage };
        }
      },

      // Register action
      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authAPI.register(credentials);
          
          set({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          return { success: true, user: response.user };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Registration failed';
          set({
            isLoading: false,
            error: errorMessage,
          });
          
          return { success: false, error: errorMessage };
        }
      },

      // Logout action
      logout: async () => {
        set({ isLoading: true });
        
        try {
          await authAPI.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // Get current user action
      getCurrentUser: async () => {
        const { token } = get();
        
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        set({ isLoading: true, error: null });
        
        try {
          const user = await authAPI.getCurrentUser();
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          // If getting current user fails, try to refresh token
          try {
            await get().refreshAuth();
          } catch (refreshError) {
            // If refresh also fails, logout user
            set({
              user: null,
              token: null,
              refreshToken: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          }
        }
      },

      // Refresh authentication
      refreshAuth: async () => {
        const { refreshToken } = get();
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          const response = await authAPI.refreshToken();
          
          set({
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            error: null,
          });
        } catch (error) {
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            error: error instanceof Error ? error.message : 'Token refresh failed',
          });
          throw error;
        }
      },

      // Update user
      updateUser: (user: User) => {
        set({ user });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'anviy-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for better performance
export const useAuthUser = () => useAuth((state) => state.user);
export const useAuthToken = () => useAuth((state) => state.token);
export const useIsAuthenticated = () => useAuth((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuth((state) => state.isLoading);
export const useAuthError = () => useAuth((state) => state.error);
