'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = 'wulab2026';

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('密钥无效，请联系首席执行官');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-light tracking-wider text-stone-800 mb-2">the Wu lab</h1>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-xl font-medium text-gray-900 mb-6 text-center">请输入管理员密钥</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Admin Key"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent mb-4 text-gray-900"
            />
            {error && (
              <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
            )}
            <button
              onClick={handleLogin}
              className="w-full bg-stone-800 text-white py-3 rounded-lg font-medium hover:bg-stone-900 transition-colors"
            >
              进入
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Revenue', value: '$12,450.00', change: '+12.5%', positive: true },
    { label: 'Total Orders', value: '342', change: '+8.2%', positive: true },
    { label: 'Conversion Rate', value: '3.8%', change: '-0.3%', positive: false },
    { label: 'Active Visitors', value: '45', change: '+5', positive: true },
  ];

  const recentOrders = [
    { id: '#WL-2847', customer: 'Sarah Johnson', item: 'Cosmic Turquoise Bracelet', date: '2024-01-15', amount: '$226.00', status: 'Paid' },
    { id: '#WL-2846', customer: 'Michael Chen', item: 'Imperial Jasper Bracelet', date: '2024-01-15', amount: '$183.00', status: 'Processing' },
    { id: '#WL-2845', customer: 'Emma Williams', item: 'Santa Maria Aquamarine', date: '2024-01-14', amount: '$2,524.00', status: 'Shipped' },
    { id: '#WL-2844', customer: 'David Lee', item: 'Labradorite Bracelet', date: '2024-01-14', amount: '$310.00', status: 'Paid' },
    { id: '#WL-2843', customer: 'Sophia Martinez', item: 'Blue Aventurine Bracelet', date: '2024-01-13', amount: '$310.00', status: 'Shipped' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="font-serif text-2xl font-light tracking-wider text-stone-800">the Wu lab</h1>
          <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 text-sm font-medium transition-colors ${
              activeTab === 'dashboard' ? 'bg-stone-100 text-stone-900' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 text-sm font-medium transition-colors ${
              activeTab === 'orders' ? 'bg-stone-100 text-stone-900' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📦 Orders
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 text-sm font-medium transition-colors ${
              activeTab === 'products' ? 'bg-stone-100 text-stone-900' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            💎 Products
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 text-sm font-medium transition-colors ${
              activeTab === 'customers' ? 'bg-stone-100 text-stone-900' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            👥 Customers
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 text-sm font-medium transition-colors ${
              activeTab === 'settings' ? 'bg-stone-100 text-stone-900' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            ⚙️ Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-500 mt-1">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              🔔
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">The Wu Lab Admin</p>
                <p className="text-xs text-gray-500">admin@thewulab.com</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
            ))}
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <p className="text-sm text-gray-500 mt-1">Latest transactions from your store</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{order.item}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
