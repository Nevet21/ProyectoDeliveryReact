import type { Motorcycle } from "../models/Motorcycle";
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const API_URL = `${BASE_URL}/motorcycles`;

// Obtener todas las motocicletas
export const getMotorcycles = async (): Promise<Motorcycle[]> => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener motocicletas");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Obtener motocicleta por ID
export const getMotorcycleById = async (id: number): Promise<Motorcycle | null> => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Motocicleta no encontrada");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Crear motocicleta
export const createMotorcycle = async (motorcycle: Omit<Motorcycle, "id">): Promise<Motorcycle | null> => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(motorcycle),
    });
    if (!res.ok) throw new Error("Error al crear motocicleta");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Actualizar motocicleta
export const updateMotorcycle = async (
  id: number,
  data: Partial<Motorcycle>
): Promise<Motorcycle | null> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar motocicleta");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Eliminar motocicleta
export const deleteMotorcycle = async (id: number): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar motocicleta");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
// MotorcycleService.ts
export const MotorcycleService = {
  getAll: getMotorcycles,
  getById: getMotorcycleById,
  create: createMotorcycle,
  update: updateMotorcycle,
  remove: deleteMotorcycle,
};
