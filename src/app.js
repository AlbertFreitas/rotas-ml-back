const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const env = require('./config/env');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors({ origin: env.corsOrigin === '*' ? true : env.corsOrigin }));
app.use(express.json());

app.use((req, res, next) => {
  const requestId = req.headers['x-request-id'] || uuidv4();
  req.requestId = requestId;
  res.setHeader('x-request-id', requestId);
  next();
});

app.use(routes);
app.use(errorMiddleware);

module.exports = app;
