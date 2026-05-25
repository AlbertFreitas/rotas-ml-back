const AppError = require('../utils/AppError');
const { admin, isFirebaseReady } = require('../config/firebase');

const verifyFirebaseIdToken = async (idToken) => {
  if (!isFirebaseReady()) {
    throw new AppError(
      'Firebase Admin não configurado. Preencha FIREBASE_SERVICE_ACCOUNT_JSON no .env.',
      503
    );
  }

  try {
    return await admin.auth().verifyIdToken(idToken, true);
  } catch (_error) {
    throw new AppError('Token Firebase inválido.', 401);
  }
};

module.exports = {
  verifyFirebaseIdToken,
};
