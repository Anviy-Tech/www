import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ToastProvider } from '@/components/Toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anviy Jewellery',
  description: 'Demi-fine jewellery ecommerce crafted with elegance',
  keywords: 'jewellery, demi-fine, rings, necklaces, earrings, bracelets, luxury',
  authors: [{ name: 'Anviy Jewellery' }],
  creator: 'Anviy Jewellery',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anviy.com',
    title: 'Anviy Jewellery',
    description: 'Demi-fine jewellery ecommerce crafted with elegance',
    siteName: 'Anviy Jewellery',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anviy Jewellery',
    description: 'Demi-fine jewellery ecommerce crafted with elegance',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#c9a96e" />
        <meta name="msapplication-TileColor" content="#c9a96e" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}


