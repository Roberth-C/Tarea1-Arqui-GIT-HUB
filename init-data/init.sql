/* -- Crear la base de datos si no existe
CREATE DATABASE GestionUsuarios;

-- Conectar a la base de datos
\connect GestionUsuarios;

-- Crear la tabla 'users' con la columna 'age'
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    age INT, -- Agregamos esta columna
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15)
);

-- Insertar datos iniciales en la tabla 'users'
INSERT INTO users (name, surname, age, email, phone)
VALUES
    ('John', 'Doe', 30, 'john.doe@example.com', '1234567890'),
    ('Jane', 'Smith', 25, 'jane.smith@example.com', '0987654321'),
    ('Alice', 'Johnson', 28, 'alice.johnson@example.com', '5555555555');
 */

DO $$ 
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'roberth') THEN
      CREATE USER roberth WITH ENCRYPTED PASSWORD 'admin1234';
   END IF;
END $$;

CREATE DATABASE GestionUsuarios OWNER roberth;

\connect GestionUsuarios;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    age INT,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15)
);

INSERT INTO users (name, surname, age, email, phone) VALUES
    ('John', 'Doe', 30, 'john.doe@example.com', '1234567890'),
    ('Jane', 'Smith', 25, 'jane.smith@example.com', '0987654321'),
    ('Alice', 'Johnson', 28, 'alice.johnson@example.com', '5555555555');
