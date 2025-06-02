# API REST - Fecha y Hora

Una API REST simple desarrollada en Node.js que devuelve la fecha, hora actual y el día de la semana en formato JSON.

## 🚀 Características

- **Endpoint principal**: Devuelve fecha, hora y día de la semana
- **Health Check**: Verificación del estado de la API
- **Arquitectura modular**: Separación clara de responsabilidades
- **Pruebas unitarias e integración**: Cobertura completa con Jest
- **Seguridad**: Implementación de buenas prácticas con Helmet y CORS
- **Manejo de errores**: Sistema robusto

## 📁 Estructura del Proyecto

```
datetime-api/
├── src/
│   ├── controllers/
│   │   └── datetimeController.js
│   ├── services/
│   │   └── datetimeService.js
│   ├── routes/
│   │   ├── index.js
│   │   └── datetimeRoutes.js
│   ├── middleware/
│   │   └── index.js
│   ├── app.js
│   └── server.js
├── tests/
│   ├── controllers/
│   │   └── datetimeController.test.js
│   ├── services/
│   │   └── datetimeService.test.js
│   └── integration/
│       └── api.test.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd datetime-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```
Edita el archivo `.env` con tus configuraciones.

4. **Iniciar el servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📚 API Endpoints

### GET /api/datetime
Obtiene la fecha, hora actual y día de la semana.

**Respuesta exitosa:**
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

### GET /api/health
Verificación del estado de la API.

**Respuesta:**
```json
{
  "success": true,
  "message": "API funcionando correctamente",
  "timestamp": "2025-06-02T17:30:45.000Z",
  "uptime": 123.45
}
```

### GET /api/
Información general de la API.

**Respuesta:**
```json
{
  "success": true,
  "message": "Bienvenido a la API de Fecha y Hora",
  "endpoints": {
    "datetime": "/api/datetime",
    "health": "/api/health"
  },
  "version": "1.0.0"
}
```

## 🧪 Pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo watch
```bash
npm run test:watch
```

### Generar reporte de cobertura
```bash
npm run test:coverage
```

### Tipos de pruebas incluidas:
- **Unitarias**: Servicios y controladores
- **Integración**: Endpoints completos
- **Cobertura**: Análisis de código cubierto

## 🔧 Scripts Disponibles

```bash
npm start          # Iniciar servidor en producción
npm run dev        # Iniciar servidor en desarrollo con nodemon
npm test           # Ejecutar todas las pruebas
npm run test:watch # Ejecutar pruebas en modo watch
npm run test:coverage # Generar reporte de cobertura
```

## 🏗️ Arquitectura

### Capa de Servicios
- **DateTimeService**: Lógica de negocio para manejo de fechas

### Capa de Controladores
- **DateTimeController**: Manejo de requests/responses HTTP

### Capa de Rutas
- **Routes**: Definición de endpoints y routing

### Middleware
- **Seguridad**: Helmet para headers de seguridad
- **CORS**: Configuración de políticas de origen cruzado
- **Logging**: Sistema de logs en desarrollo
- **Error Handling**: Manejo centralizado de errores

## 🔒 Seguridad

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configuración restrictiva por ambiente
- **Rate Limiting**: Límites en el tamaño de requests
- **Error Handling**: No exposición de información sensible

## 🌍 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Ambiente de ejecución | `development` |
| `TZ` | Zona horaria | `America/Santiago` |

## 📋 Dependencias Principales

### Producción
- **express**: Framework web
- **cors**: Manejo de CORS
- **helmet**: Seguridad HTTP
- **dotenv**: Variables de entorno

### Desarrollo
- **jest**: Framework de testing
- **supertest**: Testing de APIs HTTP
- **nodemon**: Auto-restart en desarrollo

## 🚀 Despliegue

### Usando PM2
```bash
npm install -g pm2
pm2 start src/server.js --name "datetime-api"
```

### Docker (opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

Tu Nombre - [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)

## 🐛 Reportar Bugs

Si encuentras algún bug, por favor crea un issue en el repositorio con:
- Descripción del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Información del ambiente (OS, Node.js version, etc.)