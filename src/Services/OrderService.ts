import type { Order } from "../models/Order";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const API_URL = `${BASE_URL}/orders`;


// Obtener todas las órdenes
export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener órdenes");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Obtener una orden por ID
export const getOrderById = async (id: number): Promise<Order | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Orden no encontrada");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Crear una orden
export const createOrder = async (order: Omit<Order, "id" | "total_price">): Promise<Order | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error("Error al crear orden");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Actualizar una orden
export const updateOrder = async (
  id: number,
  data: Partial<Omit<Order, "id" | "total_price">>
): Promise<Order | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar orden");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Eliminar una orden
export const deleteOrder = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar orden");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
  
};
// Al final del archivo OrderService.ts
export const OrderService = {
  getAll: getOrders,
  getById: getOrderById,
  create: createOrder,
  update: updateOrder,
  remove: deleteOrder,
};

