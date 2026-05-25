const env = require('./env');

module.exports = {
  dialect: 'postgres',
  host: env.db.host,
  port: env.db.port,
  database: env.db.database,
  username: env.db.username,
  password: env.db.password,
  define: {
    underscored: true,
    underscoredAll: true,
    timestamps: true,
    freezeTableName: true,
  },
  dialectOptions:
    env.nodeEnv === 'production'
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  logging: false,
};
