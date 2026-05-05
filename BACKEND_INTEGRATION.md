# Backend Integration Documentation

## Overview

This document outlines the complete backend integration implementation for the Anviy e-commerce frontend, connecting to the CMS backend API running on port 8000.

## Architecture

### API Configuration
- **Base URL**: `http://localhost:8000/api`
- **Timeout**: 10 seconds
- **Authentication**: JWT Bearer token in headers
- **Error Handling**: Global error handling with user-friendly messages

### Technology Stack
- **API Client**: Custom fetch wrapper with TypeScript
- **State Management**: Zustand for local state + React Query for server state
- **Form Handling**: React Hook Form with validation
- **Error Handling**: Global error boundary + toast notifications
- **Caching**: React Query with smart cache invalidation

## API Integration

### 1. Authentication (`/auth`)
- ✅ `POST /auth/login` - User login
- ✅ `POST /auth/register` - User registration
- ✅ `GET /auth/profile` - Get user profile
- ✅ `PUT /auth/profile` - Update user profile
- ✅ `GET /auth/users` - Get all users (admin only)

### 2. Products (`/products`)
- ✅ `GET /products` - List products with pagination, filters, and search
- ✅ `GET /products/:id` - Get product by ID
- ✅ `POST /products` - Create product (admin only)
- ✅ `PUT /products/:id` - Update product (admin only)
- ✅ `DELETE /products/:id` - Delete product (admin only)

### 3. Categories (`/categories`)
- ✅ `GET /categories` - List categories with pagination
- ✅ `GET /categories/:id` - Get category by ID
- ✅ `POST /categories` - Create category (admin only)
- ✅ `PUT /categories/:id` - Update category (admin only)
- ✅ `DELETE /categories/:id` - Delete category (admin only)

### 4. Orders (`/orders`)
- ✅ `GET /orders` - Get user orders
- ✅ `GET /orders/:id` - Get order by ID
- ✅ `POST /orders` - Create new order
- ✅ `PUT /orders/:id` - Update order status (admin only)
- ✅ `DELETE /orders/:id/cancel` - Cancel order
- ✅ `GET /orders/stats` - Get order statistics (admin only)
- ✅ `GET /orders/all` - Get all orders (admin only)

### 5. Additional Endpoints
- ✅ `GET /suppliers` - Get suppliers
- ✅ `GET /inventory` - Get inventory items
- ✅ `GET /comments` - Get comments
- ✅ `POST /upload/images` - Upload images
- ✅ `GET /upload/images` - Get uploaded images
- ✅ `GET /health` - Health check

## Data Schema

### Product Schema (Jewelry-specific)
```typescript
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string; // Category ID
  
  // Jewelry-specific attributes
  jewelryAttributes?: {
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
  };
  
  // Inventory management
  inventory?: {
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
  };
  
  createdAt: Date;
  updatedAt: Date;
}
```

### Order Schema
```typescript
interface Order {
  _id: string;
  user: string; // User ID
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'cod';
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
  };
  orderDate: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  notes?: string;
}
```

### User Schema
```typescript
interface User {
  _id: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
```

## State Management

### 1. Authentication Store (`useAuth`)
- User authentication state
- Login/logout functionality
- Token management with auto-refresh
- Profile updates

### 2. Cart Store (`useCart`)
- Shopping cart with backend sync
- Offline support with localStorage fallback
- Optimistic updates
- Real-time quantity management

### 3. Favorites Store (`useFavorites`)
- User favorites/wishlist
- Local storage persistence
- Quick add/remove functionality

## React Query Hooks

### Authentication Hooks
- `useAuthProfile()` - Get current user
- `useLoginMutation()` - Login user
- `useRegisterMutation()` - Register user
- `useLogoutMutation()` - Logout user
- `useUpdateProfileMutation()` - Update profile

### Product Hooks
- `useProducts(params)` - Get products with filters
- `useInfiniteProducts(params)` - Infinite scroll products
- `useProduct(id)` - Get single product
- `useProductsByCategory(categoryId)` - Products by category
- `useSearchProducts(query)` - Search products

