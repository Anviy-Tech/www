import StatsCards from './components/StatsCards';
import SalesChart from './components/SalesChart';
import QuickActions from './components/QuickActions';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="card-modern p-6">
        <h2 className="text-xl font-semibold mb-2">Welcome back! 👋</h2>
        <p className="text-neutral-600">Here's what's happening with your jewelry business today.</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <SalesChart />
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-modern p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New order received', item: 'Aurora Ring', time: '5 min ago', type: 'order' },
              { action: 'Product updated', item: 'Tennis Bracelet', time: '1 hour ago', type: 'update' },
              { action: 'Inventory low', item: 'Pearl Necklace', time: '2 hours ago', type: 'warning' },
              { action: 'Review received', item: 'Mini Hoops', time: '3 hours ago', type: 'review' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'order' ? 'bg-green-500' :
                  activity.type === 'update' ? 'bg-blue-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-neutral-600">{activity.item}</p>
                </div>
                <span className="text-xs text-neutral-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-modern p-6">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Aurora Ring', sales: 45, revenue: '₹1.3L' },
              { name: 'Tennis Bracelet', sales: 32, revenue: '₹2.6L' },
              { name: 'Mini Hoops', sales: 28, revenue: '₹56K' },
              { name: 'Pearl Necklace', sales: 24, revenue: '₹94K' },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-neutral-600">{product.sales} sold</p>
                </div>
                <span className="font-semibold text-accent-strong">{product.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


