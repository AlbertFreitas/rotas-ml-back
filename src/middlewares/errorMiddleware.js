const { ValidationError } = require('yup');
const AppError = require('../utils/AppError');
const env = require('../config/env');

module.exports = (err, req, res, _next) => {
  if (err?.message === 'Origem não permitida pelo CORS.') {
    return res.status(403).json({ message: 'Origem não autorizada.' });
  }

  if (err instanceof ValidationError) {
    return res.status(422).json({
      message: 'Erro de validação.',
      errors: err.errors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (!env.isProduction) {
    console.error('[request-id:%s] %s', req.requestId || 'n/a', err.stack || err.message);
  } else {
    console.error('[request-id:%s] internal-error', req.requestId || 'n/a');
  }

  return res.status(500).json({
    message: 'Erro interno do servidor.',
    requestId: req.requestId || undefined,
  });
};
