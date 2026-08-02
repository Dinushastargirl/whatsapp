import React, { useState, useEffect } from 'react';
import { X, Search, Plus, Minus, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { getProducts, getCustomers, createOrder } from '../lib/api';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateOrderModal({ isOpen, onClose, onSuccess }: CreateOrderModalProps) {
  const { businessId } = useAuth();
  
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  
  const [customerMode, setCustomerMode] = useState<'new' | 'existing'>('new');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  
  const [orderItems, setOrderItems] = useState<{product: any, quantity: number}[]>([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && businessId) {
      loadData();
    }
  }, [isOpen, businessId]);

  const loadData = async () => {
    if (!businessId) return;
    const prods = await getProducts(businessId);
    const custs = await getCustomers(businessId);
    setProducts(prods);
    setCustomers(custs);
    if (custs.length > 0) {
      setCustomerMode('existing');
      setSelectedCustomerId(custs[0].id);
    }
  };

  const addItem = (product: any) => {
    const existing = orderItems.find(item => item.product.id === product.id);
    if (existing) {
      setOrderItems(orderItems.map(item => 
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setOrderItems([...orderItems, { product, quantity: 1 }]);
    }
  };

  const removeItem = (productId: string) => {
    setOrderItems(orderItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setOrderItems(orderItems.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = orderItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;
    if (orderItems.length === 0) {
      setError('Please add at least one item to the order.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    let customerData = {
      customerId: customerMode === 'existing' ? selectedCustomerId : null,
      customerName: customerMode === 'new' ? newCustomerName : customers.find(c => c.id === selectedCustomerId)?.name,
      customerPhone: customerMode === 'new' ? newCustomerPhone : null,
      subtotal,
      deliveryFee,
    };

    const itemsData = orderItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const result = await createOrder(businessId, customerData, itemsData);
    
    setIsSubmitting(false);

    if (result.success) {
      // Reset form
      setOrderItems([]);
      setNewCustomerName('');
      setNewCustomerPhone('');
      setDeliveryFee(0);
      onSuccess();
      onClose();
    } else {
      setError(result.error || 'Failed to create order');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-slate-900 bg-opacity-75" onClick={onClose} />

        <div className="relative inline-block w-full max-w-2xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-xl shadow-xl sm:my-8 sm:p-6 sm:align-middle">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button onClick={onClose} className="text-slate-400 hover:text-slate-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-xl font-bold leading-6 text-slate-900">Create New Order</h3>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-8">
                
                {/* 1. Customer Selection */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">1. Customer</h4>
                  
                  <div className="flex space-x-4 mb-4">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        className="text-brand-600 focus:ring-brand-500" 
                        checked={customerMode === 'existing'}
                        onChange={() => setCustomerMode('existing')}
                      />
                      <span className="ml-2 text-sm text-slate-700">Existing Customer</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        className="text-brand-600 focus:ring-brand-500" 
                        checked={customerMode === 'new'}
                        onChange={() => setCustomerMode('new')}
                      />
                      <span className="ml-2 text-sm text-slate-700">New Customer</span>
                    </label>
                  </div>

                  {customerMode === 'existing' ? (
                    <select 
                      className="input-field"
                      value={selectedCustomerId}
                      onChange={(e) => setSelectedCustomerId(e.target.value)}
                      required
                    >
                      {customers.map(c => (
                        <option key={c.id} value={c.id}>{c.name} {c.phone ? `(${c.phone})` : ''}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Full Name</label>
                        <input type="text" required value={newCustomerName} onChange={e => setNewCustomerName(e.target.value)} className="input-field" placeholder="E.g. Nadeesha" />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">WhatsApp Number (Optional)</label>
                        <input type="text" value={newCustomerPhone} onChange={e => setNewCustomerPhone(e.target.value)} className="input-field" placeholder="+94..." />
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Products */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">2. Order Items</h4>
                  
                  <div className="mb-4">
                    <select 
                      className="input-field"
                      onChange={(e) => {
                        if (e.target.value) {
                          const p = products.find(prod => prod.id === e.target.value);
                          if (p) addItem(p);
                          e.target.value = ''; // reset
                        }
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>+ Add product to order...</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} — Rs. {p.price}</option>
                      ))}
                    </select>
                  </div>

                  {orderItems.length > 0 ? (
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Product</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-slate-500 uppercase w-32">Qty</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase w-24">Price</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase w-32">Total</th>
                            <th className="px-4 py-2 w-10"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {orderItems.map(item => (
                            <tr key={item.product.id}>
                              <td className="px-4 py-3 text-sm text-slate-900 font-medium">{item.product.name}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-center space-x-2">
                                  <button type="button" onClick={() => updateQuantity(item.product.id, -1)} className="p-1 rounded hover:bg-slate-100 text-slate-500"><Minus className="h-3 w-3" /></button>
                                  <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                  <button type="button" onClick={() => updateQuantity(item.product.id, 1)} className="p-1 rounded hover:bg-slate-100 text-slate-500"><Plus className="h-3 w-3" /></button>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-slate-500 text-right">Rs. {item.product.price}</td>
                              <td className="px-4 py-3 text-sm text-slate-900 font-medium text-right">Rs. {item.product.price * item.quantity}</td>
                              <td className="px-4 py-3 text-right">
                                <button type="button" onClick={() => removeItem(item.product.id)} className="text-red-500 hover:text-red-700 p-1">
                                  <X className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-slate-50 border border-slate-200 border-dashed rounded-lg text-sm text-slate-500">
                      No items added yet.
                    </div>
                  )}
                </div>

                {/* 3. Pricing */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">3. Summary</h4>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-slate-600">
                      <span>Delivery Fee</span>
                      <div className="w-24">
                        <input type="number" min="0" value={deliveryFee} onChange={e => setDeliveryFee(parseInt(e.target.value) || 0)} className="input-field py-1 text-right" />
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-lg text-slate-900">
                      <span>Total</span>
                      <span>Rs. {total}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3 border-t border-slate-200">
                  <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn-primary py-2 px-6 flex items-center">
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving...</>
                    ) : 'Save Order'}
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
