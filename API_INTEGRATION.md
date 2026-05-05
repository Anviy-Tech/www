# 🚀 Anviy CMS API - Complete Frontend Integration Guide

## 📌 Base Configuration

**Base URL:** `http://localhost:8000/api` (Development)  
**Production URL:** `https://api.anviy.com/api`  
**Authentication:** Bearer Token (JWT)  
**Content-Type:** `application/json`

## 🔐 Authentication

All endpoints except `/auth/register`, `/auth/login`, and public product/category endpoints require authentication.

**Headers Required:**
```javascript
{
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'application/json'
}
```

---

## 📋 Complete API Endpoints

### 🏥 Health Check
```
GET /api/health
```
**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-09-23T10:30:00.000Z",
  "uptime": 123456
}
```

---

## 🔐 Authentication Endpoints

### 1. Register User
```
POST /api/auth/register
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phoneNumber": "+1-234-567-8900",
  "role": "user"  // Optional: "admin" | "user" (default: "user")
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "60d5ecb54b8b8c001f5e4e1a",
      "email": "user@example.com",
      "fullName": "John Doe",
      "phoneNumber": "+1-234-567-8900",
      "role": "user",
      "favorites": [],
      "createdAt": "2025-09-23T10:30:00.000Z",
      "updatedAt": "2025-09-23T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login User
```
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "60d5ecb54b8b8c001f5e4e1a",
      "email": "user@example.com",
      "fullName": "John Doe",
      "phoneNumber": "+1-234-567-8900",
      "role": "user",
      "favorites": [],
      "createdAt": "2025-09-23T10:30:00.000Z",
      "updatedAt": "2025-09-23T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get User Profile
```
GET /api/auth/profile
```
**Headers:** Authorization required

**Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "_id": "60d5ecb54b8b8c001f5e4e1a",
    "email": "user@example.com",
    "fullName": "John Doe",
    "phoneNumber": "+1-234-567-8900",
    "role": "user",
    "favorites": [],
    "createdAt": "2025-09-23T10:30:00.000Z",
    "updatedAt": "2025-09-23T10:30:00.000Z"
  }
}
```

### 4. Update User Profile
```
PUT /api/auth/profile
```
**Headers:** Authorization required

**Request Body:**
```json
{
  "fullName": "John Smith",
  "phoneNumber": "+1-234-567-8901"
}
```

### 5. Get All Users (Admin Only)
```
GET /api/auth/users?page=1&limit=10&sort=createdAt&order=desc
```

---

## 📂 Category Endpoints

### 1. Get All Categories
```
GET /api/categories?page=1&limit=10&sort=createdAt&order=desc
```
**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `sort`: Sort field (default: createdAt)
- `order`: Sort order - "asc" | "desc" (default: desc)

