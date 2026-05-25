const AppError = require('../utils/AppError');
const { verifyToken } = require('../services/tokenService');

const ensureAuth = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Token não enviado.', 401));
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const decoded = verifyToken(token);
    req.auth = decoded;
    return next();
  } catch (error) {
    return next(new AppError('Token inválido.', 401));
  }
};

const ensureRole = (...roles) => (req, _res, next) => {
  if (!req.auth || !roles.includes(req.auth.role)) {
    return next(new AppError('Acesso negado.', 403));
  }

  return next();
};

module.exports = {
  ensureAuth,
  ensureRole,
};
