const request = require('supertest');
const createApp = require('../../src/app');

describe('API Integration Tests', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  describe('GET /api/', () => {
    it('debería retornar información de bienvenida', async () => {
      const response = await request(app)
        .get('/api/')
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: expect.any(String),
        endpoints: expect.any(Object),
        version: expect.any(String)
      });
    });
  });

  describe('GET /api/datetime', () => {
    it('debería retornar fecha y hora actual', async () => {
      const response = await request(app)
        .get('/api/datetime')
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: {
          fecha: expect.any(String),
          hora: expect.any(String),
          diaDeLaSemana: expect.any(String),
          timestamp: expect.any(Number),
          iso: expect.any(String)
        },
        message: 'Fecha y hora obtenidas correctamente'
      });
    });

    it('debería retornar día válido de la semana', async () => {
      const response = await request(app)
        .get('/api/datetime')
        .expect(200);

      const validDays = [
        'Domingo', 'Lunes', 'Martes', 'Miércoles', 
        'Jueves', 'Viernes', 'Sábado'
      ];

      expect(validDays).toContain(response.body.data.diaDeLaSemana);
    });

    it('debería retornar timestamp reciente', async () => {
      const before = Date.now();
      
      const response = await request(app)
        .get('/api/datetime')
        .expect(200);
      
      const after = Date.now();
      const { timestamp } = response.body.data;

      expect(timestamp).toBeGreaterThanOrEqual(before - 1000); // 1 segundo de margen
      expect(timestamp).toBeLessThanOrEqual(after + 1000);
    });

    it('debería retornar formato ISO válido', async () => {
      const response = await request(app)
        .get('/api/datetime')
        .expect(200);

      const { iso } = response.body.data;
      const parsedDate = new Date(iso);

      expect(parsedDate).toBeInstanceOf(Date);
      expect(!isNaN(parsedDate.getTime())).toBe(true);
    });
  });

  describe('GET /api/health', () => {
    it('debería retornar estado de salud', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: expect.any(String),
        timestamp: expect.any(String),
        uptime: expect.any(Number)
      });
    });

    it('debería retornar uptime positivo', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body.uptime).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Rutas no existentes', () => {
    it('debería retornar 404 para rutas no encontradas', async () => {
      const response = await request(app)
        .get('/api/ruta-inexistente')
        .expect(404);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Endpoint no encontrado',
        path: '/api/ruta-inexistente',
        method: 'GET'
      });
    });

    it('debería retornar 404 para métodos no permitidos', async () => {
      const response = await request(app)
        .post('/api/datetime')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Headers de respuesta', () => {
    it('debería incluir headers de seguridad', async () => {
      const response = await request(app)
        .get('/api/datetime')
        .expect(200);

      // Verificar algunos headers de seguridad de Helmet
      expect(response.headers).toHaveProperty('x-content-type-options');
      expect(response.headers).toHaveProperty('x-frame-options');
    });

    it('debería retornar Content-Type JSON', async () => {
      const response = await request(app)
        .get('/api/datetime')
        .expect(200);

      expect(response.headers['content-type']).toMatch(/application\/json/);
    });
  });
});