const admin = require('firebase-admin');
const env = require('./env');

const parseServiceAccount = () => {
  if (!env.firebaseServiceAccountJson) {
    return null;
  }

  const raw = env.firebaseServiceAccountJson.trim();

  try {
    if (raw.startsWith('{')) {
      return JSON.parse(raw);
    }

    const decoded = Buffer.from(raw, 'base64').toString('utf8');
    return JSON.parse(decoded);
  } catch (error) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON inválido.');
  }
};

const serviceAccount = parseServiceAccount();

if (serviceAccount && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: env.firebaseProjectId || serviceAccount.project_id,
  });
}

const isFirebaseReady = () => Boolean(admin.apps.length);

module.exports = {
  admin,
  isFirebaseReady,
};
