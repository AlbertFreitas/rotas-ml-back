const AppError = require('../utils/AppError');
const { admin, isFirebaseReady } = require('../config/firebase');

const verifyFirebaseIdToken = async (idToken) => {
  if (!isFirebaseReady()) {
    throw new AppError('Serviço de login indisponível no momento.', 503);
  }

  try {
    return await admin.auth().verifyIdToken(idToken, true);
  } catch (_error) {
    throw new AppError('Não foi possível validar o login.', 401);
  }
};

module.exports = {
  verifyFirebaseIdToken,
};
