// src/routes/userRoutes.js
import express from 'express';
import {
  getAllUsers,
  getUser,
  createNewUser,
  updateUserData,
  deleteUserData,
} from '../controllers/userController.js';

const router = express.Router();

// Rutas de usuarios
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createNewUser);
router.put('/:id', updateUserData);
router.delete('/:id', deleteUserData);

export default router;
