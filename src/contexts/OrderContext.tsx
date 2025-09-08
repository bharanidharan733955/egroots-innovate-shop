import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'cancelled';
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
  deleteOrder: (id: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('egroots-orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const createOrder = (orderData: Omit<Order, 'id' | 'orderDate'>) => {
    const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderDate: new Date().toISOString(),
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('egroots-orders', JSON.stringify(updatedOrders));
    
    return orderId;
  };

  const getOrder = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStatus = (id: string, status: Order['paymentStatus']) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, paymentStatus: status } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('egroots-orders', JSON.stringify(updatedOrders));
  };

  const deleteOrder = (id: string) => {
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem('egroots-orders', JSON.stringify(updatedOrders));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrder,
        updateOrderStatus,
        deleteOrder,
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