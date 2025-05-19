import React, { useEffect, useState } from 'react';
import MainLayout from '../../layaouts/MainLayaout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/menus')
      .then(res => res.json())
      .then(data => {
        console.log("Menús cargados:", data);
        const productsWithQuantity = data.map((item: any) => ({
          ...item,
          quantity: 1,
          price: Number(item.price),
        }));
        setCartItems(productsWithQuantity);
      })
      .catch(err => {
        console.error('Error al cargar menús:', err);
        toast.error('Error al cargar menús');
      });
  }, []);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const sendOrders = async () => {
    if (cartItems.length === 0) {
      toast.warn("🛒 El carrito está vacío", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    try {
      const customer_id = 1;
      const motorcycle_id = 1;

      for (const item of cartItems) {
        const orderData = {
          customer_id: customer_id,
          menu_id: item.id,
          motorcycle_id: motorcycle_id,
          quantity: item.quantity,
          status: "pending"
        };

        console.log("Enviando pedido:", orderData);

        const response = await fetch("http://127.0.0.1:5000/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error en la respuesta:", response.status, errorText);
          throw new Error(`Error al crear el pedido: ${errorText}`);
        }

        const result = await response.json();
        console.log("Pedido creado:", result);
      }

      toast.success("✅ ¡Pedido realizado con éxito!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });

      setCartItems([]);
      setAddress('');
      setShowModal(false);
      
      navigate('/orders');
    } catch (error: any) {
      console.error("Error al procesar el pedido:", error);
      toast.error(`❌ ${error.message || "Error al procesar el pedido"}`, {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
      });
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <MainLayout>
      <ToastContainer />
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
          <label className="block mb-2 font-semibold">Dirección de entrega:</label>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Ej: Calle 123 #45-67"
          />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <button
            className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setShowModal(true)}
          >
            Confirmar Pedido
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">¿Confirmar pedido?</h2>
            <p className="mb-4">Total a pagar: <strong>${total.toLocaleString()}</strong></p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={sendOrders}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Cart;
