// Configuración global para las pruebas

// Configurar timezone para consistencia en tests
process.env.TZ = 'America/Santiago';

// Configurar NODE_ENV para tests
process.env.NODE_ENV = 'test';

// Configurar puerto de prueba
process.env.PORT = '0';

// Suprimir console.log durante las pruebas a menos que sea explícito
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeEach(() => {
  // Restaurar console.log para cada test
  console.log = jest.fn();
  console.error = jest.fn();
});

afterEach(() => {
  // Limpiar mocks después de cada test
  jest.clearAllMocks();
});

afterAll(() => {
  // Restaurar console original
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

// Configurar timeout global para tests async
jest.setTimeout(10000);

// Mock para process.uptime si es necesario
const originalUptime = process.uptime;
beforeAll(() => {
  if (!process.uptime.mockImplementation) {
    process.uptime = jest.fn().mockReturnValue(123.45);
  }
});

afterAll(() => {
  process.uptime = originalUptime;
});