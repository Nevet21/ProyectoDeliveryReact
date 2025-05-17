import type { Driver } from "../models/Driver";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const API_URL = `${BASE_URL}/drivers`;

// Obtener todos los conductores
export const getDrivers = async (): Promise<Driver[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener conductores");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Obtener conductor por ID
export const getDriverById = async (id: number): Promise<Driver | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Conductor no encontrado");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Crear conductor
export const createDriver = async (
  driver: Omit<Driver, "id">
): Promise<Driver | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driver),
    });
    if (!response.ok) throw new Error("Error al crear conductor");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Actualizar conductor
export const updateDriver = async (
  id: number,
  data: Partial<Omit<Driver, "id">>
): Promise<Driver | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar conductor");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Eliminar conductor
export const deleteDriver = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar conductor");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
// DriverService.ts
export const DriverService = {
  getAll: getDrivers,
  getById: getDriverById,
  create: createDriver,
  update: updateDriver,
  remove: deleteDriver,
};