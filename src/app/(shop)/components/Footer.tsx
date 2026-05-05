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
              STAY CONNECTED
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">Pinterest</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">Facebook</Link>
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
              <div className="flex space-x-3">
                {/* PhonePe */}
                <div className="w-12 h-7 bg-white rounded-sm flex items-center justify-center p-1 shadow-sm">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="24" rx="3" fill="white"/>
                    <path d="M8 8h3c1.1 0 2 .9 2 2s-.9 2-2 2H8v4H6V8h2zm0 1.5v1h3c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H8z" fill="#5f259f"/>
                    <path d="M15 8h2v8h-2V8zm4 0h2l2 3 2-3h2l-3 4 3 4h-2l-2-3-2 3h-2l3-4-3-4z" fill="#5f259f"/>
                    <circle cx="30" cy="12" r="2.5" fill="#5f259f"/>
                  </svg>
                </div>
                
                {/* Google Pay */}
                <div className="w-12 h-7 bg-white rounded-sm flex items-center justify-center p-1 shadow-sm">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="24" rx="3" fill="white"/>
                    <path d="M12 10v3h3.5c-.1.8-.8 1.2-1.5 1.2-1.1 0-2-.9-2-2s.9-2 2-2c.5 0 1 .2 1.3.5l.8-.8c-.5-.5-1.2-.8-2.1-.8-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1.7 0 3-1.2 3-2.8V10H12z" fill="#4285f4"/>
                    <path d="M20 11.2c0-1.8 1.4-3.2 3.2-3.2s3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2zm5.1 0c0-1.1-.8-2-2-2s-2 .9-2 2 .8 2 2 2 2-.9 2-2z" fill="#ea4335"/>
                    <text x="28" y="16" font-family="Arial, sans-serif" font-size="4" fill="#5f6368">Pay</text>
                  </svg>
                </div>
                
                {/* Paytm */}
                <div className="w-12 h-7 bg-white rounded-sm flex items-center justify-center p-1 shadow-sm">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="24" rx="3" fill="white"/>
                    <rect width="40" height="24" rx="3" fill="#00baf2"/>
                    <text x="20" y="15" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="white" text-anchor="middle">Paytm</text>
                  </svg>
                </div>
                
                {/* UPI */}
                <div className="w-12 h-7 bg-white rounded-sm flex items-center justify-center p-1 shadow-sm">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="24" rx="3" fill="white"/>
                    <rect width="40" height="24" rx="3" fill="#ff6600"/>
                    <text x="20" y="15" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="white" text-anchor="middle">UPI</text>
                  </svg>
                </div>
                
                {/* Visa */}
                <div className="w-12 h-7 bg-white rounded-sm flex items-center justify-center p-1 shadow-sm">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="24" rx="3" fill="white"/>
                    <text x="20" y="15" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#1a1f71" text-anchor="middle">VISA</text>
                  </svg>
                </div>
                
                {/* Mastercard */}
                <div className="w-12 h-7 bg-white rounded-sm flex items-center justify-center p-1 shadow-sm">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="24" rx="3" fill="white"/>
                    <circle cx="15" cy="12" r="5" fill="#ff5f00"/>
                    <circle cx="25" cy="12" r="5" fill="#eb001b"/>
                    <path d="M20 8c-1.2.9-2 2.3-2 4s.8 3.1 2 4c1.2-.9 2-2.3 2-4s-.8-3.1-2-4z" fill="#ff5f00"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


