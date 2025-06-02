const express = require('express');
const DateTimeController = require('../controllers/datetimeController');

const router = express.Router();

/**
 * @route GET /api/datetime
 * @desc Obtiene la fecha, hora y día de la semana actual
 * @access Public
 */
router.get('/', DateTimeController.getCurrentDateTime);

module.exports = router;