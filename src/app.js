const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');

const env = require('./config/env');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { apiRateLimiter } = require('./middlewares/rateLimitMiddleware');

const app = express();

app.disable('x-powered-by');

// Em produção, apenas domínios autorizados devem acessar a API.
const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (env.corsOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origem não permitida pelo CORS.'));
  },
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(apiRateLimiter);

app.use((req, res, next) => {
  const requestId = req.headers['x-request-id'] || uuidv4();
  req.requestId = requestId;
  res.setHeader('x-request-id', requestId);
  next();
});

app.use(routes);
app.use(errorMiddleware);

module.exports = app;
