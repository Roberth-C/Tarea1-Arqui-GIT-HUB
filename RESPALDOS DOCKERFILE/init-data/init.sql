-- Crear la tabla 'users' si no existe
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15)
);

-- Insertar datos iniciales en la tabla 'users'
INSERT INTO users (name, surname, email, phone)
VALUES
    ('John', 'Doe', 'john.doe@example.com', '1234567890'),
    ('Jane', 'Smith', 'jane.smith@example.com', '0987654321'),
    ('Alice', 'Johnson', 'alice.johnson@example.com', '5555555555');
