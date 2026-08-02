import React from 'react';
import { Store, User, Bell, Shield, Wallet } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">Manage your business profile and preferences.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Settings Nav */}
        <div className="w-full md:w-64 bg-slate-50 p-4 border-b md:border-b-0 md:border-r border-slate-200">
          <nav className="space-y-1">
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white text-brand-600 shadow-sm">
              <Store className="h-4 w-4 mr-2" /> Business Profile
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
              <User className="h-4 w-4 mr-2" /> Account
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
              <Wallet className="h-4 w-4 mr-2" /> Billing
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </a>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="p-6 flex-1">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Business Information</h3>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Business Name</label>
                <input type="text" defaultValue="Demo Business" className="mt-1 input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Category</label>
                <select className="mt-1 input-field">
                  <option>Fashion</option>
                  <option>Home</option>
                  <option>Bakery</option>
                  <option>Jewellery</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">WhatsApp Number</label>
              <input type="text" defaultValue="+94 77 123 4567" className="mt-1 input-field" />
              <p className="mt-1 text-xs text-slate-500">Your customers will contact you on this number.</p>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-medium text-slate-900 mb-4">Currency & Locale</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Default Currency</label>
                  <select className="mt-1 input-field">
                    <option>LKR (Rs.)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button type="button" className="btn-secondary mr-3">Cancel</button>
              <button type="submit" className="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
