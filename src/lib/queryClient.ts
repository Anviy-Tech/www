import { QueryClient } from '@tanstack/react-query';
import { handleQueryError } from '@/lib/errorHandler';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        // Don't retry on 401 (unauthorized) or 403 (forbidden)
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        // Don't retry more than 3 times
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Global error handler moved to individual queries due to React Query v5 changes
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Don't retry on client errors (4xx)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // Don't retry more than 2 times for mutations
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      // Global error handler moved to individual mutations due to React Query v5 changes
    },
  },
});
