import { supabase } from './supabase';

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
