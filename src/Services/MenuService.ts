import type { Menu } from "../models/Menu";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const API_URL = `${BASE_URL}/menus`;

// Obtener todos los menus
export const getMenus = async (): Promise<Menu[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener menus");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Obtener menu por ID
export const getMenuById = async (id: number): Promise<Menu | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Menu no encontrado");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Crear menu
export const createMenu = async (
  menu: Omit<Menu, "id">
): Promise<Menu | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu),
    });
    if (!response.ok) throw new Error("Error al crear menu");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Actualizar menu
export const updateMenu = async (
  id: number,
  data: Partial<Menu>
): Promise<Menu | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar menu");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Eliminar menu
export const deleteMenu = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar menu");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
// MenuService.ts
export const MenuService = {
  getAll: getMenus,
  getById: getMenuById,
  create: createMenu,
  update: updateMenu,
  remove: deleteMenu,
};
