import { 
  ApiResponse, 
  User, 
  AuthResponse, 
  LoginCredentials, 
  RegisterCredentials,
  Product,
  Category,
  Cart,
  CartItem,
  Order,
  Review,
  SearchFilters,
  SearchResponse,
  PaymentIntent,
  NewsletterSubscription,
  PaginatedResponse,
  PaginationParams
} from '@/types/api';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 10000;

// Custom fetch wrapper with timeout and error handling
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
    
    throw new Error('An unexpected error occurred');
  }
}

// Authentication API
export const authAPI = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.success && response.data) {
      // Store tokens
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
      return response.data;
    }
    
    throw new Error(response.message || 'Login failed');
  },

  // Register user
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.success && response.data) {
      // Store tokens
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
      return response.data;
    }
    
    throw new Error(response.message || 'Registration failed');
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens regardless of API response
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
      }
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await apiRequest<User>('/auth/me');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to get user');
  },

  // Refresh token
  refreshToken: async (): Promise<AuthResponse> => {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiRequest<AuthResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    
    if (response.success && response.data) {
      // Update tokens
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
      return response.data;
    }
    
    throw new Error(response.message || 'Token refresh failed');
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<void> => {
    const response = await apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to send reset email');
    }
  },

  // Reset password
  resetPassword: async (token: string, password: string): Promise<void> => {
    const response = await apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to reset password');
    }
  },
};

