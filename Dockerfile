# Usar imagen oficial de Node.js LTS
FROM node:18-alpine

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Instalar dependencias del sistema si es necesario
RUN apk --no-cache add dumb-init

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Copiar código fuente
COPY --chown=nodeuser:nodejs src ./src

# Cambiar a usuario no-root
USER nodeuser

# Exponer puerto
EXPOSE 3000

# Configurar variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Usar dumb-init para manejo correcto de señales
ENTRYPOINT ["dumb-init", "--"]

# Comando para iniciar la aplicación
CMD ["node", "src/server.js"]