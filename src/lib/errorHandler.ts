import { Toast } from '@/components/Toast';

// Error types
export interface ApiError extends Error {
  status?: number;
  statusText?: string;
  endpoint?: string;
  timestamp?: string;
  isTimeout?: boolean;
}

// Global error handler
export class ErrorHandler {
  private static addToast: ((toast: Omit<Toast, 'id'>) => void) | null = null;

  static setToastFunction(addToast: (toast: Omit<Toast, 'id'>) => void) {
    this.addToast = addToast;
  }

  static handleError(error: ApiError, context?: string): void {
    console.error('API Error:', {
      error,
      context,
      timestamp: new Date().toISOString(),
    });

    // Don't show toast for authentication errors (handled by auth flow)
    if (error.status === 401) {
      return;
    }

    // Create user-friendly error message
    const errorMessage = this.getErrorMessage(error);
    
    if (this.addToast) {
      this.addToast({
        type: 'error',
        title: 'Something went wrong',
        message: errorMessage,
        duration: error.isTimeout ? 8000 : 6000,
        action: error.isTimeout ? {
          label: 'Retry',
          onClick: () => window.location.reload(),
        } : undefined,
      });
    }
  }

  static handleSuccess(message: string, title: string = 'Success'): void {
    if (this.addToast) {
      this.addToast({
        type: 'success',
        title,
        message,
        duration: 4000,
      });
    }
  }

  static handleWarning(message: string, title: string = 'Warning'): void {
    if (this.addToast) {
      this.addToast({
        type: 'warning',
        title,
        message,
        duration: 5000,
      });
    }
  }

  static handleInfo(message: string, title: string = 'Info'): void {
    if (this.addToast) {
      this.addToast({
        type: 'info',
        title,
        message,
        duration: 4000,
      });
    }
  }

  private static getErrorMessage(error: ApiError): string {
    // Handle timeout errors
    if (error.isTimeout) {
      return 'Request timed out. Please check your connection and try again.';
    }

    // Handle network errors
    if (!error.status) {
      return 'Network error. Please check your connection.';
    }

    // Handle specific HTTP status codes
    switch (error.status) {
      case 400:
        return error.message || 'Invalid request. Please check your input.';
      case 401:
        return 'You need to log in to access this resource.';
      case 403:
        return 'You don\'t have permission to access this resource.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return error.message || 'This action conflicts with existing data.';
      case 422:
        return error.message || 'Invalid data provided.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 502:
      case 503:
      case 504:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return error.message || `An error occurred (${error.status}).`;
    }
  }

  // Validation helpers
  static validateResponse<T>(response: any): T {
    if (!response) {
      throw new Error('No response received');
    }

    if (!response.success) {
      const error = new Error(response.message || 'Request failed') as ApiError;
      error.status = response.status || 400;
      throw error;
    }

    if (!response.data) {
      throw new Error('No data in response');
    }

    return response.data;
  }

  // Form validation error handler
  static handleFormErrors(errors: Record<string, string[]>): void {
    const firstError = Object.values(errors)[0]?.[0];
    if (firstError && this.addToast) {
      this.addToast({
        type: 'error',
        title: 'Validation Error',
        message: firstError,
        duration: 5000,
      });
    }
  }

  // Connection status handler
  static handleConnectionStatus(isOnline: boolean): void {
    if (this.addToast) {
      if (isOnline) {
        this.addToast({
          type: 'success',
          title: 'Connection Restored',
          message: 'You\'re back online!',
          duration: 3000,
        });
      } else {
        this.addToast({
          type: 'warning',
          title: 'Connection Lost',
          message: 'You\'re currently offline. Some features may not work.',
          duration: 0, // Don't auto-dismiss
        });
      }
    }
  }
}

// React Query error handler
export const handleQueryError = (error: any, context?: string) => {
  ErrorHandler.handleError(error as ApiError, context);
};

// Mutation success handler
export const handleMutationSuccess = (message: string, title?: string) => {
  ErrorHandler.handleSuccess(message, title);
};

// Global error boundary handler
export const handleGlobalError = (error: Error, errorInfo?: any) => {
  console.error('Global Error:', error, errorInfo);
  
  ErrorHandler.handleError({
    ...error,
    message: 'An unexpected error occurred. Please refresh the page.',
  } as ApiError, 'Global Error Boundary');
};
