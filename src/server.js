const app = require('./app');
const env = require('./config/env');
const sequelize = require('./database');

const bootstrap = async () => {
  try {
    await sequelize.authenticate();

    app.listen(env.port, () => {
      console.log(`API online na porta ${env.port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error.message);
    process.exit(1);
  }
};

bootstrap();
