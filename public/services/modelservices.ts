import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Cambia la URL según tu backend

// Obtener por ID
export const getById = async (id: string) => {
    const response = await axios.get(`${API_URL}/resource/${id}`);
    return response.data;
};

// Crear (POST)
export const create = async (data: any) => {
    const response = await axios.post(`${API_URL}/resource`, data);
    return response.data;
};

// Actualizar (PUT)
export const update = async (id: string, data: any) => {
    const response = await axios.put(`${API_URL}/resource/${id}`, data);
    return response.data;
};

// Eliminar (DELETE)
export const remove = async (id: string) => {
    const response = await axios.delete(`${API_URL}/resource/${id}`);
    return response.data;
};