// Products API
export const productsAPI = {
  // Get all products with pagination and filters
  getProducts: async (params?: PaginationParams & SearchFilters): Promise<PaginatedResponse<Product>> => {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }

    const response = await apiRequest<PaginatedResponse<Product>>(`/products?${searchParams.toString()}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch products');
  },

  // Get single product by ID
  getProduct: async (id: string): Promise<Product> => {
    const response = await apiRequest<Product>(`/products/${id}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch product');
  },

  // Get product by slug
  getProductBySlug: async (slug: string): Promise<Product> => {
    const response = await apiRequest<Product>(`/products/slug/${slug}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch product');
  },

  // Search products
  searchProducts: async (query: string, filters?: SearchFilters): Promise<SearchResponse> => {
    const searchParams = new URLSearchParams({ q: query });
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, String(v)));
          } else {
            searchParams.append(key, String(value));
          }
        }
      });
    }

    const response = await apiRequest<SearchResponse>(`/products/search?${searchParams.toString()}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Search failed');
  },

  // Get categories
  getCategories: async (): Promise<Category[]> => {
    const response = await apiRequest<Category[]>('/categories');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch categories');
  },

  // Get related products
  getRelatedProducts: async (productId: string, limit: number = 4): Promise<Product[]> => {
    const response = await apiRequest<Product[]>(`/products/${productId}/related?limit=${limit}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch related products');
  },
};

// Cart API
export const cartAPI = {
  // Get cart
  getCart: async (): Promise<Cart> => {
    const response = await apiRequest<Cart>('/cart');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch cart');
  },

  // Add item to cart
  addToCart: async (productId: string, quantity: number = 1, variantId?: string): Promise<Cart> => {
    const response = await apiRequest<Cart>('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, variantId }),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to add item to cart');
  },

  // Update cart item quantity
  updateCartItem: async (itemId: string, quantity: number): Promise<Cart> => {
    const response = await apiRequest<Cart>(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to update cart item');
  },

  // Remove item from cart
  removeFromCart: async (itemId: string): Promise<Cart> => {
    const response = await apiRequest<Cart>(`/cart/items/${itemId}`, {
      method: 'DELETE',
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to remove item from cart');
  },

  // Clear cart
  clearCart: async (): Promise<void> => {
    const response = await apiRequest('/cart', {
      method: 'DELETE',
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to clear cart');
    }
  },
};

// Orders API
export const ordersAPI = {
  // Create order
  createOrder: async (orderData: {
    items: Array<{ productId: string; quantity: number; variantId?: string }>;
    shippingAddress: any;
    billingAddress: any;
    paymentMethod: string;
    notes?: string;
  }): Promise<Order> => {
    const response = await apiRequest<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to create order');
  },

  // Get user orders
  getUserOrders: async (params?: PaginationParams): Promise<PaginatedResponse<Order>> => {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }

    const response = await apiRequest<PaginatedResponse<Order>>(`/orders?${searchParams.toString()}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch orders');
  },

  // Get single order
  getOrder: async (orderId: string): Promise<Order> => {
    const response = await apiRequest<Order>(`/orders/${orderId}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch order');
  },

  // Cancel order
  cancelOrder: async (orderId: string, reason?: string): Promise<Order> => {
    const response = await apiRequest<Order>(`/orders/${orderId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to cancel order');
  },
};

// Reviews API
export const reviewsAPI = {
  // Get product reviews
  getProductReviews: async (productId: string, params?: PaginationParams): Promise<PaginatedResponse<Review>> => {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }

    const response = await apiRequest<PaginatedResponse<Review>>(`/products/${productId}/reviews?${searchParams.toString()}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch reviews');
  },

  // Create review
  createReview: async (productId: string, reviewData: {
    rating: number;
    title?: string;
    comment: string;
  }): Promise<Review> => {
    const response = await apiRequest<Review>(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to create review');
  },

  // Update review
  updateReview: async (reviewId: string, reviewData: {
    rating?: number;
    title?: string;
    comment?: string;
  }): Promise<Review> => {
    const response = await apiRequest<Review>(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to update review');
  },

  // Delete review
  deleteReview: async (reviewId: string): Promise<void> => {
    const response = await apiRequest(`/reviews/${reviewId}`, {
      method: 'DELETE',
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete review');
    }
  },
};

// Payment API
export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: async (amount: number, currency: string = 'INR'): Promise<PaymentIntent> => {
    const response = await apiRequest<PaymentIntent>('/payment/create-intent', {
      method: 'POST',
      body: JSON.stringify({ amount, currency }),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to create payment intent');
  },

  // Confirm payment
  confirmPayment: async (paymentIntentId: string, paymentMethod: string): Promise<{ success: boolean }> => {
    const response = await apiRequest<{ success: boolean }>('/payment/confirm', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId, paymentMethod }),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Payment confirmation failed');
  },
};

// Newsletter API
export const newsletterAPI = {
  // Subscribe to newsletter
  subscribe: async (email: string): Promise<NewsletterSubscription> => {
    const response = await apiRequest<NewsletterSubscription>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to subscribe to newsletter');
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email: string): Promise<void> => {
    const response = await apiRequest('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to unsubscribe from newsletter');
    }
  },
};

// User Profile API
export const userAPI = {
  // Update user profile
  updateProfile: async (profileData: {
    name?: string;
    phone?: string;
    avatar?: string;
  }): Promise<User> => {
    const response = await apiRequest<User>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to update profile');
  },

  // Get user addresses
  getAddresses: async (): Promise<any[]> => {
    const response = await apiRequest<any[]>('/user/addresses');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch addresses');
  },

  // Add address
  addAddress: async (addressData: any): Promise<any> => {
    const response = await apiRequest<any>('/user/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to add address');
  },

  // Update address
  updateAddress: async (addressId: string, addressData: any): Promise<any> => {
    const response = await apiRequest<any>(`/user/addresses/${addressId}`, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to update address');
  },

  // Delete address
  deleteAddress: async (addressId: string): Promise<void> => {
    const response = await apiRequest(`/user/addresses/${addressId}`, {
      method: 'DELETE',
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete address');
    }
  },
};

// Export all APIs
export const api = {
  auth: authAPI,
  products: productsAPI,
  cart: cartAPI,
  orders: ordersAPI,
  reviews: reviewsAPI,
  payment: paymentAPI,
  newsletter: newsletterAPI,
  user: userAPI,
};
