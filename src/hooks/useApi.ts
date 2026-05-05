import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { 
  Product, 
  ProductWithCategory,
  Category, 
  Order, 
  OrderWithDetails,
  OrderItem,
  ShippingAddress,
  User, 
  LoginCredentials, 
  RegisterCredentials,
  Review,
  Supplier,
  InventoryItem,
  Comment,
  PaginationParams 
} from '@/types/api';
import { api } from '@/lib/api';

// Query Keys
export const queryKeys = {
  auth: {
    profile: ['auth', 'profile'] as const,
    users: ['auth', 'users'] as const,
  },
  products: {
    all: ['products'] as const,
    list: (params?: any) => ['products', 'list', params] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
    byCategory: (categoryId: string, params?: any) => ['products', 'category', categoryId, params] as const,
    search: (query: string) => ['products', 'search', query] as const,
  },
  categories: {
    all: ['categories'] as const,
    list: (params?: any) => ['categories', 'list', params] as const,
    detail: (id: string) => ['categories', 'detail', id] as const,
    bySlug: (slug: string) => ['categories', 'slug', slug] as const,
    search: (query: string) => ['categories', 'search', query] as const,
  },
  orders: {
    all: ['orders'] as const,
    list: (params?: any) => ['orders', 'list', params] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
    stats: ['orders', 'stats'] as const,
    adminAll: (params?: any) => ['orders', 'admin', 'all', params] as const,
  },
  reviews: {
    product: (productId: string, params?: any) => ['reviews', 'product', productId, params] as const,
  },
  suppliers: {
    all: ['suppliers'] as const,
    list: (params?: any) => ['suppliers', 'list', params] as const,
  },
  inventory: {
    all: ['inventory'] as const,
    list: (params?: any) => ['inventory', 'list', params] as const,
  },
  comments: {
    all: ['comments'] as const,
    list: (params?: any) => ['comments', 'list', params] as const,
  },
  media: {
    images: ['media', 'images'] as const,
  },
  health: ['health'] as const,
};

// Authentication Hooks
export const useAuthProfile = () => {
  return useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: api.auth.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAuthUsers = () => {
  return useQuery({
    queryKey: queryKeys.auth.users,
    queryFn: api.auth.getAllUsers,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => api.auth.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
    },
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => api.auth.register(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.auth.logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (profileData: Partial<User>) => api.auth.updateProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
    },
  });
};

// Product Hooks
export const useProducts = (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => api.products.getProducts(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useInfiniteProducts = (params?: {
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', params],
    queryFn: ({ pageParam = 1 }) => api.products.getProducts({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => api.products.getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProductsByCategory = (categoryId: string, params?: {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}) => {
  return useQuery({
    queryKey: queryKeys.products.byCategory(categoryId, params),
    queryFn: () => api.products.getProductsByCategory(categoryId, params),
    enabled: !!categoryId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: queryKeys.products.search(query),
    queryFn: () => api.products.searchProducts(query),
    enabled: !!query && query.length > 2,
    staleTime: 30 * 1000, // 30 seconds
  });
};

// Category Hooks
export const useCategories = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.categories.list(params),
    queryFn: () => api.categories.getCategories(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: () => api.categories.getCategory(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.categories.bySlug(slug),
    queryFn: () => api.categories.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchCategories = (query: string) => {
  return useQuery({
    queryKey: queryKeys.categories.search(query),
    queryFn: () => api.categories.searchCategories(query),
    enabled: !!query && query.length > 2,
    staleTime: 30 * 1000,
  });
};

// Order Hooks
export const useOrders = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.orders.list(params),
    queryFn: () => api.orders.getUserOrders(params),
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: queryKeys.orders.detail(orderId),
    queryFn: () => api.orders.getOrder(orderId),
    enabled: !!orderId,
    staleTime: 30 * 1000,
  });
};

export const useOrderStats = () => {
  return useQuery({
    queryKey: queryKeys.orders.stats,
    queryFn: api.orders.getOrderStats,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAllOrders = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.orders.adminAll(params),
    queryFn: () => api.orders.getAllOrders(params),
    staleTime: 30 * 1000,
  });
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData: {
      items: OrderItem[];
      shippingAddress: ShippingAddress;
      paymentMethod: 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'cod';
      notes?: string;
    }) => api.orders.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
};

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: Order['status'] }) => 
      api.orders.updateOrderStatus(orderId, status),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
};

export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason?: string }) => 
      api.orders.cancelOrder(orderId, reason),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
};

