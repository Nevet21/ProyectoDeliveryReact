 // src/services/restaurantService.ts
 import type { Restaurante } from "../models/Restaurante"; 


 const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
 const API_URL = `${BASE_URL}/restaurants`;
 
 
 
 // Obtener todos los restaurantes
 export const getRestaurants = async (): Promise<Restaurante[]> => {
   try {
     const response = await fetch(API_URL);
     if (!response.ok) throw new Error("Error al obtener restaurantes");
     return await response.json();
   } catch (error) {
     console.error(error);
     return [];
   }
 };
 
 // Obtener restaurante por ID
 export const getRestaurantById = async (id: number): Promise<Restaurante | null> => {
   try {
     const response = await fetch(`${API_URL}/${id}`);
     if (!response.ok) throw new Error("Restaurante no encontrado");
     return await response.json();
   } catch (error) {
     console.error(error);
     return null;
   }
 };
 
 // Crear restaurante
 export const createRestaurant = async (restaurant: Omit<Restaurante, "id">): Promise<Restaurante | null> => {
   try {
     const response = await fetch(API_URL, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ ...restaurant, created_at: new Date().toISOString() }),
     });
     if (!response.ok) throw new Error("Error al crear restaurante");
     return await response.json();
   } catch (error) {
     console.error(error);
     return null;
   }
 };
 
 // Actualizar restaurante
 export const updateRestaurant = async (id: number, data: Partial<Restaurante>): Promise<Restaurante | null> => {
   try {
     const response = await fetch(`${API_URL}/${id}`, {
       method: "PUT",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(data),
     });
     if (!response.ok) throw new Error("Error al actualizar restaurante");
     return await response.json();
   } catch (error) {
     console.error(error);
     return null;
   }
 };
 
 // Eliminar restaurante
 export const deleteRestaurant = async (id: number): Promise<boolean> => {
   try {
     const response = await fetch(`${API_URL}/${id}`, {
       method: "DELETE",
     });
     if (!response.ok) throw new Error("Error al eliminar restaurante");
     return true;
   } catch (error) {
     console.error(error);
     return false;
   }
 };
 export const RestaurantService = {
   getAll: getRestaurants,
   getById: getRestaurantById,
   create: createRestaurant,
   update: updateRestaurant,
   remove: deleteRestaurant,
 };