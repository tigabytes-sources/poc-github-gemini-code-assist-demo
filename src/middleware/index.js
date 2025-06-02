const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

/**
 * Configuración de middlewares globales
 * @param {Express} app - Instancia de Express
 */
const setupMiddleware = (app) => {
  // Seguridad básica con Helmet
  app.use(helmet());

  // CORS
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://tu-dominio.com'] // Reemplazar con tu dominio en producción
      : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Parsing de JSON
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Logging básico en desarrollo
  if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
  }
};

/**
 * Middleware para manejo de errores 404
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    path: req.path,
    method: req.method
  });
};

/**
 * Middleware global de manejo de errores
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = {
  setupMiddleware,
  notFoundHandler,
  errorHandler
};