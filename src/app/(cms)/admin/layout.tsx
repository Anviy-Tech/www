'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/products', label: 'Products', icon: '📦' },
    { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
    { href: '/admin/media', label: 'Media', icon: '🖼️' },
    { href: '/admin/pages', label: 'Pages', icon: '📄' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-soft via-background to-white/50">
      <div className="container-page py-8">
        <header className="card-modern p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Anviy Admin</h1>
              <p className="text-neutral-600 mt-1">Manage your jewelry business</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="btn-glass">
                🔔 Notifications
              </button>
              <Link href="/" className="btn-outline">
                View Store
              </Link>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside className="card-modern p-6 h-fit">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${pathname === item.href 
                      ? 'bg-gradient-to-r from-accent to-accent-strong text-white shadow-lg' 
                      : 'hover:bg-white/50 text-charcoal'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
            
            <div className="mt-8 p-4 bg-gradient-to-br from-accent/10 to-accent-strong/10 rounded-xl">
              <h4 className="font-semibold text-sm mb-2">💡 Pro Tip</h4>
              <p className="text-xs text-neutral-600">Use bulk actions to update multiple products at once for faster inventory management.</p>
            </div>
          </aside>
          
          <main className="space-y-6">{children}</main>
        </div>
      </div>
    </div>
  );
}


