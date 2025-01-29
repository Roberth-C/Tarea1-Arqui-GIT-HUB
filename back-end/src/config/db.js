/* import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde .env

const { Pool } = pkg;

// Crear conexión con PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,       // Usuario: roberth
  host: process.env.DB_HOST,       // Host: localhost
  database: process.env.DB_NAME,   // Base de datos: GestionUsuarios
  password: process.env.DB_PASSWORD, // Contraseña: admin1234
  port: process.env.DB_PORT,       // Puerto: 5432
});

// Función para ejecutar el archivo init.sql
export const executeInitSQL = async () => {
  try {
    const initSQLPath = path.join(process.cwd(), 'init.sql');
    const initSQL = fs.readFileSync(initSQLPath, 'utf8');

    const client = await pool.connect();
    await client.query(initSQL);
    console.log('Archivo init.sql ejecutado exitosamente.');
    client.release();
  } catch (error) {
    console.error('Error al ejecutar init.sql:', error.message);
  }
};

export default pool;
 */

//segunda version
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Validar que todas las variables de entorno necesarias estén definidas
const requiredEnvVariables = [
  'DB_USER',
  'DB_HOST',
  'DB_NAME',
  'DB_PASSWORD',
  'DB_PORT',
];

requiredEnvVariables.forEach((variable) => {
  if (!process.env[variable]) {
    console.error(`Falta la variable de entorno: ${variable}`);
    process.exit(1);
  }
});

// Crear un pool de conexiones con las variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,       // Usuario: roberth
  host: process.env.DB_HOST,       // Host: localhost
  database: process.env.DB_NAME,   // Base de datos: GestionUsuarios
  password: process.env.DB_PASSWORD, // Contraseña: admin1234
  port: process.env.DB_PORT,       // Puerto: 5432
});

// Función para ejecutar scripts SQL
export const executeInitSQL = async (sql) => {
  try {
    const client = await pool.connect();
    console.log('Conexión a la base de datos establecida correctamente');

    // Verificar que el script SQL no esté vacío o indefinido
    if (!sql || typeof sql !== 'string') {
      throw new Error('El script SQL está vacío o no es válido');
    }

    console.log(`Ejecutando script SQL:\n${sql}`);
    await client.query(sql);
    client.release();
    console.log('Script SQL ejecutado exitosamente');
  } catch (error) {
    console.error('Error ejecutando el script SQL:', error.message);
    process.exit(1);
  }
};

// Exportar el pool para usarlo en otros módulos
export default pool;
