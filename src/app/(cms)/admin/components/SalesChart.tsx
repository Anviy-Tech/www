'use client';

export default function SalesChart() {
  const salesData = [
    { month: 'Jan', sales: 65000, orders: 89 },
    { month: 'Feb', sales: 78000, orders: 102 },
    { month: 'Mar', sales: 92000, orders: 127 },
    { month: 'Apr', sales: 88000, orders: 115 },
    { month: 'May', sales: 105000, orders: 145 },
    { month: 'Jun', sales: 120000, orders: 168 },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className="card-modern p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Sales Overview</h3>
        <select className="text-sm border rounded-lg px-3 py-1 bg-white">
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {salesData.map((data, i) => (
          <div key={data.month} className="flex items-center gap-4">
            <div className="w-8 text-sm font-medium text-neutral-600">{data.month}</div>
            <div className="flex-1 bg-neutral-100 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-accent-strong rounded-full transition-all duration-700 ease-out"
                style={{ 
                  width: `${(data.sales / maxSales) * 100}%`,
                  transitionDelay: `${i * 0.1}s`
                }}
              />
            </div>
            <div className="text-right min-w-0">
              <div className="text-sm font-semibold">₹{(data.sales / 1000).toFixed(0)}K</div>
              <div className="text-xs text-neutral-500">{data.orders} orders</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-green-600">₹548K</div>
          <div className="text-sm text-neutral-600">Total Revenue</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600">746</div>
          <div className="text-sm text-neutral-600">Total Orders</div>
        </div>
      </div>
    </div>
  );
}
