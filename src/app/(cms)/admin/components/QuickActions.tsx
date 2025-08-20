'use client';

export default function QuickActions() {
  const actions = [
    { title: 'Add New Product', desc: 'Create a new product listing', icon: '➕', color: 'from-blue-500 to-blue-600' },
    { title: 'Upload Images', desc: 'Bulk upload product images', icon: '🖼️', color: 'from-purple-500 to-purple-600' },
    { title: 'Export Data', desc: 'Download product catalog', icon: '📥', color: 'from-green-500 to-green-600' },
    { title: 'View Analytics', desc: 'Check performance metrics', icon: '📈', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="card-modern p-6">
      <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, i) => (
          <button 
            key={action.title}
            className="p-4 rounded-xl bg-gradient-to-r hover:shadow-lg transition-all duration-300 hover:scale-105 text-left group"
            style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
          >
            <div className={`bg-gradient-to-r ${action.color} text-white rounded-xl p-4 hover:shadow-lg transition-all duration-300`}>
              <div className="text-2xl mb-2">{action.icon}</div>
              <h4 className="font-semibold text-sm">{action.title}</h4>
              <p className="text-xs opacity-90 mt-1">{action.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
