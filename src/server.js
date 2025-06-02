const createApp = require('./app');

const PORT = process.env.PORT || 3000;
const app = createApp();

/**
 * Inicia el servidor
 */
const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log('==========================================');
    console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📅 Fecha de inicio: ${new Date().toLocaleString('es-CL')}`);
    console.log('==========================================');
    console.log('📋 Endpoints disponibles:');
    console.log(`   GET http://localhost:${PORT}/api/`);
    console.log(`   GET http://localhost:${PORT}/api/datetime`);
    console.log(`   GET http://localhost:${PORT}/api/health`);
    console.log('==========================================');
  });

  // Manejo graceful shutdown
  process.on('SIGTERM', () => {
    console.log('💤 Cerrando servidor...');
    server.close(() => {
      console.log('✅ Servidor cerrado correctamente');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('\n💤 Cerrando servidor...');
    server.close(() => {
      console.log('✅ Servidor cerrado correctamente');
      process.exit(0);
    });
  });

  return server;
};

// Iniciar servidor solo si este archivo se ejecuta directamente
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };