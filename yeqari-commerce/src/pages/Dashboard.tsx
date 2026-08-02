import React from 'react';
import { TrendingUp, Users, ShoppingBag, CreditCard, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { name: "Today's Sales", value: 'Rs. 184,500', icon: TrendingUp, change: '+12%', changeType: 'positive' },
  { name: 'Orders', value: '27', icon: ShoppingBag, change: '+4', changeType: 'positive' },
  { name: 'New Customers', value: '19', icon: Users, change: '+2', changeType: 'positive' },
  { name: 'Pending Payments', value: '7', icon: CreditCard, change: '-1', changeType: 'negative' },
];

const pipeline = [
  { status: 'New', count: 11, color: 'bg-blue-100 text-blue-700' },
  { status: 'Payment Pending', count: 7, color: 'bg-amber-100 text-amber-700' },
  { status: 'Processing', count: 5, color: 'bg-purple-100 text-purple-700' },
  { status: 'Ready', count: 9, color: 'bg-indigo-100 text-indigo-700' },
  { status: 'Delivered', count: 18, color: 'bg-green-100 text-green-700' },
];

const actions = [
  { id: 1, message: '7 payments need verification', type: 'warning' },
  { id: 2, message: "4 customers haven't replied", type: 'alert' },
  { id: 3, message: '3 products are low in stock', type: 'error' },
  { id: 4, message: '5 orders are ready for delivery', type: 'info' },
];

const recentOrders = [
  { id: '#1024', customer: 'Nadeesha', items: 'Black Dress × 1', amount: 'Rs. 7,250', payment: 'Pending', status: 'Payment Pending', date: 'Today, 10:42 AM' },
  { id: '#1023', customer: 'Amaya', items: 'Red Dress × 2', amount: 'Rs. 14,000', payment: 'Paid', status: 'Processing', date: 'Today, 09:15 AM' },
  { id: '#1022', customer: 'Tharushi', items: 'White Shirt × 1', amount: 'Rs. 4,500', payment: 'Paid', status: 'Ready', date: 'Yesterday' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-500">Welcome back, Demo Business</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <span>Create Order</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="card p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-brand-50 rounded-lg">
                <item.icon className="h-6 w-6 text-brand-600" aria-hidden="true" />
              </div>
              <span className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0 ${
                item.changeType === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {item.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500 truncate">{item.name}</p>
              <p className="mt-1 text-3xl font-semibold text-slate-900">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pipeline */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Order Pipeline</h3>
            <div className="flex overflow-x-auto pb-2 space-x-4">
              {pipeline.map((stage) => (
                <div key={stage.status} className="flex-1 min-w-[120px] bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold text-slate-900 mb-2">{stage.count}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${stage.color}`}>
                    {stage.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-slate-900">Recent Orders</h3>
              <Link to="/orders" className="text-sm font-medium text-brand-600 hover:text-brand-500">View all</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-600">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{order.items}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Action Required */}
          <div className="card p-6 bg-brand-50 border-brand-100">
            <h3 className="text-lg font-medium text-brand-900 mb-4 flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-brand-600" />
              Action Required
            </h3>
            <div className="space-y-3">
              {actions.map((action) => (
                <div key={action.id} className="bg-white p-3 rounded-lg border border-brand-100 shadow-sm cursor-pointer hover:shadow transition-shadow flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{action.message}</span>
                  <span className="text-brand-400 text-lg">›</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistant Mini */}
          <div className="card p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-brand-50 opacity-50"></div>
            <div className="relative">
              <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-2">✨ Ask Yeqari AI</h3>
              <p className="text-sm text-slate-600 mb-4">"What should I follow up on today?"</p>
              <div className="bg-white p-4 rounded-lg text-sm border border-indigo-100 shadow-sm">
                <p className="mb-2">You have <span className="font-bold text-slate-900">7 follow-ups</span> today.</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 mb-3">
                  <li>3 customers have pending payments</li>
                  <li>2 customers haven't replied to quotes</li>
                </ul>
                <div className="pt-3 border-t border-slate-100">
                  <p className="font-semibold text-slate-900 text-xs uppercase mb-1">Highest priority</p>
                  <p className="text-brand-700 font-medium">Nadeesha — Rs. 12,500</p>
                  <p className="text-slate-500 text-xs">Quote sent 3 days ago.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
