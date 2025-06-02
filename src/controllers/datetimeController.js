const DateTimeService = require('../services/datetimeService');

/**
 * Controlador para endpoints de fecha y hora
 */
class DateTimeController {
  /**
   * Obtiene la fecha y hora actual
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  static getCurrentDateTime(req, res) {
    try {
      const dateTimeInfo = DateTimeService.getCurrentDateTime();
      
      res.status(200).json({
        success: true,
        data: dateTimeInfo,
        message: 'Fecha y hora obtenidas correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Endpoint de health check
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  static healthCheck(req, res) {
    res.status(200).json({
      success: true,
      message: 'API funcionando correctamente',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  }
}

module.exports = DateTimeController;