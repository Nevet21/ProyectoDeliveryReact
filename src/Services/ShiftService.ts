import type { Shift } from "../models/Shift";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const API_URL = `${BASE_URL}/shifts`;

// Obtener todos los turnos
export const getShifts = async (): Promise<Shift[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener turnos");
  return res.json();
};

// Obtener turno por ID
export const getShiftById = async (id: number): Promise<Shift> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Turno no encontrado");
  return res.json();
};

// Crear turno
export const createShift = async (shift: Omit<Shift, "id">): Promise<Shift> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shift),
  });
  if (!res.ok) throw new Error("Error al crear turno");
  return res.json();
};

// Actualizar turno
export const updateShift = async (id: number, data: Partial<Shift>): Promise<Shift> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar turno");
  return res.json();
};

// Eliminar turno
export const deleteShift = async (id: number): Promise<boolean> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar turno");
  return true;
};
// ShiftService.ts
export const ShiftService = {
  getAll: getShifts,
  getById: getShiftById,
  create: createShift,
  update: updateShift,
  remove: deleteShift,
};