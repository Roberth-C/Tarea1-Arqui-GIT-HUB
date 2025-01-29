// src/controllers/userController.js
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../models/userModel.js';

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error('Error al obtener los usuarios:', err);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por ID
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    console.error('Error al obtener el usuario:', err);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

// Crear un nuevo usuario
export const createNewUser = async (req, res) => {
  const { name, surname, age, email, phone } = req.body;
  try {
    const newUser = await createUser({ name, surname, age, email, phone });
    res.json(newUser);
  } catch (err) {
    console.error('Error al crear el usuario:', err);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

// // Actualizar un usuario
// export const updateUserData = async (req, res) => {
//   const { id } = req.params;
//   const { name, surname, age, email, phone } = req.body;
//   try {
//     const updatedUser = await updateUser(id, { name, surname, age, email, phone });
//     if (updatedUser) {
//       res.json(updatedUser);
//     } else {
//       res.status(404).json({ message: 'Usuario no encontrado' });
//     }
//   } catch (err) {
//     console.error('Error al actualizar el usuario:', err);
//     res.status(500).json({ message: 'Error al actualizar el usuario' });
//   }
// };

// Actualizar un usuario
export const updateUserData = async (req, res) => {
  const { id } = req.params;
  const { name, surname, age, email, phone } = req.body;
  try {
    // Obtener los datos actuales del usuario
    const currentUser = await getUserById(id);
    if (!currentUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Solo actualizamos los campos enviados en la solicitud
    const updatedUser = {
      ...currentUser, // Conservamos los datos actuales
      ...(name && { name }),  // Si 'name' está presente, lo actualizamos
      ...(surname && { surname }),  // Si 'surname' está presente, lo actualizamos
      ...(age && { age }),  // Si 'age' está presente, lo actualizamos
      ...(email && { email }),  // Si 'email' está presente, lo actualizamos
      ...(phone && { phone })  // Si 'phone' está presente, lo actualizamos
    };

    // Actualizamos el usuario en la base de datos
    const savedUser = await updateUser(id, updatedUser);

    res.json(savedUser);
  } catch (err) {
    console.error('Error al actualizar el usuario:', err);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};



// Eliminar un usuario
export const deleteUserData = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    if (deletedUser) {
      res.json({ message: 'Usuario eliminado', user: deletedUser });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    console.error('Error al eliminar el usuario:', err);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};
