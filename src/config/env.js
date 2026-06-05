const dotenv = require('dotenv');

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const port = Number(process.env.PORT || 3333);
const allowedEnvs = ['development', 'test', 'production'];

const parseOrigins = (value) =>
  String(value || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const corsOrigins = parseOrigins(process.env.CORS_ORIGIN || 'http://localhost:5173');
const databaseUrl = process.env.DATABASE_URL || '';
const jwtSecret = process.env.JWT_SECRET || 'jwt-dev-secret';

const requiredInProduction = [];

if (!databaseUrl && !process.env.DB_HOST) requiredInProduction.push('DATABASE_URL ou DB_HOST');
if (!databaseUrl && !process.env.DB_NAME) requiredInProduction.push('DB_NAME');
if (!databaseUrl && !process.env.DB_USER) requiredInProduction.push('DB_USER');
if (!databaseUrl && !process.env.DB_PASS) requiredInProduction.push('DB_PASS');
if (!process.env.JWT_SECRET) requiredInProduction.push('JWT_SECRET');
if (!process.env.CORS_ORIGIN) requiredInProduction.push('CORS_ORIGIN');
if (corsOrigins.includes('*')) requiredInProduction.push('CORS_ORIGIN (não usar "*")');

if (isProduction && requiredInProduction.length) {
  throw new Error(`Variáveis obrigatórias ausentes/inválidas em produção: ${requiredInProduction.join(', ')}`);
}

if (!allowedEnvs.includes(nodeEnv)) {
  throw new Error(`NODE_ENV inválido: ${nodeEnv}. Use development, test ou production.`);
}

if (!Number.isInteger(port) || port <= 0) {
  throw new Error(`PORT inválida: ${process.env.PORT}`);
}

module.exports = {
  port,
  nodeEnv,
  isProduction,
  corsOrigins,
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  firebaseServiceAccountJson: process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '',
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID || '',
  databaseUrl,
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || 'rotas_ml',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
  },
};
