import Link from 'next/link';
import Header from './components/Header';
import TopBar from './components/TopBar';
import Footer from './components/Footer';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      {children}
      <Footer />
    </div>
  );
}


