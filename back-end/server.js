import app from './src/middleware/app.js';

const PORT = process.env.PORT || 4000;

// Iniciar el servidor sin ejecutar ningún script SQL
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
