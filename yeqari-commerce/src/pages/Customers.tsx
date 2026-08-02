import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Loader2, Trash2 } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { getCustomers, deleteCustomer } from '../lib/api';
import AddCustomerModal from '../components/AddCustomerModal';

export default function Customers() {
  const { businessId } = useAuth();
  
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (businessId) {
      loadCustomers();
    }
  }, [businessId]);

  const loadCustomers = async () => {
    setIsLoading(true);
    const data = await getCustomers(businessId!);
    setCustomers(data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await deleteCustomer(id);
      loadCustomers();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Customers</h2>
          <p className="mt-1 text-sm text-slate-500">Manage your customer relationships and history.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Customer</span>
        </button>
      </div>

      <AddCustomerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadCustomers}
      />

      <div className="card overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-2 w-full sm:w-auto justify-center">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
            </div>
          ) : customers.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-48 text-slate-500">
              <p>No customers found.</p>
              <button onClick={() => setIsModalOpen(true)} className="mt-2 text-brand-600 font-medium hover:underline">Add your first customer</button>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Spent</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold uppercase">
                            {customer.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{customer.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{customer.phone || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">Rs. {customer.total_spent || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        customer.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        customer.status === 'Lead' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDelete(customer.id)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
