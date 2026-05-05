import Link from 'next/link';
import Header from './components/Header';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import ReviewsPopup from '@/components/ReviewsPopup';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      {children}
      <Footer />
      <ReviewsPopup />
    </div>
  );
}


