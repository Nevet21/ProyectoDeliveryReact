import type { Photo } from "../models/Photo";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const API_URL = `${BASE_URL}/photos`;

// Obtener todas las fotos
export const getPhotos = async (): Promise<Photo[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener fotos");
  return res.json();
};

// Obtener foto por ID (devuelve un Blob para mostrar la imagen)
export const getPhotoById = async (id: number): Promise<Blob> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Foto no encontrada");
  return res.blob();
};

// Crear foto (solo metadata, sin archivo)
export const createPhoto = async (photo: Omit<Photo, "id">): Promise<Photo> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(photo),
  });
  if (!res.ok) throw new Error("Error al crear foto");
  return res.json();
};

// Crear foto con archivo (usando FormData)
export const createPhotoWithFile = async (
  data: { issue_id?: number; caption?: string; taken_at?: string },
  file: File
): Promise<Photo> => {
  const formData = new FormData();
  formData.append("file", file);

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Error al subir la foto");
  return res.json();
};


// Actualizar foto
export const updatePhoto = async (id: number, data: Partial<Photo>): Promise<Photo> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar foto");
  return res.json();
};

// Eliminar foto
export const deletePhoto = async (id: number): Promise<boolean> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar foto");
  return true;
};
export const PhotoService = {
  getAll: getPhotos,
  getById: getPhotoById,
  create: updatePhoto,
  update: updatePhoto,
  remove: deletePhoto,
};
