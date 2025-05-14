import React, { useState } from 'react';


interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
}

const initialProducts: Product[] = [
    {
        id: 1,
        name: 'Pizza Margarita',
        description: 'Deliciosa pizza con mozzarella y albahaca fresca.',
        price: 28000,
        quantity: 1,
        image: '/images/pizza.jpg',
    },
    {
        id: 2,
        name: 'Hamburguesa BBQ',
        description: 'Hamburguesa con salsa BBQ y papas fritas.',
        price: 24000,
        quantity: 1,
        image: '/images/burger.jpg',
    },
];

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<Product[]>(initialProducts);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
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
                <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Confirmar Pedido
                </button>
            </div>
        </div>
    );
};

export default Cart;
