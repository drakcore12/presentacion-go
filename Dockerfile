# Usa una imagen base de servidor web
FROM nginx:alpine

# Elimina la página por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia tu proyecto al directorio de nginx
COPY . /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# No es necesario CMD porque nginx ya lo maneja
