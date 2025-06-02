require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const { setupMiddleware, notFoundHandler, errorHandler } = require('./middleware');

/**
 * Crea y configura la aplicación Express
 * @returns {Express} Instancia configurada de Express
 */
const createApp = () => {
  const app = express();

  // Configurar middlewares
  setupMiddleware(app);

  // Configurar rutas
  app.use('/api', routes);

  // Middleware para rutas no encontradas
  app.use('*', notFoundHandler);

  // Middleware global de manejo de errores
  app.use(errorHandler);

  return app;
};

module.exports = createApp;