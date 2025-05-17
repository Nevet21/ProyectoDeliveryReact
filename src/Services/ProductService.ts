import type { Product } from "../models/Product";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const API_URL = `${BASE_URL}/products`;


// Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

// Obtener producto por ID
export const getProductById = async (id: number): Promise<Product> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
};

// Crear producto
export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

// Actualizar producto
export const updateProduct = async (id: number, data: Partial<Product>): Promise<Product> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
};

// Eliminar producto
export const deleteProduct = async (id: number): Promise<boolean> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return true;
};
// ProductService.ts
export const ProductService = {
  getAll: getProducts,
  getById: getProductById,
  create: createProduct,
  update: updateProduct,
  remove: deleteProduct,
};
