import React, { useState } from 'react';
import { Search, Filter, Eye, ChevronDown } from 'lucide-react';

const orders = [
  { id: '#1024', customer: 'Nadeesha Silva', items: 'Black Dress × 1', amount: 'Rs. 7,250', payment: 'Pending', status: 'Payment Pending', date: 'Today, 10:42 AM' },
  { id: '#1023', customer: 'Amaya Perera', items: 'Red Dress × 2', amount: 'Rs. 14,000', payment: 'Verified', status: 'Processing', date: 'Today, 09:15 AM' },
  { id: '#1022', customer: 'Tharushi Fernando', items: 'White Shirt × 1', amount: 'Rs. 4,500', payment: 'Verified', status: 'Ready', date: 'Yesterday' },
  { id: '#1021', customer: 'Kasun Bandara', items: 'Gold Necklace × 1', amount: 'Rs. 12,000', payment: 'Verified', status: 'Delivered', date: 'Jul 30' },
  { id: '#1020', customer: 'Dilini Weerasinghe', items: 'Leather Handbag × 1', amount: 'Rs. 9,500', payment: 'Rejected', status: 'Cancelled', date: 'Jul 29' },
];

const statusStyles: Record<string, string> = {
  'New': 'bg-blue-100 text-blue-800',
  'Payment Pending': 'bg-amber-100 text-amber-800',
  'Processing': 'bg-purple-100 text-purple-800',
  'Ready': 'bg-indigo-100 text-indigo-800',
  'Delivered': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800',
};

const paymentStyles: Record<string, string> = {
  'Pending': 'text-amber-600 bg-amber-50 border-amber-200',
  'Submitted': 'text-blue-600 bg-blue-50 border-blue-200',
  'Verified': 'text-green-600 bg-green-50 border-green-200',
  'Rejected': 'text-red-600 bg-red-50 border-red-200',
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = ['All', 'New', 'Payment Pending', 'Processing', 'Ready', 'Delivered'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Orders</h2>
          <p className="mt-1 text-sm text-slate-500">Track and fulfill your customer orders.</p>
        </div>
      </div>

      <div className="card overflow-hidden flex flex-col">
        <div className="border-b border-slate-200">
          <nav className="flex -mb-px px-4 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-2 w-full sm:w-auto justify-center">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order Details</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Payment</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-brand-600">{order.id}</span>
                      <span className="text-xs text-slate-500">{order.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">{order.customer}</span>
                      <span className="text-xs text-slate-500 truncate max-w-[150px]">{order.items}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${paymentStyles[order.payment]}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-brand-600 hover:text-brand-800 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
