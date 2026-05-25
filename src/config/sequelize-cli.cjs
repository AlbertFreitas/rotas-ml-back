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
  logging: false,
};

module.exports = {
  development: shared,
  test: shared,
  production: shared,
};
