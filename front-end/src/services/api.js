// src/services/api.js
import axios from 'axios';

//usando kubernetes y localmente
//const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000/api/users';
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api/users";


//cambios en el archivo api.js esto solo funciona localmente
//const API_URL = 'http://backend:4000/api/users';

// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

// Actualizar un usuario
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};
