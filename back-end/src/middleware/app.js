// src/middleware/app.js
import express from 'express';
import cors from 'cors';  // Importa CORS
import userRoutes from '../routes/userRoutes.js';  // Ajusta la ruta de las rutas de usuario

const app = express();

// Configura CORS para permitir solicitudes desde el frontend (React en http://localhost:3000)
app.use(cors({
    origin: 'http://localhost:3001'  // Permite solo solicitudes desde el frontend en puerto 3000
  }));

app.use(express.json());  // Middleware para parsear JSON
app.use('/api/users', userRoutes);  // Usar las rutas de usuarios

export default app;  // Exportar la aplicación para que sea utilizada en server.js
