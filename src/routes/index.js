const express = require('express');
const datetimeRoutes = require('./datetimeRoutes');
const DateTimeController = require('../controllers/datetimeController');

const router = express.Router();

// Rutas principales
router.use('/datetime', datetimeRoutes);

// Health check
router.get('/health', DateTimeController.healthCheck);

// Ruta por defecto
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bienvenido a la API de Fecha y Hora',
    endpoints: {
      datetime: '/api/datetime',
      health: '/api/health'
    },
    version: '1.0.0'
  });
});

module.exports = router;