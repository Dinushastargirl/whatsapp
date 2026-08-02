import { supabase } from './supabase';

export const getBusiness = async (businessId: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .single();
  
  if (error) {
    console.error('Error fetching business:', error);
    return null;
  }
  return data;
};

export const updateBusiness = async (businessId: string, updates: any) => {
  const { data, error } = await supabase
    .from('businesses')
    .update(updates)
    .eq('id', businessId)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating business:', error);
    return { success: false, error: error.message };
  }
  return { success: true, data };
};

export const getProducts = async (businessId: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('business_id', businessId)
    .order('name');
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data || [];
};

export const getCustomers = async (businessId: string) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('business_id', businessId)
    .order('name');
  
  if (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
  return data || [];
};

export const createCustomer = async (businessId: string, customerData: { name: string, phone?: string }) => {
  const { data, error } = await supabase
    .from('customers')
    .insert({
      business_id: businessId,
      name: customerData.name,
      phone: customerData.phone,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating customer:', error);
    return { success: false, error: error.message };
  }
  return { success: true, data };
};

export const deleteCustomer = async (customerId: string) => {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', customerId);

  if (error) {
    console.error('Error deleting customer:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
};

export const createOrder = async (businessId: string, orderData: any, items: any[]) => {
  try {
    // 1. Create or Find Customer
    let customerId = orderData.customerId;
    if (!customerId) {
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert({
          business_id: businessId,
          name: orderData.customerName,
          phone: orderData.customerPhone || null,
        })
        .select()
        .single();
        
      if (customerError) throw customerError;
      customerId = customer.id;
    }

    // 2. Create Order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        business_id: businessId,
        customer_id: customerId,
        subtotal: orderData.subtotal,
        delivery_fee: orderData.deliveryFee || 0,
        total: orderData.subtotal + (orderData.deliveryFee || 0),
        status: 'New',
        payment_status: 'Pending'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 3. Create Order Items & Update Stock
    for (const item of items) {
      await supabase.from('order_items').insert({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price
      });

      // Decrease stock
      if (item.productId) {
         // Using RPC or simple update for MVP
         const { data: product } = await supabase.from('products').select('stock').eq('id', item.productId).single();
         if (product) {
           await supabase.from('products').update({ stock: product.stock - item.quantity }).eq('id', item.productId);
         }
      }
    }

    // 4. Create Follow-up for Payment
    await supabase.from('follow_ups').insert({
      business_id: businessId,
      customer_id: customerId,
      reason: 'Payment pending',
      amount: order.total,
      note: 'Awaiting payment for new order.',
      due_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    });

    return { success: true, order };
  } catch (error: any) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
};
