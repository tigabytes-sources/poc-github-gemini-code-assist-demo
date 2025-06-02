/**
 * Servicio para manejo de fecha y hora
 */
class DateTimeService {
  /**
   * Obtiene los días de la semana en español
   * @returns {string[]} Array con los nombres de los días
   */
  static getDaysOfWeek() {
    return [
      'Domingo',
      'Lunes', 
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ];
  }

  /**
   * Obtiene la información completa de fecha y hora actual
   * @returns {Object} Objeto con fecha, hora y día de la semana
   */
  static getCurrentDateTime() {
    const now = new Date();
    const days = this.getDaysOfWeek();
    
    return {
      fecha: now.toLocaleDateString('es-CL'),
      hora: now.toLocaleTimeString('es-CL', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      diaDeLaSemana: days[now.getDay()],
      timestamp: now.getTime(),
      iso: now.toISOString()
    };
  }

  /**
   * Formatea una fecha específica
   * @param {Date} date - Fecha a formatear
   * @returns {Object} Objeto con información formateada
   */
  static formatDateTime(date) {
    if (!(date instanceof Date) || isNaN(date)) {
      throw new Error('Debe proporcionar una fecha válida');
    }

    const days = this.getDaysOfWeek();
    
    return {
      fecha: date.toLocaleDateString('es-CL'),
      hora: date.toLocaleTimeString('es-CL', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      diaDeLaSemana: days[date.getDay()],
      timestamp: date.getTime(),
      iso: date.toISOString()
    };
  }
}

module.exports = DateTimeService;