**Response (200):**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": {
    "categories": [
      {
        "_id": "60d5ecb54b8b8c001f5e4e1a",
        "name": "Rings",
        "description": "Beautiful rings for every occasion",
        "slug": "rings",
        "image": "https://example.com/category-rings.jpg",
        "createdAt": "2025-09-23T10:30:00.000Z",
        "updatedAt": "2025-09-23T10:30:00.000Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### 2. Get Single Category
```
GET /api/categories/:id
```

### 3. Create Category (Admin Only)
```
POST /api/categories
```
**Headers:** Authorization required + Admin role

**Request Body:**
```json
{
  "name": "Necklaces",
  "description": "Elegant necklaces and pendants",
  "image": "https://example.com/category-necklaces.jpg"
}
```

**Note:** Categories support only **one image** per category. The `image` field accepts a single image URL.

### 4. Update Category (Admin Only)
```
PUT /api/categories/:id
```

### 5. Delete Category (Admin Only)
```
DELETE /api/categories/:id
```

---

## 🛍️ Product Endpoints

### 1. Get All Products
```
GET /api/products?page=1&limit=10&sort=createdAt&order=desc&category=CATEGORY_ID&minPrice=100&maxPrice=1000&search=ring
```

**Query Parameters:**
- `page`, `limit`, `sort`, `order`: Pagination
- `category`: Filter by category ID
- `minPrice`, `maxPrice`: Price range filter
- `search`: Search in name and description

**Response (200):**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "products": [
      {
        "_id": "60d5ecb54b8b8c001f5e4e1a",
        "name": "Diamond Engagement Ring",
        "description": "Stunning 1ct diamond ring",
        "price": 2999.99,
        "stock": 5,
        "images": [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg"
        ],
        "category": {
          "_id": "60d5ecb54b8b8c001f5e4e1b",
          "name": "Rings",
          "slug": "rings"
        },
        "jewelryAttributes": {
          "metalType": "White Gold",
          "gemstoneDetails": {
            "type": "Diamond",
            "caratWeight": 1.0,
            "clarity": "VS1",
            "cut": "Excellent",
            "color": "H"
          },
          "dimensions": {
            "ringSize": 7
          },
          "certification": {
            "certificateNumber": "GIA123456",
            "issuingAuthority": "GIA",
            "grade": "Excellent"
          },
          "customizationOptions": {
            "engraving": true,
            "customSize": true,
            "metalChoice": true,
            "stoneChoice": false
          }
        },
        "inventory": {
          "lowStockThreshold": 2,
          "reorderPoint": 5,
          "sku": "RG-DIA-001",
          "barcode": "1234567890123",
          "weight": 5.2,
          "costPrice": 2000.00
        },
        "createdAt": "2025-09-23T10:30:00.000Z",
        "updatedAt": "2025-09-23T10:30:00.000Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### 2. Get Single Product
```
GET /api/products/:id
```

### 3. Search Products
```
GET /api/products/search?q=diamond
```

### 4. Create Product (Admin Only)
```
POST /api/products
```
**Headers:** Authorization required + Admin role

**Request Body:**
```json
{
  "name": "Diamond Engagement Ring",
  "description": "Stunning 1ct diamond ring",
  "price": 2999.99,
  "stock": 5,
  "images": [
    "https://example.com/image1.jpg"
  ],
  "category": "CATEGORY_ID",
  "jewelryAttributes": {
    "metalType": "White Gold",
    "gemstoneDetails": {
      "type": "Diamond",
      "caratWeight": 1.0,
      "clarity": "VS1",
      "cut": "Excellent",
      "color": "H"
    },
    "dimensions": {
      "ringSize": 7
    },
    "customizationOptions": {
      "engraving": true,
      "customSize": true
    }
  },
  "inventory": {
    "lowStockThreshold": 2,
    "reorderPoint": 5,
    "sku": "RG-DIA-001",
    "costPrice": 2000.00
  }
}
```

### 5. Update Product (Admin Only)
```
PUT /api/products/:id
```

### 6. Delete Product (Admin Only)
```
DELETE /api/products/:id
```

### 7. Get Featured Products
```
GET /api/products/featured
```

### 8. Get Products by Category
```
GET /api/products/category/:categoryId
```

---

## 🛒 Order Endpoints

### 1. Create Order
```
POST /api/orders
```
**Headers:** Authorization required

**Request Body:**
```json
{
  "items": [
    {
      "product": "PRODUCT_ID",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "phoneNumber": "+1-234-567-8900"
  },
  "paymentMethod": "credit_card",
  "notes": "Please handle with care"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "60d5ecb54b8b8c001f5e4e1a",
    "user": "USER_ID",
    "items": [
      {
        "product": {
          "_id": "PRODUCT_ID",
          "name": "Diamond Ring",
          "images": ["image1.jpg"],
          "price": 2999.99
        },
        "quantity": 2,
        "price": 2999.99
      }
    ],
    "totalAmount": 5999.98,
    "status": "pending",
    "paymentStatus": "pending",
    "orderDate": "2025-09-23T10:30:00.000Z",
    "orderNumber": "ORD-4E1A5B2C",
    "shippingAddress": {
      "fullName": "John Doe",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA",
      "phoneNumber": "+1-234-567-8900"
    },
    "paymentMethod": "credit_card",
    "notes": "Please handle with care",
    "createdAt": "2025-09-23T10:30:00.000Z",
    "updatedAt": "2025-09-23T10:30:00.000Z"
  }
}
```

### 2. Get User's Orders
```
GET /api/orders?page=1&limit=10&sort=orderDate&order=desc&status=pending&paymentStatus=paid&startDate=2025-01-01&endDate=2025-12-31
```

**Query Parameters:**
- `page`, `limit`, `sort`, `order`: Pagination
- `status`: Filter by order status - "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
- `paymentStatus`: Filter by payment status - "pending" | "paid" | "failed" | "refunded"
- `startDate`, `endDate`: Date range filter (YYYY-MM-DD)

### 3. Get Single Order
```
GET /api/orders/:id
```

### 4. Update Order (Admin Only)
```
PUT /api/orders/:id
```
**Request Body:**
```json
{
  "status": "shipped",
  "paymentStatus": "paid",
  "deliveryDate": "2025-10-01",
  "notes": "Order shipped via FedEx"
}
```

### 5. Cancel Order
```
PUT /api/orders/:id/cancel
```

### 6. Get All Orders (Admin Only)
```
GET /api/orders/all?page=1&limit=10
```

### 7. Get Order Statistics (Admin Only)
```
GET /api/orders/stats
```

---

## 💬 Comment/Review Endpoints

### 1. Get Comments for Product
```
GET /api/comments/product/:productId?page=1&limit=10&sort=createdAt&order=desc
```

**Response (200):**
```json
{
  "success": true,
  "message": "Comments retrieved successfully",
  "data": {
    "comments": [
      {
        "_id": "60d5ecb54b8b8c001f5e4e1a",
        "user": {
          "_id": "USER_ID",
          "fullName": "John Doe"
        },
        "product": "PRODUCT_ID",
        "content": "Amazing quality ring! Highly recommended.",
        "rating": 5,
        "isTestimonial": false,
        "isApproved": true,
        "likes": [],
        "likeCount": 0,
        "isReply": false,
        "createdAt": "2025-09-23T10:30:00.000Z",
        "updatedAt": "2025-09-23T10:30:00.000Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### 2. Create Comment/Review
```
POST /api/comments
```
**Headers:** Authorization required

**Request Body:**
```json
{
  "product": "PRODUCT_ID",
  "content": "Amazing quality ring! Highly recommended.",
  "rating": 5,
  "isTestimonial": false
}
```

### 3. Get Testimonials
```
GET /api/comments/testimonials?page=1&limit=10
```

### 4. Update Comment
```
PUT /api/comments/:id
```

### 5. Delete Comment
```
DELETE /api/comments/:id
```

### 6. Like/Unlike Comment
```
POST /api/comments/:id/like
DELETE /api/comments/:id/like
```

### 7. Get All Comments (Admin Only)
```
GET /api/comments?page=1&limit=10&approved=true
```

### 8. Approve Comment (Admin Only)
```
PUT /api/comments/:id/approve
```

---

## 🏭 Supplier Endpoints (Admin Only)

### 1. Get All Suppliers
```
GET /api/suppliers?page=1&limit=10&sort=name&order=asc&status=active
```

**Response (200):**
```json
{
  "success": true,
  "message": "Suppliers retrieved successfully",
  "data": {
    "suppliers": [
      {
        "_id": "60d5ecb54b8b8c001f5e4e1a",
        "name": "Premium Jewelry Co.",
        "contactPerson": "Sarah Johnson",
        "email": "sarah@premiumjewelry.com",
        "phone": "+1-555-123-4567",
        "address": {
          "street": "123 Diamond Ave",
          "city": "New York",
          "state": "NY",
          "zipCode": "10001",
          "country": "USA"
        },
        "businessDetails": {
          "taxId": "12-3456789",
          "registrationNumber": "REG123456",
          "website": "https://premiumjewelry.com"
        },
        "paymentTerms": {
          "creditLimit": 50000,
          "paymentDays": 30,
          "currency": "USD"
        },
        "status": "active",
        "notes": "Reliable supplier for premium diamonds",
        "createdAt": "2025-09-23T10:30:00.000Z",
        "updatedAt": "2025-09-23T10:30:00.000Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

### 2. Get Single Supplier
```
GET /api/suppliers/:id
```

### 3. Create Supplier
```
POST /api/suppliers
```
**Request Body:**
```json
{
  "name": "Premium Jewelry Co.",
  "contactPerson": "Sarah Johnson",
  "email": "sarah@premiumjewelry.com",
  "phone": "+1-555-123-4567",
  "address": {
    "street": "123 Diamond Ave",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "businessDetails": {
    "taxId": "12-3456789",
    "registrationNumber": "REG123456",
    "website": "https://premiumjewelry.com"
  },
  "paymentTerms": {
    "creditLimit": 50000,
    "paymentDays": 30,
    "currency": "USD"
  },
  "status": "active",
  "notes": "Reliable supplier for premium diamonds"
}
```

### 4. Update Supplier
```
PUT /api/suppliers/:id
```

### 5. Delete Supplier
```
DELETE /api/suppliers/:id
```

---

## 📦 Inventory Endpoints (Admin Only)

### 1. Get Inventory
```
GET /api/inventory?page=1&limit=10&sort=createdAt&order=desc&lowStock=true
```

### 2. Update Stock
```
POST /api/inventory/movement
```
**Request Body:**
```json
{
  "product": "PRODUCT_ID",
  "type": "in",
  "quantity": 10,
  "reason": "Purchase order received",
  "reference": "PO-12345",
  "notes": "Quality checked",
  "costPerUnit": 100.00
}
```

### 3. Get Inventory Reports
```
GET /api/inventory/reports?startDate=2025-01-01&endDate=2025-12-31&product=PRODUCT_ID
```

---

## 📁 File Upload Endpoints

### 1. Upload Single Image
```
POST /api/upload/image
```
**Headers:** Authorization required + Content-Type: multipart/form-data

**Form Data:**
- `image`: File (JPG, PNG, GIF, WEBP, max 10MB)

**Response (200):**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://example.com/uploads/image-123456.jpg",
    "filename": "image-123456.jpg",
    "originalName": "product-photo.jpg",
    "size": 1024000,
    "mimetype": "image/jpeg"
  }
}
```

**Note:** For categories, use this endpoint to upload a single image. Categories support only one image per category.

### 2. Upload Multiple Images
```
POST /api/upload/images
```
**Form Data:**
- `images`: Multiple files (max 10 images, 10MB each)

### 3. Upload Document
```
POST /api/upload/document
```
**Form Data:**
- `document`: File (PDF, DOC, DOCX, max 50MB)

### 4. Delete File
```
DELETE /api/upload/:filename
```

---

## 📊 Data Schemas

### User Schema
```typescript
interface User {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'admin' | 'user';
  favorites: string[]; // Product IDs
  createdAt: string;
  updatedAt: string;
}
```

### Category Schema
```typescript
interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image?: string; // Optional category image URL (single image only)
  createdAt: string;
  updatedAt: string;
}
```

### Product Schema
```typescript
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string | Category;
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
      issueDate?: string;
      grade?: string;
    };
    customizationOptions?: {
      engraving?: boolean;
      customSize?: boolean;
      metalChoice?: boolean;
      stoneChoice?: boolean;
    };
  };
  inventory?: {
    lowStockThreshold?: number;
    reorderPoint?: number;
    supplier?: string;
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
  createdAt: string;
  updatedAt: string;
}
```

### Order Schema
```typescript
interface OrderItem {
  product: string | Product;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  user: string | User;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
  };
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'cash_on_delivery';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderDate: string;
  deliveryDate?: string;
  notes?: string;
  orderNumber: string; // Virtual field
  createdAt: string;
  updatedAt: string;
}
```

### Comment Schema
```typescript
interface Comment {
  _id: string;
  user: string | User;
  product?: string | Product;
  content: string;
  rating?: number; // 1-5 for product reviews
  isTestimonial: boolean;
  isApproved: boolean;
  parentComment?: string; // For replies
  likes: string[]; // User IDs
  likeCount: number; // Virtual field
  isReply: boolean; // Virtual field
  createdAt: string;
  updatedAt: string;
}
```

### Supplier Schema
```typescript
interface Supplier {
  _id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessDetails: {
    taxId?: string;
    registrationNumber?: string;
    website?: string;
  };
  paymentTerms: {
    creditLimit?: number;
    paymentDays?: number;
    currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD' | 'AUD';
  };
  status: 'active' | 'inactive' | 'suspended';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## 🔧 Error Handling

### Standard Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information",
  "errors": [  // For validation errors
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

### Common HTTP Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **409**: Conflict (duplicate resource)
- **500**: Internal Server Error

---

## 🚀 Frontend Implementation Examples

### React/JavaScript Example
```javascript
// API Service
class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:8000/api';
    this.token = localStorage.getItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // Authentication
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.token = data.data.token;
    localStorage.setItem('authToken', this.token);
    return data;
  }

  // Products
  async getProducts(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/products?${searchParams}`);
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  // Orders
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getUserOrders(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/orders?${searchParams}`);
  }

  // Categories
  async getCategories(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/categories?${searchParams}`);
  }
}

// Usage
const api = new ApiService();

// Get products
const products = await api.getProducts({ 
  page: 1, 
  limit: 10, 
  category: 'categoryId',
  search: 'diamond' 
});

// Create order
const order = await api.createOrder({
  items: [{ product: 'productId', quantity: 2 }],
  shippingAddress: { /* address data */ },
  paymentMethod: 'credit_card'
});
```

---

## 📚 Additional Resources

- **Swagger Documentation**: Visit `/api-docs` for interactive API testing
- **Postman Collection**: Import endpoints for testing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **File Upload Limits**: Images 10MB, Documents 50MB
- **Pagination**: Default 10 items, max 100 per page

---

*Generated for Anviy CMS v1.0.0 - Last updated: September 23, 2025*
