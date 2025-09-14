/**
 * API constants for Crazy Cooker
 * Contains URLs, endpoints, timeouts and other API settings
 */

// Base URLs
export const API_BASE_URLS = {
  development: 'http://localhost:3000/api',
  staging: 'https://staging-api.crazy-cooker.com/api',
  production: 'https://api.crazy-cooker.com/api',
} as const;

// Firebase configuration
export const FIREBASE_CONFIG = {
  // These values will be replaced by environment variables
  apiKey: process.env.FIREBASE_API_KEY || '',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.FIREBASE_APP_ID || '',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || '',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    verifyPhone: '/auth/verify-phone',
  },
  
  // Recipes
  recipes: {
    list: '/recipes',
    create: '/recipes',
    get: (id: string) => `/recipes/${id}`,
    update: (id: string) => `/recipes/${id}`,
    delete: (id: string) => `/recipes/${id}`,
    search: '/recipes/search',
    categories: '/recipes/categories',
    popular: '/recipes/popular',
    recent: '/recipes/recent',
  },
  
  // Users
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    favorites: '/users/favorites',
    addFavorite: (recipeId: string) => `/users/favorites/${recipeId}`,
    removeFavorite: (recipeId: string) => `/users/favorites/${recipeId}`,
    recipes: '/users/recipes',
  },
  
  // AI generation
  ai: {
    generateRecipe: '/ai/generate-recipe',
    improveRecipe: '/ai/improve-recipe',
    suggestIngredients: '/ai/suggest-ingredients',
  },
  
  // Media
  media: {
    upload: '/media/upload',
    delete: (id: string) => `/media/${id}`,
  },
} as const;

// Request timeouts (in milliseconds)
export const API_TIMEOUTS = {
  default: 10000,      // 10 seconds
  upload: 30000,       // 30 seconds for file uploads
  ai: 60000,          // 60 seconds for AI requests
  auth: 15000,        // 15 seconds for authentication
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Application error codes
export const ERROR_CODES = {
  // Authentication
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  PHONE_ALREADY_EXISTS: 'PHONE_ALREADY_EXISTS',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  
  // Recipes
  RECIPE_NOT_FOUND: 'RECIPE_NOT_FOUND',
  RECIPE_ACCESS_DENIED: 'RECIPE_ACCESS_DENIED',
  INVALID_RECIPE_DATA: 'INVALID_RECIPE_DATA',
  
  // AI
  AI_SERVICE_UNAVAILABLE: 'AI_SERVICE_UNAVAILABLE',
  AI_REQUEST_FAILED: 'AI_REQUEST_FAILED',
  AI_RATE_LIMIT_EXCEEDED: 'AI_RATE_LIMIT_EXCEEDED',
  
  // General
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

// Limits and restrictions
export const LIMITS = {
  // Recipes
  RECIPE_TITLE_MAX_LENGTH: 100,
  RECIPE_DESCRIPTION_MAX_LENGTH: 1000,
  RECIPE_INGREDIENTS_MAX_COUNT: 50,
  RECIPE_STEPS_MAX_COUNT: 20,
  
  // Users
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  PASSWORD_MIN_LENGTH: 8,
  
  // Files
  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  IMAGE_ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  
  // AI requests
  AI_REQUEST_MAX_LENGTH: 500,
  AI_REQUESTS_PER_HOUR: 10,
} as const;

// Cache settings
export const CACHE_CONFIG = {
  // Cache lifetime (in milliseconds)
  recipes: 5 * 60 * 1000,        // 5 minutes
  userProfile: 10 * 60 * 1000,    // 10 minutes
  categories: 30 * 60 * 1000,    // 30 minutes
  popularRecipes: 15 * 60 * 1000, // 15 minutes
} as const;
