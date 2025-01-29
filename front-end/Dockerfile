# Etapa 1: Construcción de la aplicación React
FROM node:18 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copiar el resto de los archivos del frontend
COPY ./ . 

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos construidos al directorio de Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Exponer el puerto del frontend
EXPOSE 3001

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
