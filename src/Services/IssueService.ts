import type { Issue } from "../models/Issue";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const API_URL = `${BASE_URL}/issues`;

// Obtener todos los issues
export const getIssues = async (): Promise<Issue[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener issues");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Obtener issue por ID
export const getIssueById = async (id: number): Promise<Issue | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Issue no encontrado");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Crear issue
export const createIssue = async (
  issue: Omit<Issue, "id" | "date_reported" | "status"> & { 
    date_reported?: string; 
    status?: string; 
  }
): Promise<Issue | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(issue),
    });
    if (!response.ok) throw new Error("Error al crear issue");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Actualizar issue
export const updateIssue = async (
  id: number,
  data: Partial<Omit<Issue, "id"> & { date_reported?: string }>
): Promise<Issue | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar issue");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Eliminar issue
export const deleteIssue = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar issue");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
// IssueService.ts
export const IssueService = {
  getAll: getIssues,
  getById: getIssueById,
  create: createIssue,
  update: updateIssue,
  remove: deleteIssue,
};
