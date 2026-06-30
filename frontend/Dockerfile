# 1. Etapa de construcción (Usamos Node para compilar React)
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos el package.json y descargamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y construimos la versión de producción
COPY . .
RUN npm run build

# 2. Etapa de producción (Usamos Nginx para servir la página web)
FROM nginx:alpine

# Copiamos los archivos compilados de Vite (carpeta dist) a Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]