'use client';
import { products } from '@/data/products';

export default function StatsCards() {
  const totalProducts = products.length;
  const totalInventory = products.reduce((sum, p) => sum + p.stock, 0);
  const avgPrice = Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length);
  const lowStock = products.filter(p => p.stock < 20).length;

  const stats = [
    { title: 'Total Products', value: totalProducts, change: '+12%', trend: 'up', icon: '📦' },
    { title: 'Total Inventory', value: totalInventory, change: '+5%', trend: 'up', icon: '📊' },
    { title: 'Average Price', value: `₹${avgPrice.toLocaleString()}`, change: '+8%', trend: 'up', icon: '💰' },
    { title: 'Low Stock Items', value: lowStock, change: '-3%', trend: 'down', icon: '⚠️' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={stat.title} className="card-modern p-6 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-charcoal mt-1">{stat.value}</p>
            </div>
            <div className="text-3xl opacity-80">{stat.icon}</div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className={`text-sm font-medium ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
            <span className="text-xs text-neutral-500">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
