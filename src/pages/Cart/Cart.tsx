import React, { useEffect, useState } from 'react';
import MainLayout from '../../layaouts/MainLayaout';
import { createOrder } from '../../Services/OrderService';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/products')
      .then(res => res.json())
      .then(data => {
        const productsWithQuantity = data.map((item: any) => ({
          ...item,
          quantity: 1
        }));
        setCartItems(productsWithQuantity);
      })
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleConfirmOrder = async () => {
    try {
      // Aquí debes construir el objeto con las propiedades que espera tu backend
      // Según tu ejemplo, podría ser algo así para cada producto:
      // customer_id, menu_id (producto), motorcycle_id, quantity, total_price, status
      // Aquí pongo valores de ejemplo, ajusta según tu lógica real

      const customer_id = 1; // o del contexto de usuario
      const motorcycle_id = 1; // o el que corresponda
      const status = "pending";

      for (const item of cartItems) {
        const orderData = {
          customer_id,
          menu_id: item.id,
          motorcycle_id,
          quantity: item.quantity,
          total_price: item.price * item.quantity,
          status
        };

        const result = await createOrder(orderData);
        if (!result) {
          alert('Error al enviar el pedido para el producto ' + item.name);
          return; // detener si falla uno
        }
      }

      alert('Pedido realizado con éxito');
      console.log('Ordenes enviadas');
      // Aquí podrías limpiar el carrito o hacer alguna acción adicional

    } catch (error) {
      console.error('Error al enviar la orden:', error);
      alert('Error al enviar el pedido');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>
        <div className="space-y-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center border rounded-xl p-4 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-xl object-cover mb-4 sm:mb-0 sm:mr-4"
              />
              <div className="flex-1 w-full">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="mt-1 font-bold">${item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center mt-4 sm:mt-0 gap-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
                <input
                  type="number"
                  readOnly
                  value={item.quantity}
                  className="w-12 text-center border rounded"
                />
                <button
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 border-t">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <button
            className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleConfirmOrder}
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
