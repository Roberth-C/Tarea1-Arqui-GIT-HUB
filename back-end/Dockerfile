# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Copia el script wait-for-it.sh descargado al contenedor
COPY wait-for-it.sh /usr/src/app/

# Da permisos de ejecución al script wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Expone el puerto en el que corre el backend
EXPOSE 4000

# Comando para iniciar el servidor, esperando que la base de datos esté lista
CMD ["sh", "-c", "/usr/src/app/wait-for-it.sh postgres:5432 -- npm start"]
