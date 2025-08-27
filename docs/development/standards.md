# Development Standards & Guidelines

## 🎯 Overview

This document outlines the coding standards, best practices, and development guidelines for the ANVIY e-commerce platform. Following these standards ensures code quality, maintainability, and consistency across the project.

## 📋 Table of Contents

1. [Code Style & Formatting](#code-style--formatting)
2. [TypeScript Guidelines](#typescript-guidelines)
3. [React Best Practices](#react-best-practices)
4. [Component Standards](#component-standards)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Testing Standards](#testing-standards)
8. [Performance Guidelines](#performance-guidelines)
9. [Security Guidelines](#security-guidelines)
10. [Git Workflow](#git-workflow)

## 🎨 Code Style & Formatting

### General Principles

- **Consistency**: Follow established patterns
- **Readability**: Code should be self-documenting
- **Maintainability**: Write code for future developers
- **Performance**: Consider performance implications

### File Naming Conventions

```typescript
// Components: PascalCase
ProductCard.tsx
UserProfile.tsx
CheckoutForm.tsx

// Pages: kebab-case (Next.js App Router)
product/[slug]/page.tsx
checkout/page.tsx
user/profile/page.tsx

// Utilities: camelCase
api.ts
utils.ts
constants.ts

// Types: PascalCase
User.ts
Product.ts
Order.ts
```

### Import Organization

```typescript
// 1. React and Next.js imports
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

// 3. Internal utilities and types
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types/api';

// 4. Components
import ProductCard from '@/components/ProductCard';
import Button from '@/components/ui/Button';

// 5. Styles (if any)
import './Component.module.css';
```

### Code Formatting

```typescript
// Use Prettier configuration
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}

// Example of well-formatted code
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  onAddToFavorites: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToFavorites,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart(product.id);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-card">
      {/* Component content */}
    </div>
  );
};
```

## 🔷 TypeScript Guidelines

### Type Definitions

```typescript
// Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

// Use enums for fixed values
enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  MANAGER = 'manager',
}

// Use type aliases for unions and complex types
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

type ProductStatus = 'active' | 'inactive' | 'draft';
```

### Strict Type Checking

```typescript
// Enable strict mode in tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}

// Always define return types for functions
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Use proper typing for async functions
const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};
```

### Error Handling

```typescript
// Define custom error types
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Use Result pattern for error handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

const fetchUser = async (id: string): Promise<Result<User, ApiError>> => {
  try {
    const response = await api.get(`/users/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: new ApiError('Failed to fetch user', 500) 
    };
  }
};
```

## ⚛️ React Best Practices

### Component Structure

```typescript
// 1. Imports
import React, { useState, useEffect } from 'react';

// 2. Types/Interfaces
interface ComponentProps {
  // Props definition
}

// 3. Component
export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 4. State
  const [state, setState] = useState<StateType>(initialState);

  // 5. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // 6. Event handlers
  const handleEvent = () => {
    // Event logic
  };

  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// 8. Export
export default Component;
```

### Hooks Guidelines

```typescript
// Custom hooks should start with 'use'
const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await api.getProduct(productId);
        setProduct(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};

// Use proper dependency arrays
useEffect(() => {
  // Effect logic
}, [dependency1, dependency2]); // Always include all dependencies
```

### Performance Optimization

```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo<ComponentProps>(({ data }) => {
  return <div>{/* Expensive rendering */}</div>;
});

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Use useCallback for event handlers passed to children
const handleClick = useCallback((id: string) => {
  // Handle click
}, [dependency]);

// Use proper key props for lists
{items.map((item) => (
  <ListItem key={item.id} item={item} />
))}
```

## 🧩 Component Standards

### Component Categories

```typescript
// 1. Presentational Components (UI)
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// 2. Container Components (Logic)
interface ProductListProps {
  category?: string;
  onProductSelect: (product: Product) => void;
}

// 3. Layout Components
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}
```

### Component Documentation

```typescript
/**
 * ProductCard - Displays product information in a card format
 * 
 * @component
 * @example
 * ```tsx
 * <ProductCard
 *   product={product}
 *   onAddToCart={handleAddToCart}
 *   onAddToFavorites={handleAddToFavorites}
 * />
 * ```
 */
interface ProductCardProps {
  /** Product data to display */
  product: Product;
  /** Callback when add to cart is clicked */
  onAddToCart: (productId: string) => void;
  /** Callback when add to favorites is clicked */
  onAddToFavorites: (productId: string) => void;
  /** Additional CSS classes */
  className?: string;
}
```

### Styling Guidelines

```typescript
// Use Tailwind CSS classes
const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  return (
    <div className={clsx(
      'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
      'p-6 border border-gray-200',
      className
    )}>
      {/* Component content */}
    </div>
  );
};

// Use CSS modules for complex styling
import styles from './ProductCard.module.css';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* Image content */}
      </div>
    </div>
  );
};
```

## 🗃️ State Management

### Zustand Store Structure

```typescript
// Store definition
interface AuthStore {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  clearError: () => void;
}

