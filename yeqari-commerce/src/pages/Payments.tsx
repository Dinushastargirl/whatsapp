import React, { useState } from 'react';
import { Search, Filter, Upload, CheckCircle, XCircle, Eye, CreditCard } from 'lucide-react';

const payments = [
  { id: 'PAY-1024', orderId: '#1024', customer: 'Nadeesha Silva', amount: 'Rs. 7,250', method: 'Bank Transfer', status: 'Submitted', date: 'Today, 10:45 AM' },
  { id: 'PAY-1023', orderId: '#1023', customer: 'Amaya Perera', amount: 'Rs. 14,000', method: 'Card', status: 'Verified', date: 'Today, 09:20 AM' },
  { id: 'PAY-1022', orderId: '#1022', customer: 'Tharushi Fernando', amount: 'Rs. 4,500', method: 'Bank Transfer', status: 'Verified', date: 'Yesterday' },
  { id: 'PAY-1025', orderId: '#1025', customer: 'Kasun Bandara', amount: 'Rs. 12,000', method: '-', status: 'Pending', date: 'Jul 30' },
  { id: 'PAY-1020', orderId: '#1020', customer: 'Dilini Weerasinghe', amount: 'Rs. 9,500', method: 'Bank Transfer', status: 'Rejected', date: 'Jul 29' },
];

const paymentStyles: Record<string, string> = {
  'Pending': 'bg-amber-100 text-amber-800',
  'Submitted': 'bg-blue-100 text-blue-800 border border-blue-200 shadow-sm',
  'Verified': 'bg-green-100 text-green-800',
  'Rejected': 'bg-red-100 text-red-800',
};

export default function Payments() {
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Payments</h2>
        <p className="mt-1 text-sm text-slate-500">Track payments, verify transfers, and upload receipts.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Payment List */}
        <div className="card overflow-hidden flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-white flex gap-4 items-center justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search payments..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all"
              />
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {payments.map((payment) => (
                  <tr 
                    key={payment.id} 
                    onClick={() => setSelectedPayment(payment)}
                    className={`transition-colors cursor-pointer ${
                      selectedPayment?.id === payment.id ? 'bg-brand-50 border-l-4 border-brand-500' : 'hover:bg-slate-50 border-l-4 border-transparent'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-600">
                      {payment.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{payment.customer}</div>
                      <div className="text-xs text-slate-500">{payment.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${paymentStyles[payment.status]}`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification Panel */}
        {selectedPayment ? (
          <div className="w-full lg:w-96 card flex flex-col self-start animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl flex justify-between items-center">
              <h3 className="font-semibold text-slate-900">Payment Details</h3>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${paymentStyles[selectedPayment.status]}`}>
                {selectedPayment.status}
              </span>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Order ID</p>
                <p className="text-lg font-bold text-brand-600">{selectedPayment.orderId}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Customer</p>
                  <p className="font-medium text-slate-900">{selectedPayment.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Amount</p>
                  <p className="font-medium text-slate-900">{selectedPayment.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Method</p>
                  <p className="font-medium text-slate-900">{selectedPayment.method}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Date</p>
                  <p className="font-medium text-slate-900">{selectedPayment.date}</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <p className="text-sm font-medium text-slate-900 mb-3">Payment Proof</p>
                {selectedPayment.status === 'Submitted' ? (
                  <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg h-48 flex items-center justify-center relative overflow-hidden group">
                    <img 
                      src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Bank Receipt Demo" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white font-medium flex items-center bg-black/50 px-3 py-1.5 rounded-full">
                        <Eye className="w-4 h-4 mr-1.5" /> View Full
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500 mb-4">No receipt uploaded yet</p>
                    <button className="btn-secondary text-xs">Upload Screenshot</button>
                  </div>
                )}
              </div>

              {selectedPayment.status === 'Submitted' && (
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium text-sm flex justify-center items-center transition-colors">
                    <CheckCircle className="w-4 h-4 mr-1.5" /> Verify
                  </button>
                  <button className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 py-2.5 rounded-lg font-medium text-sm flex justify-center items-center transition-colors">
                    <XCircle className="w-4 h-4 mr-1.5" /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-96 card hidden lg:flex flex-col items-center justify-center text-center p-12 bg-slate-50/50">
            <CreditCard className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">Select a payment to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
