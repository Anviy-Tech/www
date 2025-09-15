// Animation and UI Constants
export const ANIMATION_DELAYS = {
  REVEAL_BASE: 100,
  REVEAL_MAX: 300,
  STAGGER_STEP: 50,
} as const;

export const TIMING = {
  CART_ADD_DELAY: 600,
  TOAST_DURATION: 5000,
  API_TIMEOUT: 10000,
  DEBOUNCE_DELAY: 300,
} as const;

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 8,
  MAX_PAGE_SIZE: 50,
  MOBILE_PAGE_SIZE: 6,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Z-index layers
export const Z_INDEX = {
  DROPDOWN: 50,
  MODAL: 100,
  TOAST: 1000,
  TOOLTIP: 1100,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products',
    SEARCH: '/products/search',
    BY_CATEGORY: '/products/category',
  },
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: '/categories',
    BY_SLUG: '/categories/slug',
    SEARCH: '/categories/search',
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/items',
    REMOVE: '/cart/items',
    CLEAR: '/cart',
  },
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: '/orders',
    CANCEL: '/orders',
  },
  REVIEWS: {
    LIST: '/products',
    CREATE: '/products',
    UPDATE: '/reviews',
    DELETE: '/reviews',
  },
  USER: {
    PROFILE: '/user/profile',
    ADDRESSES: '/user/addresses',
  },
  PAYMENT: {
    CREATE_INTENT: '/payment/create-intent',
    CONFIRM: '/payment/confirm',
  },
  NEWSLETTER: {
    SUBSCRIBE: '/newsletter/subscribe',
    UNSUBSCRIBE: '/newsletter/unsubscribe',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: {
    TIMEOUT: 'Request timeout - please try again',
    OFFLINE: 'You appear to be offline. Please check your connection.',
    GENERIC: 'An unexpected error occurred. Please try again.',
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Please sign in to continue',
    FORBIDDEN: 'You don\'t have permission to perform this action',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
    PASSWORD_MISMATCH: 'Passwords do not match',
  },
  PRODUCT: {
    NOT_FOUND: 'Product not found',
    OUT_OF_STOCK: 'This item is currently out of stock',
    INSUFFICIENT_STOCK: 'Not enough items in stock',
  },
  CART: {
    EMPTY: 'Your cart is empty',
    ITEM_NOT_FOUND: 'Item not found in cart',
    QUANTITY_INVALID: 'Invalid quantity selected',
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN: 'Welcome back!',
    REGISTER: 'Account created successfully!',
    LOGOUT: 'Signed out successfully',
    PASSWORD_RESET: 'Password reset email sent',
  },
  CART: {
    ADDED: 'Item added to cart',
    UPDATED: 'Cart updated successfully',
    REMOVED: 'Item removed from cart',
    CLEARED: 'Cart cleared successfully',
  },
  PROFILE: {
    UPDATED: 'Profile updated successfully',
    ADDRESS_ADDED: 'Address added successfully',
    ADDRESS_UPDATED: 'Address updated successfully',
    ADDRESS_REMOVED: 'Address removed successfully',
  },
  ORDER: {
    CREATED: 'Order placed successfully!',
    CANCELLED: 'Order cancelled successfully',
  },
  REVIEW: {
    CREATED: 'Review submitted successfully',
    UPDATED: 'Review updated successfully',
    DELETED: 'Review deleted successfully',
  },
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH: {
    TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'auth_user',
  },
  CART: 'anviy-cart',
  FAVORITES: 'anviy-favorites',
  THEME: 'anviy-theme',
  LANGUAGE: 'anviy-language',
} as const;

// Form Validation Rules
export const VALIDATION_RULES = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL: false,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 15,
  },
} as const;

// Product Categories
export const PRODUCT_CATEGORIES = [
  'rings',
  'necklaces',
  'earrings',
  'bracelets',
  'anklets',
  'watches',
  'accessories',
] as const;

// Sort Options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A to Z' },
  { value: 'name_desc', label: 'Name: Z to A' },
  { value: 'popular', label: 'Most Popular' },
] as const;

// Currency
export const CURRENCY = {
  CODE: 'INR',
  SYMBOL: '₹',
  LOCALE: 'en-IN',
} as const;

// Social Media
export const SOCIAL_MEDIA = {
  INSTAGRAM: 'https://instagram.com/anviyjewellery',
  FACEBOOK: 'https://facebook.com/anviyjewellery',
  TWITTER: 'https://twitter.com/anviyjewellery',
  PINTEREST: 'https://pinterest.com/anviyjewellery',
} as const;
