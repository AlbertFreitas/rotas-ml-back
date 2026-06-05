require('dotenv').config();

const shared = {
  dialect: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'rotas_ml',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  define: {
    underscored: true,
    timestamps: true,
    freezeTableName: true,
  },
  dialectOptions:
    process.env.NODE_ENV === 'production' || String(process.env.DB_HOST || '').includes('neon.tech')
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  logging: false,
};

const withDatabaseUrl = process.env.DATABASE_URL
  ? {
      ...shared,
      use_env_variable: 'DATABASE_URL',
    }
  : shared;

module.exports = {
  development: withDatabaseUrl,
  test: withDatabaseUrl,
  production: withDatabaseUrl,
};