// Review Hooks
export const useProductReviews = (productId: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.reviews.product(productId, params),
    queryFn: () => api.reviews.getProductReviews(productId, params),
    enabled: !!productId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, reviewData }: { 
      productId: string; 
      reviewData: { rating: number; title?: string; comment: string } 
    }) => api.reviews.createReview(productId, reviewData),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.product(productId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(productId) });
    },
  });
};

export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ reviewId, reviewData }: { 
      reviewId: string; 
      reviewData: { rating?: number; title?: string; comment?: string } 
    }) => api.reviews.updateReview(reviewId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (reviewId: string) => api.reviews.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

// Supplier Hooks
export const useSuppliers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.suppliers.list(params),
    queryFn: () => api.suppliers.getSuppliers(params),
    staleTime: 5 * 60 * 1000,
  });
};

// Inventory Hooks
export const useInventory = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.inventory.list(params),
    queryFn: () => api.inventory.getInventory(params),
    staleTime: 2 * 60 * 1000,
  });
};

// Comments Hooks
export const useComments = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.comments.list(params),
    queryFn: () => api.comments.getComments(params),
    staleTime: 2 * 60 * 1000,
  });
};

// Media Hooks
export const useImages = () => {
  return useQuery({
    queryKey: queryKeys.media.images,
    queryFn: api.media.getImages,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUploadImagesMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (files: File[]) => api.media.uploadImages(files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.media.images });
    },
  });
};

// Health Check Hook
export const useHealthCheck = () => {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: api.health.checkHealth,
    staleTime: 30 * 1000,
    refetchInterval: 5 * 60 * 1000, // Check every 5 minutes
  });
};

// Newsletter Hooks
export const useSubscribeNewsletterMutation = () => {
  return useMutation({
    mutationFn: (email: string) => api.newsletter.subscribe(email),
  });
};

export const useUnsubscribeNewsletterMutation = () => {
  return useMutation({
    mutationFn: (email: string) => api.newsletter.unsubscribe(email),
  });
};

// Payment Hooks
export const useCreatePaymentIntentMutation = () => {
  return useMutation({
    mutationFn: ({ amount, currency = 'INR' }: { amount: number; currency?: string }) => 
      api.payment.createPaymentIntent(amount, currency),
  });
};

export const useConfirmPaymentMutation = () => {
  return useMutation({
    mutationFn: ({ paymentIntentId, paymentMethod }: { paymentIntentId: string; paymentMethod: string }) => 
      api.payment.confirmPayment(paymentIntentId, paymentMethod),
  });
};

// User Profile Hooks
export const useUserAddresses = () => {
  return useQuery({
    queryKey: ['user', 'addresses'],
    queryFn: api.user.getAddresses,
    staleTime: 2 * 60 * 1000,
  });
};

export const useAddAddressMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (addressData: any) => api.user.addAddress(addressData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'addresses'] });
    },
  });
};

export const useUpdateAddressMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ addressId, addressData }: { addressId: string; addressData: any }) => 
      api.user.updateAddress(addressId, addressData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'addresses'] });
    },
  });
};

export const useDeleteAddressMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (addressId: string) => api.user.deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'addresses'] });
    },
  });
};

export const useUpdateUserProfileMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (profileData: { name?: string; phone?: string; avatar?: string }) => 
      api.user.updateProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
    },
  });
};
