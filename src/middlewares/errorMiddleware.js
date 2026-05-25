const { ValidationError } = require('yup');
const AppError = require('../utils/AppError');

module.exports = (err, req, res, _next) => {
  if (err instanceof ValidationError) {
    return res.status(422).json({
      message: 'Erro de validação.',
      errors: err.errors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Erro interno do servidor.' });
};
