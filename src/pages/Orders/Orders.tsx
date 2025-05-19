import React, { useEffect, useState } from 'react';
import MainLayout from '../../layaouts/MainLayaout';

interface Order {
  id: number;
  customer_id: number;
  menu_id: number;
  motorcycle_id: number;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
  address: {
    description: string;
  };
  menu: {
    name: string;
    price: number;
    image: string;
  };
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/orders');
      if (!response.ok) {
        throw new Error('Error al cargar los pedidos');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Mis Pedidos</h1>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">{order.menu?.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Cantidad: {order.quantity}</p>
                  <p className="text-sm text-gray-600">Total: ${order.total_price.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Dirección: {order.address?.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Fecha: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Orders; 