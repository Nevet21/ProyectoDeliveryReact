import type { Shift } from "../models/Shift";
import type { Motorcycle } from "../models/Motorcycle";
import { MotorcycleService } from "./MotorcycleService";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const API_URL = `${BASE_URL}/shifts`;
const TRACKING_URL = `${BASE_URL}/motorcycles/track`;


export interface ShiftWithMotorcycle extends Shift {
  motorcycle?: Motorcycle;
}

export const getActiveShifts = async (): Promise<ShiftWithMotorcycle[]> => {
  try {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error al obtener turnos: ${res.status} ${errorText}`);
    }

    const shifts: Shift[] = await res.json();

    const enrichedShifts: ShiftWithMotorcycle[] = await Promise.all(
      shifts.map(async (shift) => {
        let motorcycle: Motorcycle | undefined = undefined;

        if (shift.motorcycle_id) {
          try {
            motorcycle = await MotorcycleService.getById(shift.motorcycle_id);

            // Si la moto tiene placa, iniciar el tracking
            if (motorcycle?.license_plate) {
              await fetch(`${TRACKING_URL}/${motorcycle.license_plate}`, {
                method: "POST",
              });
            }
          } catch (e) {
            console.warn(`Error al obtener o iniciar tracking para motocicleta ${shift.motorcycle_id}`, e);
          }
        }

        return {
          ...shift,
          motorcycle,
        };
      })
    );

    return enrichedShifts;
  } catch (err) {
    console.error("Error en getActiveShifts:", err);
    throw err;
  }
};



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
  getActive: getActiveShifts,
};
