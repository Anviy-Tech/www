import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-page">
        {/* Main Footer */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-display text-3xl mb-6 block">
              ANVIY
            </Link>
            <p className="text-gray-300 leading-relaxed max-w-md mb-8">
              Meticulously crafted fine jewelry that transcends trends. Each piece tells a story 
              of timeless elegance and contemporary sophistication.
            </p>
            <div className="text-small-caps text-xs text-gray-400 tracking-widest mb-4">
              FOLLOW OUR JOURNEY
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">Pinterest</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">Newsletter</Link>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <div className="text-small-caps text-xs text-gray-400 tracking-widest mb-6">
              CUSTOMER CARE
            </div>
            <nav className="space-y-4">
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Size Guide
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Care Instructions
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Shipping Information
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Returns & Exchanges
              </Link>
            </nav>
          </div>

          {/* About */}
          <div>
            <div className="text-small-caps text-xs text-gray-400 tracking-widest mb-6">
              ABOUT ANVIY
            </div>
            <nav className="space-y-4">
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                Our Story
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Craftsmanship
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Materials
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Sustainability
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Press
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Anviy. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-small-caps text-xs text-gray-400 tracking-widest">
                SECURE PAYMENTS
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