// Store implementation
export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login(credentials);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  setUser: (user) => set({ user }),
  clearError: () => set({ error: null }),
}));
```

### State Management Best Practices

```typescript
// 1. Keep stores focused and small
// 2. Use selectors for performance
const useUser = () => useAuthStore((state) => state.user);
const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);

// 3. Use immer for complex state updates
import { immer } from 'zustand/middleware/immer';

export const useCartStore = create(
  immer<CartStore>((set) => ({
    items: [],
    addItem: (item) =>
      set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...item, quantity: 1 });
        }
      }),
  }))
);
```

## 🔌 API Integration

### API Client Structure

```typescript
// API client configuration
const apiClient = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Request interceptor for authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
```

### API Service Pattern

```typescript
// Service layer
class ProductService {
  static async getProducts(params?: ProductFilters): Promise<Product[]> {
    const response = await apiClient.get('/products', { params });
    return response.data;
  }

  static async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  }

  static async createProduct(product: CreateProductRequest): Promise<Product> {
    const response = await apiClient.post('/products', product);
    return response.data;
  }
}

// Usage in components
const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getProducts();
        setProducts(data);
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

## 🧪 Testing Standards

### Testing Structure

```typescript
// Component testing
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    price: 100,
    // ... other properties
  };

  const mockProps = {
    product: mockProduct,
    onAddToCart: jest.fn(),
    onAddToFavorites: jest.fn(),
  };

  it('renders product information correctly', () => {
    render(<ProductCard {...mockProps} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('₹100')).toBeInTheDocument();
  });

  it('calls onAddToCart when add to cart button is clicked', () => {
    render(<ProductCard {...mockProps} />);
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);
    
    expect(mockProps.onAddToCart).toHaveBeenCalledWith('1');
  });
});
```

### API Testing

```typescript
// API service testing
import { ProductService } from './ProductService';

// Mock API client
jest.mock('./apiClient', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches products successfully', async () => {
    const mockProducts = [{ id: '1', name: 'Product 1' }];
    apiClient.get.mockResolvedValue({ data: mockProducts });

    const result = await ProductService.getProducts();
    
    expect(result).toEqual(mockProducts);
    expect(apiClient.get).toHaveBeenCalledWith('/products', { params: undefined });
  });
});
```

## ⚡ Performance Guidelines

### Code Splitting

```typescript
// Use dynamic imports for code splitting
const ProductDetails = dynamic(() => import('./ProductDetails'), {
  loading: () => <ProductDetailsSkeleton />,
  ssr: false,
});

// Lazy load components based on conditions
const AdminPanel = lazy(() => import('./AdminPanel'));

const Dashboard = () => {
  const { user } = useAuthStore();
  
  return (
    <div>
      {user?.role === 'admin' && (
        <Suspense fallback={<div>Loading admin panel...</div>}>
          <AdminPanel />
        </Suspense>
      )}
    </div>
  );
};
```

### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image';

const ProductImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      priority={false}
    />
  );
};
```

### Bundle Optimization

```typescript
// Tree shaking friendly imports
import { Button } from '@/components/ui/Button';
// Instead of
import { Button } from '@/components/ui';

// Use barrel exports carefully
// index.ts
export { Button } from './Button';
export { Input } from './Input';
// Only export what's needed
```

## 🔒 Security Guidelines

### Input Validation

```typescript
// Use Zod for runtime validation
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
});

// Validate data before processing
const createUser = async (userData: unknown) => {
  const validatedData = UserSchema.parse(userData);
  // Process validated data
};
```

### XSS Prevention

```typescript
// Sanitize user input
import DOMPurify from 'dompurify';

const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html);
};

// Use React's built-in XSS protection
const UserComment: React.FC<{ comment: string }> = ({ comment }) => {
  return <div>{comment}</div>; // React automatically escapes content
};
```

### Authentication

```typescript
// Secure token storage
const storeToken = (token: string) => {
  // Use httpOnly cookies in production
  localStorage.setItem('auth_token', token);
};

// Secure token transmission
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // For cookies
});
```

## 🔄 Git Workflow

### Branch Naming

```bash
# Feature branches
feature/user-authentication
feature/product-search
feature/checkout-process

# Bug fixes
fix/login-validation
fix/cart-sync-issue

# Hotfixes
hotfix/security-patch
hotfix/critical-bug

# Releases
release/v1.2.0
```

### Commit Messages

```bash
# Format: type(scope): description

# Examples
feat(auth): add JWT token refresh functionality
fix(cart): resolve cart synchronization issues
docs(api): update authentication API documentation
style(components): improve button component styling
refactor(store): simplify cart store implementation
test(products): add unit tests for product service
chore(deps): update dependencies to latest versions
```

### Pull Request Guidelines

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 📊 Code Quality Metrics

### Linting Rules

```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react-hooks/exhaustive-deps": "error",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Performance Budgets

```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "2kb",
      "maximumError": "4kb"
    }
  ]
}
```

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Standards Version**: 2.0
