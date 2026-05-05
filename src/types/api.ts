// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// User Types (matching backend schema)
export interface User {
  _id: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName?: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

// Jewelry specific types
export interface JewelryAttributes {
  metalType?: 'Gold' | 'Silver' | 'Platinum' | 'Rose Gold' | 'White Gold' | 'Yellow Gold';
  gemstoneDetails?: {
    type?: 'Diamond' | 'Ruby' | 'Sapphire' | 'Emerald' | 'Pearl' | 'Other';
    caratWeight?: number;
    clarity?: 'FL' | 'IF' | 'VVS1' | 'VVS2' | 'VS1' | 'VS2' | 'SI1' | 'SI2' | 'I1' | 'I2' | 'I3';
    cut?: 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
    color?: string;
  };
  dimensions?: {
    ringSize?: number;
    chainLength?: number;
    width?: number;
    height?: number;
    depth?: number;
  };
  certification?: {
    certificateNumber?: string;
    issuingAuthority?: string;
    issueDate?: Date;
    grade?: string;
  };
  customizationOptions?: {
    engraving?: boolean;
    customSize?: boolean;
    metalChoice?: boolean;
    stoneChoice?: boolean;
  };
}

export interface InventoryData {
  lowStockThreshold?: number;
  reorderPoint?: number;
  supplier?: string; // Supplier ID
  costPrice?: number;
  sku?: string;
  barcode?: string;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
}

// Product Types (matching backend schema)
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string; // Category ID
  jewelryAttributes?: JewelryAttributes;
  inventory?: InventoryData;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductWithCategory extends Omit<Product, 'category'> {
  category: Category;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image?: string; // Optional category image URL (single image only)
  createdAt: Date;
  updatedAt: Date;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  variantId?: string;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId: string;
  items: CartItem[];
  total: number;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

// Order Types (matching backend schema)
export interface OrderItem {
  product: string; // Product ID
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

export interface Order {
  _id: string;
  user: string; // User ID
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'cod';
  shippingAddress: ShippingAddress;
  orderDate: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  notes?: string;
}

// Extended Order with populated fields for frontend display
export interface OrderWithDetails extends Omit<Order, 'user' | 'items'> {
  user: User;
  items: Array<OrderItem & { product: Product }>;
}

// Additional types for suppliers, inventory, comments
export interface Supplier {
  _id: string;
  name: string;
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryItem {
  _id: string;
  product: string; // Product ID
  quantity: number;
  location?: string;
  lastUpdated: Date;
}

export interface Comment {
  _id: string;
  id?: string;
  user: string | User; // User ID or User object
  product?: string; // Product ID (optional)
  content: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface Review {
  id?: string;
  _id?: string;
  userId: string;
  productId: string;
  user: User;
  rating: number;
  title?: string;
  comment: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Search Types
export interface SearchFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  tags?: string[];
  inStock?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}

export interface SearchResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  filters: SearchFilters;
}

// Payment Types
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

// Newsletter Types
export interface NewsletterSubscription {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  [key: string]: T[] | {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
