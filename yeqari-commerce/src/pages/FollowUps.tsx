import React from 'react';
import { Search, CalendarClock, MessageCircle, CheckCircle } from 'lucide-react';

const followUps = [
  { id: 1, customer: 'Nadeesha Silva', reason: 'Quote sent', due: 'Today', amount: 'Rs. 12,500', note: 'Waiting for confirmation on Black Dress', priority: 'High', status: 'Pending' },
  { id: 2, customer: 'Amaya Perera', reason: 'Payment pending', due: 'Today', amount: 'Rs. 14,000', note: 'Promised to bank transfer today', priority: 'High', status: 'Pending' },
  { id: 3, customer: 'Tharushi Fernando', reason: 'No response', due: 'Tomorrow', amount: 'Rs. 4,500', note: 'Left on read after sending size chart', priority: 'Medium', status: 'Pending' },
  { id: 4, customer: 'Dilini Weerasinghe', reason: 'Retention', due: 'In 3 days', amount: '-', note: 'Check if she liked the last order', priority: 'Low', status: 'Pending' },
];

export default function FollowUps() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Follow-ups</h2>
          <p className="mt-1 text-sm text-slate-500">Never miss a sale. Track who you need to contact next.</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <CalendarClock className="h-4 w-4" />
          <span>New Reminder</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-brand-600 text-white rounded-full text-sm font-medium shadow-sm">Due Today (2)</button>
            <button className="px-4 py-2 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-full text-sm font-medium transition-colors">Upcoming (2)</button>
            <button className="px-4 py-2 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-full text-sm font-medium transition-colors">Completed</button>
          </div>

          <div className="space-y-4">
            {followUps.map((item) => (
              <div key={item.id} className="card p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                {item.due === 'Today' && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                )}
                
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                      {item.customer.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.customer}</h3>
                      <p className="text-sm text-slate-500">{item.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-block mb-1 ${
                      item.due === 'Today' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      Due {item.due}
                    </span>
                    <p className="text-sm font-medium text-slate-900">{item.amount}</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                  <p className="text-sm text-slate-600 flex items-start">
                    <span className="font-medium mr-2">Note:</span> {item.note}
                  </p>
                </div>
                
                <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                  <button className="text-sm font-medium text-slate-500 hover:text-green-600 flex items-center transition-colors">
                    <CheckCircle className="h-4 w-4 mr-1.5" />
                    Mark Done
                  </button>
                  <button className="text-sm font-medium text-white bg-[#25D366] hover:bg-[#1ebd5a] px-4 py-2 rounded-lg flex items-center transition-colors shadow-sm">
                    <MessageCircle className="h-4 w-4 mr-1.5" />
                    Send WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Assistant Side */}
        <div className="space-y-6">
          <div className="card p-6 bg-gradient-to-br from-brand-50 to-white border-brand-100">
            <h3 className="text-lg font-semibold text-brand-900 mb-2">Message Generator</h3>
            <p className="text-sm text-slate-600 mb-4">Select a follow-up to generate a personalized WhatsApp message.</p>
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative mb-4">
              <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l border-b border-slate-200 transform rotate-45"></div>
              <p className="text-slate-800 whitespace-pre-line text-sm leading-relaxed">
                Hi Nadeesha 👋{'\n\n'}
                Just following up regarding your Black Dress order.{'\n\n'}
                Let us know if you'd like to proceed.{'\n\n'}
                Thank you!
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <button className="btn-secondary text-sm justify-center py-2">Copy Message</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
