# API Integration Guide

## 🔌 Overview

This guide explains how to integrate the ANVIY frontend with the backend APIs. The frontend is already prepared with a complete API service layer and TypeScript types.

## 📋 Current API Status

### ✅ **Frontend Ready**
- Complete API service layer implemented
- TypeScript types for all entities
- Error handling and loading states
- Authentication flow ready
- All API endpoints defined

### ❌ **Backend Needed**
- No backend API implementation
- No database setup
- No authentication backend
- No payment processing

## 🏗️ API Architecture

### Service Layer Structure

```typescript
// API client configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Organized API services
export const api = {
  auth: authAPI,        // Authentication endpoints
  products: productsAPI, // Product management
  cart: cartAPI,        // Shopping cart
  orders: ordersAPI,    // Order processing
  reviews: reviewsAPI,  // Product reviews
  payment: paymentAPI,  // Payment processing
  newsletter: newsletterAPI, // Newsletter subscription
  user: userAPI,        // User management
};
```

### Authentication Flow

```typescript
// JWT Token Management
const token = localStorage.getItem('auth_token');
const refreshToken = localStorage.getItem('refresh_token');

// Automatic token refresh
const refreshAuth = async () => {
  const response = await authAPI.refreshToken(refreshToken);
  localStorage.setItem('auth_token', response.token);
  localStorage.setItem('refresh_token', response.refreshToken);
};
```

## 🔧 Backend Implementation Guide

### 1. **Database Setup**

```sql
-- PostgreSQL Database Schema
-- See docs/architecture/database.md for complete schema

-- Core tables needed:
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  -- ... other fields
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  -- ... other fields
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  status ORDER_STATUS DEFAULT 'pending',
  -- ... other fields
);
```

### 2. **Authentication API Endpoints**

```typescript
// Required endpoints for authentication

// POST /api/auth/register
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
}

// GET /api/auth/me
// Requires Authorization header

// POST /api/auth/refresh
interface RefreshRequest {
  refreshToken: string;
}

// POST /api/auth/logout
// Requires Authorization header
```

### 3. **Products API Endpoints**

```typescript
// Required endpoints for products

// GET /api/products
interface ProductsQuery {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}

// GET /api/products/[id]
// GET /api/products/slug/[slug]

// GET /api/categories
// GET /api/products/[id]/reviews
```

### 4. **Cart API Endpoints**

```typescript
// Required endpoints for cart

// GET /api/cart
// POST /api/cart/add
interface AddToCartRequest {
  productId: string;
  quantity: number;
  variantId?: string;
}

// PUT /api/cart/items/[id]
// DELETE /api/cart/items/[id]
// DELETE /api/cart
```

### 5. **Orders API Endpoints**

```typescript
// Required endpoints for orders

// POST /api/orders
interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
    variantId?: string;
  }>;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  notes?: string;
}

// GET /api/orders
// GET /api/orders/[id]
// POST /api/orders/[id]/cancel
```

## 🔗 Frontend Integration Steps

### Step 1: Environment Configuration

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 2: Update API Base URL

```typescript
// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
```

### Step 3: Connect Authentication

```typescript
// src/store/auth.ts - Already implemented
// Just update the API_BASE_URL to point to your backend

// The authentication store is ready to work with your backend
const { login, register, logout, getCurrentUser } = useAuth();
```

### Step 4: Connect Products

```typescript
// src/app/(shop)/shop/ShopContent.tsx
// Replace static data with API calls

const { products, loading, error } = useProducts();

// useProducts hook implementation
const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getProducts();
        setProducts(data.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};
```

### Step 5: Connect Cart

```typescript
// src/store/cart.ts - Update to use API
// Currently uses localStorage, needs to sync with backend

const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      // Update to use API
      add: async (item, qty = 1) => {
        try {
          const response = await cartAPI.addToCart(item.id, qty);
          set({ items: response.items });
        } catch (error) {
          console.error('Failed to add to cart:', error);
        }
      },
      
      // ... other methods
    }),
    { name: 'anviy-cart' }
  )
);
```

## 🧪 Testing API Integration

### 1. **Test Authentication Flow**

```typescript
// Test login functionality
const testLogin = async () => {
  try {
    const response = await authAPI.login({
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('Login successful:', response);
    
    // Test getting current user
    const user = await authAPI.getCurrentUser();
    console.log('Current user:', user);
    
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### 2. **Test Product Loading**

```typescript
// Test product API
const testProducts = async () => {
  try {
    const products = await productsAPI.getProducts();
    console.log('Products loaded:', products);
    
    const product = await productsAPI.getProduct('product-id');
    console.log('Single product:', product);
    
  } catch (error) {
    console.error('Products failed:', error);
  }
};
```

### 3. **Test Cart Operations**

```typescript
// Test cart functionality
const testCart = async () => {
  try {
    // Get cart
    const cart = await cartAPI.getCart();
    console.log('Current cart:', cart);
    
    // Add item to cart
    const updatedCart = await cartAPI.addToCart('product-id', 1);
    console.log('Updated cart:', updatedCart);
    
  } catch (error) {
    console.error('Cart operations failed:', error);
  }
};
```

## 🚨 Common Integration Issues

### 1. **CORS Issues**

```typescript
// Backend CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

### 2. **Authentication Headers**

```typescript
// Frontend API client
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('auth_token');
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
  
  return response.json();
};
```

### 3. **Error Handling**

```typescript
// Consistent error handling
const handleApiError = (error: any) => {
  if (error.response?.status === 401) {
    // Handle authentication error
    useAuthStore.getState().logout();
    router.push('/login');
  } else if (error.response?.status === 404) {
    // Handle not found
    console.error('Resource not found');
  } else {
    // Handle other errors
    console.error('API Error:', error);
  }
};
```

## 📊 API Response Format

### Standard Response Structure

```typescript
// Success response
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}

// Error response
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Error description",
  "details": {
    // Additional error details
  }
}
```

### Pagination Response

```typescript
// Paginated response
{
  "success": true,
  "data": [
    // Array of items
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🔄 Migration Strategy

### Phase 1: Basic Integration
1. **Set up backend API** with basic endpoints
2. **Connect authentication** first
3. **Test login/logout** flow
4. **Connect products** API
5. **Test product loading**

### Phase 2: Full Integration
1. **Connect cart** functionality
2. **Connect checkout** process
3. **Implement payment** integration
4. **Test complete** user flow

### Phase 3: Optimization
1. **Add caching** layer
2. **Implement real-time** updates
3. **Add error recovery** mechanisms
4. **Performance optimization**

## 📝 Implementation Checklist

### Backend Setup
- [ ] **Database** schema created
- [ ] **Authentication** API implemented
- [ ] **Products** API implemented
- [ ] **Cart** API implemented
- [ ] **Orders** API implemented
- [ ] **CORS** configured
- [ ] **Error handling** implemented

### Frontend Integration
- [ ] **Environment variables** configured
- [ ] **API base URL** updated
- [ ] **Authentication** connected
- [ ] **Products** loading from API
- [ ] **Cart** synced with backend
- [ ] **Checkout** process working
- [ ] **Error handling** tested

### Testing
- [ ] **Authentication flow** tested
- [ ] **Product browsing** tested
- [ ] **Cart operations** tested
- [ ] **Checkout process** tested
- [ ] **Error scenarios** tested
- [ ] **Performance** validated

---

**Status**: 🔄 **Ready for Backend Integration**  
**Priority**: HIGH - Backend development needed  
**Estimated Time**: 4-6 weeks for complete integration
