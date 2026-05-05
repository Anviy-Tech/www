'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/queryClient';
import { ToastProvider, useToast } from '@/components/Toast';
import { ErrorHandler } from '@/lib/errorHandler';
import { useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';

interface ProvidersProps {
  children: React.ReactNode;
}

// Component to initialize error handler with toast
function ErrorHandlerInitializer() {
  const { addToast } = useToast();

  useEffect(() => {
    ErrorHandler.setToastFunction(addToast);
  }, [addToast]);

  return null;
}

// Online/Offline status handler
function OnlineStatusHandler() {
  const { addToast } = useToast();

  useEffect(() => {
    const handleOnline = () => ErrorHandler.handleConnectionStatus(true);
    const handleOffline = () => ErrorHandler.handleConnectionStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [addToast]);

  return null;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorHandlerInitializer />
          <OnlineStatusHandler />
          {children}
          {/* TanStack React Query Devtools - Hidden as requested */}
          {/* {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )} */}
        </QueryClientProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