### Order Hooks
- `useOrders()` - Get user orders
- `useOrder(id)` - Get single order
- `useCreateOrderMutation()` - Create new order
- `useUpdateOrderStatusMutation()` - Update order status (admin)
- `useCancelOrderMutation()` - Cancel order

### Category Hooks
- `useCategories()` - Get all categories
- `useCategory(id)` - Get single category
- `useCategoryBySlug(slug)` - Get category by slug

## Error Handling

### Global Error Handler
- **Toast Notifications**: User-friendly error messages
- **Automatic Retries**: Smart retry logic for temporary failures
- **Offline Support**: Graceful degradation when offline
- **Error Boundary**: React error boundary for unexpected errors

### Error Types
- **Network Errors**: Connection timeouts, offline status
- **Authentication Errors**: 401/403 handling with redirect
- **Validation Errors**: Form validation with field-specific messages
- **Server Errors**: 5xx errors with retry options

## Features Implemented

### ✅ Core Features
- Complete API integration with all endpoints
- JWT authentication with auto-refresh
- Shopping cart with backend sync
- User favorites/wishlist
- Global error handling and notifications
- Offline support with local storage fallback
- React Query caching and optimistic updates

### ✅ Jewelry-Specific Features
- Jewelry attributes (metal type, gemstones, etc.)
- Certification details
- Customization options
- Inventory management
- Supplier information

### ✅ E-commerce Features
- Product catalog with advanced filtering
- Category-based navigation
- Search functionality
- Order management
- Payment method selection
- Shipping address handling

## File Structure

```
src/
├── lib/
│   ├── api.ts                 # API client and all endpoint functions
│   ├── queryClient.ts         # React Query configuration
│   └── errorHandler.ts        # Global error handling utilities
├── hooks/
│   └── useApi.ts             # React Query hooks for all endpoints
├── store/
│   ├── auth.ts               # Authentication state management
│   ├── cart.ts               # Shopping cart state management
│   └── favorites.ts          # Favorites/wishlist state management
├── types/
│   └── api.ts                # TypeScript interfaces for all schemas
├── components/
│   ├── Providers.tsx         # Global providers wrapper
│   ├── Toast.tsx             # Toast notification system
│   └── ErrorBoundary.tsx     # React error boundary
└── app/
    └── layout.tsx            # Main layout with providers
```

## Usage Examples

### Making API Calls
```typescript
// Using React Query hooks
const { data: products, isLoading, error } = useProducts({
  category: 'rings',
  minPrice: 100,
  maxPrice: 500,
  sort: 'price',
  order: 'asc'
});

// Using mutations
const loginMutation = useLoginMutation();
const handleLogin = async (credentials) => {
  try {
    const result = await loginMutation.mutateAsync(credentials);
    // Success handled automatically by error handler
  } catch (error) {
    // Error handled automatically by error handler
  }
};
```

### Managing Cart
```typescript
const { items, addItem, removeItem, getTotalPrice } = useCart();

// Add product to cart
await addItem(product, 2); // quantity = 2

// Update quantity
await updateQuantity(itemId, 3);

// Remove item
await removeItem(itemId);
```

### Authentication
```typescript
const { user, login, logout, isAuthenticated } = useAuth();

// Login
const result = await login({ email, password });
if (result.success) {
  // Redirect to dashboard
}

// Check authentication status
if (isAuthenticated) {
  // Show authenticated content
}
```

## Next Steps

1. **Admin Interface**: Implement admin CRUD operations for products, categories, and orders
2. **Payment Integration**: Connect with payment gateways (Stripe, Razorpay)
3. **Image Optimization**: Implement image uploads and optimization
4. **Search Enhancement**: Add advanced search with filters
5. **Performance**: Implement virtual scrolling for large product lists
6. **Testing**: Add unit and integration tests for API calls
7. **SEO**: Implement proper metadata and structured data

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NODE_ENV=development
```

The backend integration is now complete and provides a robust foundation for the Anviy e-commerce frontend with full TypeScript support, error handling, and modern React patterns.
