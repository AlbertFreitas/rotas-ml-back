const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: Number(process.env.PORT || 3333),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  jwtSecret: process.env.JWT_SECRET || 'jwt-dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  firebaseServiceAccountJson: process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '',
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID || '',
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || 'rotas_ml',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
  },
};
