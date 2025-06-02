# 🚀 Instrucciones de Configuración e Inicio

## 📋 Pasos para configurar el proyecto

### 1. Crear estructura de carpetas
```bash
mkdir datetime-api
cd datetime-api
mkdir -p src/{controllers,services,routes,middleware}
mkdir -p tests/{controllers,services,integration}
```

### 2. Inicializar proyecto NPM
```bash
npm init -y
```

### 3. Copiar archivos
Copia todos los archivos proporcionados en sus respectivas ubicaciones según la estructura mostrada.

### 4. Instalar dependencias
```bash
# Dependencias de producción
npm install express cors helmet dotenv

# Dependencias de desarrollo
npm install --save-dev jest supertest nodemon
```

### 5. Configurar variables de entorno
```bash
# Crear archivo .env
touch .env
```

Contenido del archivo `.env`:
```
PORT=3000
NODE_ENV=development
TZ=America/Santiago
```

## 🏃‍♂️ Comandos para ejecutar

### Desarrollo
```bash
# Iniciar servidor en modo desarrollo (con auto-reload)
npm run dev
```

### Producción
```bash
# Iniciar servidor en modo producción
npm start
```

### Pruebas
```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con watch mode
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

## 🌐 URLs disponibles

Una vez iniciado el servidor, podrás acceder a:

- **API Principal**: http://localhost:3000/api/
- **Fecha y Hora**: http://localhost:3000/api/datetime
- **Health Check**: http://localhost:3000/api/health

## 🧪 Ejemplo de respuesta

Al hacer GET a `http://localhost:3000/api/datetime`:

```json
{
  "success": true,
  "data": {
    "fecha": "02/06/2025",
    "hora": "14:30:45",
    "diaDeLaSemana": "Lunes",
    "timestamp": 1748956245000,
    "iso": "2025-06-02T17:30:45.000Z"
  },
  "message": "Fecha y hora obtenidas correctamente"
}
```

## 🐳 Uso con Docker

### Construir imagen
```bash
docker build -t datetime-api .
```

### Ejecutar contenedor
```bash
docker run -p 3000:3000 datetime-api
```

### Usar Docker Compose
```bash
docker-compose up -d
```

## 🔍 Verificar funcionamiento

### Opción 1: Navegador
Abrir http://localhost:3000/api/datetime en el navegador

### Opción 2: cURL
```bash
curl http://localhost:3000/api/datetime
```

### Opción 3: Postman/Insomnia
Crear request GET a http://localhost:3000/api/datetime

## 🛠️ Desarrollo adicional

### Agregar nuevos endpoints
1. Crear servicio en `src/services/`
2. Crear controlador en `src/controllers/`
3. Crear rutas en `src/routes/`
4. Registrar rutas en `src/routes/index.js`
5. Escribir pruebas en `tests/`

### Estructura de respuesta estándar
```javascript
// Respuesta exitosa
{
  success: true,
  data: { /* datos */ },
  message: "Mensaje descriptivo"
}

// Respuesta de error
{
  success: false,
  data: null,
  message: "Descripción del error",
  error: "Detalles técnicos (solo en desarrollo)"
}
```

## 📊 Cobertura de pruebas esperada

El proyecto incluye pruebas para:
- ✅ Servicios (lógica de negocio)
- ✅ Controladores (manejo HTTP)
- ✅ Integración (endpoints completos)
- ✅ Manejo de errores
- ✅ Validaciones

Objetivo de cobertura: **80%** en todas las métricas.

## 🚨 Troubleshooting

### Puerto ocupado
```bash
# Ver qué proceso usa el puerto 3000
lsof -i :3000

# Matar proceso si es necesario
kill -9 <PID>
```

### Dependencias no instaladas
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problemas con pruebas
```bash
# Ejecutar pruebas con más detalle
npm test -- --verbose --detectOpenHandles
```

¡El proyecto está listo para usar! 🎉