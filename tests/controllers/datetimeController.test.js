const DateTimeController = require('../../src/controllers/datetimeController');
const DateTimeService = require('../../src/services/datetimeService');

// Mock del servicio
jest.mock('../../src/services/datetimeService');

describe('DateTimeController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  describe('getCurrentDateTime', () => {
    it('debería retornar respuesta exitosa con datos correctos', () => {
      const mockDateTime = {
        fecha: '15/03/2024',
        hora: '14:30:45',
        diaDeLaSemana: 'Viernes',
        timestamp: 1710513045000,
        iso: '2024-03-15T14:30:45.000Z'
      };

      DateTimeService.getCurrentDateTime.mockReturnValue(mockDateTime);

      DateTimeController.getCurrentDateTime(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockDateTime,
        message: 'Fecha y hora obtenidas correctamente'
      });
    });

    it('debería manejar errores correctamente en desarrollo', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      const errorMessage = 'Error de prueba';
      DateTimeService.getCurrentDateTime.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      DateTimeController.getCurrentDateTime(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        data: null,
        message: 'Error interno del servidor',
        error: errorMessage
      });

      process.env.NODE_ENV = originalEnv;
    });

    it('debería ocultar detalles del error en producción', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      DateTimeService.getCurrentDateTime.mockImplementation(() => {
        throw new Error('Error de prueba');
      });

      DateTimeController.getCurrentDateTime(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        data: null,
        message: 'Error interno del servidor',
        error: undefined
      });

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('healthCheck', () => {
    it('debería retornar respuesta de health check correcta', () => {
      const originalUptime = process.uptime;
      process.uptime = jest.fn().mockReturnValue(123.45);

      DateTimeController.healthCheck(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'API funcionando correctamente',
        timestamp: expect.any(String),
        uptime: 123.45
      });

      process.uptime = originalUptime;
    });

    it('debería incluir timestamp válido en health check', () => {
      DateTimeController.healthCheck(mockReq, mockRes);

      const call = mockRes.json.mock.calls[0][0];
      const timestamp = new Date(call.timestamp);
      
      expect(timestamp).toBeInstanceOf(Date);
      expect(!isNaN(timestamp.getTime())).toBe(true);
    });
  });
});