const DateTimeService = require('../../src/services/datetimeService');

describe('DateTimeService', () => {
  
  describe('getDaysOfWeek', () => {
    it('debería retornar un array con 7 días', () => {
      const days = DateTimeService.getDaysOfWeek();
      expect(days).toHaveLength(7);
    });

    it('debería retornar los días en español', () => {
      const days = DateTimeService.getDaysOfWeek();
      expect(days).toEqual([
        'Domingo',
        'Lunes', 
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado'
      ]);
    });
  });

  describe('getCurrentDateTime', () => {
    it('debería retornar un objeto con las propiedades correctas', () => {
      const result = DateTimeService.getCurrentDateTime();
      
      expect(result).toHaveProperty('fecha');
      expect(result).toHaveProperty('hora');
      expect(result).toHaveProperty('diaDeLaSemana');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('iso');
    });

    it('debería retornar tipos de datos correctos', () => {
      const result = DateTimeService.getCurrentDateTime();
      
      expect(typeof result.fecha).toBe('string');
      expect(typeof result.hora).toBe('string');
      expect(typeof result.diaDeLaSemana).toBe('string');
      expect(typeof result.timestamp).toBe('number');
      expect(typeof result.iso).toBe('string');
    });

    it('debería retornar un día válido de la semana', () => {
      const result = DateTimeService.getCurrentDateTime();
      const validDays = DateTimeService.getDaysOfWeek();
      
      expect(validDays).toContain(result.diaDeLaSemana);
    });

    it('debería tener un timestamp válido', () => {
      const before = Date.now();
      const result = DateTimeService.getCurrentDateTime();
      const after = Date.now();
      
      expect(result.timestamp).toBeGreaterThanOrEqual(before);
      expect(result.timestamp).toBeLessThanOrEqual(after);
    });
  });

  describe('formatDateTime', () => {
    const testDate = new Date('2024-03-15T14:30:45.000Z');

    it('debería formatear correctamente una fecha válida', () => {
      const result = DateTimeService.formatDateTime(testDate);
      
      expect(result).toHaveProperty('fecha');
      expect(result).toHaveProperty('hora');
      expect(result).toHaveProperty('diaDeLaSemana');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('iso');
    });

    it('debería lanzar error con fecha inválida', () => {
      expect(() => {
        DateTimeService.formatDateTime('fecha-invalida');
      }).toThrow('Debe proporcionar una fecha válida');
    });

    it('debería lanzar error con null', () => {
      expect(() => {
        DateTimeService.formatDateTime(null);
      }).toThrow('Debe proporcionar una fecha válida');
    });

    it('debería lanzar error con undefined', () => {
      expect(() => {
        DateTimeService.formatDateTime(undefined);
      }).toThrow('Debe proporcionar una fecha válida');
    });

    it('debería retornar el timestamp correcto', () => {
      const result = DateTimeService.formatDateTime(testDate);
      expect(result.timestamp).toBe(testDate.getTime());
    });

    it('debería retornar el ISO string correcto', () => {
      const result = DateTimeService.formatDateTime(testDate);
      expect(result.iso).toBe(testDate.toISOString());
    });
  });
});