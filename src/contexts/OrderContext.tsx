import React, { createContext, useContext, useState, ReactNode } from 'react';
import { orderAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderDate: string;
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderDate'>) => string;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['paymentStatus']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const createOrder = async (orderData: Omit<Order, 'id' | 'orderDate'>) => {
    try {
      const response = await orderAPI.create({
        items: orderData.items,
        total: orderData.total,
        customerInfo: orderData.customerInfo,
        paymentMethod: orderData.paymentMethod
      });

      if (response.success) {
        const newOrder: Order = {
          id: response.data._id,
          items: response.data.items,
          total: response.data.total,
          paymentMethod: response.data.paymentMethod,
          paymentStatus: response.data.paymentStatus,
          orderDate: response.data.createdAt,
          customerInfo: response.data.customerInfo
        };

        setOrders(prev => [newOrder, ...prev]);
        
        toast({
          title: "Order placed successfully!",
          description: `Order #${response.data._id.slice(-8)} has been confirmed.`,
        });

        return response.data._id;
      } else {
        throw new Error(response.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Order failed",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getOrder = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStatus = (id: string, status: Order['paymentStatus']) => {
    setOrders(prev => prev.map(order =>
      order.id === id ? { ...order, paymentStatus: status } : order
    ));
  };

  // Load orders from API when component mounts
  React.useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await orderAPI.getAll();
        if (response.success) {
          const apiOrders: Order[] = response.data.map((order: any) => ({
            id: order._id,
            items: order.items,
            total: order.total,
            paymentMethod: order.paymentMethod,
            paymentStatus: order.paymentStatus,
            orderDate: order.createdAt,
            customerInfo: order.customerInfo
          }));
          setOrders(apiOrders);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    };

    loadOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};