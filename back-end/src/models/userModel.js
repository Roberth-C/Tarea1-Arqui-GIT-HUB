// src/models/userModel.js
import pool from '../config/db.js';  // Importar pool desde db.js

// Obtener todos los usuarios
export const getUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

// Crear un nuevo usuario
export const createUser = async (user) => {
  const { name, surname, age, email, phone } = user;
  const result = await pool.query(
    'INSERT INTO users (name, surname, age, email, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, surname, age, email, phone]
  );
  return result.rows[0];
};

// Actualizar un usuario
export const updateUser = async (id, user) => {
  const { name, surname, age, email, phone } = user;
  const result = await pool.query(
    'UPDATE users SET name = $1, surname = $2, age = $3, email = $4, phone = $5 WHERE id = $6 RETURNING *',
    [name, surname, age, email, phone, id]
  );
  return result.rows[0];
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
