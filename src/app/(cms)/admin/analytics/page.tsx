'use client';

export default function AnalyticsPage() {
  const metrics = [
    { name: 'Page Views', value: '12.4K', change: '+15%', period: 'Last 30 days' },
    { name: 'Conversion Rate', value: '3.2%', change: '+0.8%', period: 'Last 30 days' },
    { name: 'Avg Order Value', value: '₹4,200', change: '+12%', period: 'Last 30 days' },
    { name: 'Return Customers', value: '68%', change: '+5%', period: 'Last 30 days' },
  ];

  const topCategories = [
    { name: 'Rings', percentage: 35, sales: '₹2.1L' },
    { name: 'Necklaces', percentage: 28, sales: '₹1.7L' },
    { name: 'Earrings', percentage: 22, sales: '₹1.3L' },
    { name: 'Bracelets', percentage: 15, sales: '₹0.9L' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="card-modern p-6">
        <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-neutral-600">Track your jewelry business performance and insights.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div key={metric.name} className="card-modern p-6 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <h3 className="text-sm font-medium text-neutral-600 mb-2">{metric.name}</h3>
            <div className="text-2xl font-bold text-charcoal mb-1">{metric.value}</div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-green-600">{metric.change}</span>
              <span className="text-xs text-neutral-500">{metric.period}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-modern p-6">
          <h3 className="text-lg font-semibold mb-6">Category Performance</h3>
          <div className="space-y-4">
            {topCategories.map((category, i) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-neutral-600">{category.sales}</span>
                </div>
                <div className="bg-neutral-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent to-accent-strong rounded-full transition-all duration-700 ease-out"
                    style={{ 
                      width: `${category.percentage}%`,
                      transitionDelay: `${i * 0.1}s`
                    }}
                  />
                </div>
                <div className="text-xs text-neutral-500">{category.percentage}% of total sales</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-modern p-6">
          <h3 className="text-lg font-semibold mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {[
              { source: 'Organic Search', visitors: '4.2K', percentage: 42 },
              { source: 'Social Media', visitors: '2.8K', percentage: 28 },
              { source: 'Direct Traffic', visitors: '1.9K', percentage: 19 },
              { source: 'Email Marketing', visitors: '1.1K', percentage: 11 },
            ].map((source, i) => (
              <div key={source.source} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{source.source}</div>
                  <div className="text-sm text-neutral-600">{source.visitors} visitors</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{source.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-modern p-6">
        <h3 className="text-lg font-semibold mb-6">Customer Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2.4K</div>
            <div className="text-sm text-neutral-600">Total Customers</div>
            <div className="text-xs text-green-600">+18% this month</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">₹4,200</div>
            <div className="text-sm text-neutral-600">Avg Lifetime Value</div>
            <div className="text-xs text-green-600">+12% this month</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
            <div className="text-sm text-neutral-600">Avg Rating</div>
            <div className="text-xs text-green-600">+0.2 this month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
