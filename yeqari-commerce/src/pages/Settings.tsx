import React, { useState, useEffect } from 'react';
import { Store, User, Bell, Shield, Wallet, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { getBusiness, updateBusiness } from '../lib/api';

export default function Settings() {
  const { businessId } = useAuth();
  
  const [business, setBusiness] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (businessId) {
      loadBusiness();
    }
  }, [businessId]);

  const loadBusiness = async () => {
    setIsLoading(true);
    const data = await getBusiness(businessId!);
    setBusiness(data);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId || !business) return;

    setIsSaving(true);
    setMessage({ type: '', text: '' });

    const updates = {
      name: business.name,
      category: business.category,
      whatsapp_number: business.whatsapp_number,
      currency: business.currency
    };

    const result = await updateBusiness(businessId, updates);
    
    setIsSaving(false);
    if (result.success) {
      setMessage({ type: 'success', text: 'Business profile updated successfully.' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update business profile.' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
      </div>
    );
  }

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
          
          {message.text && (
            <div className={`mb-4 p-3 rounded-md text-sm ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Business Name</label>
                <input 
                  type="text" 
                  required
                  value={business?.name || ''} 
                  onChange={(e) => setBusiness({...business, name: e.target.value})}
                  className="mt-1 input-field" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Category</label>
                <select 
                  value={business?.category || ''}
                  onChange={(e) => setBusiness({...business, category: e.target.value})}
                  className="mt-1 input-field"
                >
                  <option value="">Select Category...</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Jewellery">Jewellery</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">WhatsApp Number</label>
              <input 
                type="text" 
                value={business?.whatsapp_number || ''}
                onChange={(e) => setBusiness({...business, whatsapp_number: e.target.value})}
                placeholder="+94 77 123 4567" 
                className="mt-1 input-field" 
              />
              <p className="mt-1 text-xs text-slate-500">Your customers will contact you on this number.</p>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-medium text-slate-900 mb-4">Currency & Locale</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Default Currency</label>
                  <select 
                    value={business?.currency || 'LKR (Rs.)'}
                    onChange={(e) => setBusiness({...business, currency: e.target.value})}
                    className="mt-1 input-field"
                  >
                    <option value="LKR (Rs.)">LKR (Rs.)</option>
                    <option value="USD ($)">USD ($)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200 mt-6">
              <button type="button" onClick={() => loadBusiness()} className="btn-secondary mr-3">Cancel</button>
              <button type="submit" disabled={isSaving} className="btn-primary flex items-center">
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
