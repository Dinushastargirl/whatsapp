import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { createCustomer } from '../lib/api';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCustomerModal({ isOpen, onClose, onSuccess }: AddCustomerModalProps) {
  const { businessId } = useAuth();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;
    
    if (!name.trim()) {
      setError('Customer name is required.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const result = await createCustomer(businessId, { name, phone });
    
    setIsSubmitting(false);

    if (result.success) {
      // Reset form
      setName('');
      setPhone('');
      onSuccess();
      onClose();
    } else {
      setError(result.error || 'Failed to add customer');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-slate-900 bg-opacity-75" onClick={onClose} />

        <div className="relative inline-block w-full max-w-md px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-xl shadow-xl sm:my-8 sm:p-6 sm:align-middle">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button onClick={onClose} className="text-slate-400 hover:text-slate-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-xl font-bold leading-6 text-slate-900">Add New Customer</h3>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-slate-700">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="mt-1 input-field" 
                    placeholder="E.g. Nadeesha Silva" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">WhatsApp Number</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    className="mt-1 input-field" 
                    placeholder="+94 77 123 4567" 
                  />
                </div>

                <div className="pt-4 flex justify-end space-x-3 border-t border-slate-200 mt-6">
                  <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn-primary py-2 px-6 flex items-center">
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving...</>
                    ) : 'Save Customer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
