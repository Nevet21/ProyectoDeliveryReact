import type { Customer } from "../models/Customer";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const API_URL = `${BASE_URL}/customers`;


// Obtener todos los clientes
export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener clientes");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};


// Obtener cliente por ID
export const getCustomerById = async (id: number): Promise<Customer | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Cliente no encontrado");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};


// Crear cliente
export const createCustomer = async (
  customer: Omit<Customer, "id">
): Promise<Customer | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    if (!response.ok) throw new Error("Error al crear cliente");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Actualizar cliente
export const updateCustomer = async (
  id: number,
  data: Partial<Omit<Customer, "id">>
): Promise<Customer | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar cliente");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Eliminar cliente
export const deleteCustomer = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar cliente");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const CustomerService = {
  getAll: getCustomers,
  getById: getCustomerById,
  create: createCustomer,
  update: updateCustomer,
  remove: deleteCustomer,
};
