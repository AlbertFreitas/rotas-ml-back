const Admin = require('../models/Admin');
const User = require('../models/User');
const { verifyFirebaseIdToken } = require('../services/firebaseAuthService');
const { signToken } = require('../services/tokenService');
const AppError = require('../utils/AppError');

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email } });

  if (!admin || !(await admin.checkPassword(password))) {
    throw new AppError('Credenciais inválidas.', 401);
  }

  const token = signToken({
    sub: admin.id,
    role: 'admin',
    name: admin.name,
    email: admin.email,
  });

  return res.json({
    token,
    user: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: 'admin',
    },
  });
};

const firebaseLogin = async (req, res) => {
  const { idToken } = req.body;
  const decoded = await verifyFirebaseIdToken(idToken);

  const [user] = await User.findOrCreate({
    where: { firebase_uid: decoded.uid },
    defaults: {
      firebase_uid: decoded.uid,
      name: decoded.name || decoded.email || 'Usuário',
      email: decoded.email || null,
      role: 'user',
    },
  });

  if (!user.name && decoded.name) {
    user.name = decoded.name;
    user.email = decoded.email || user.email;
    await user.save();
  }

  const token = signToken({
    sub: user.id,
    role: user.role,
    firebaseUid: user.firebase_uid,
    name: user.name,
    email: user.email,
  });

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const me = async (req, res) => {
  if (req.auth.role === 'admin') {
    const admin = await Admin.findByPk(req.auth.sub);
    return res.json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: 'admin',
    });
  }

  const user = await User.findByPk(req.auth.sub);
  if (!user) {
    throw new AppError('Usuário não encontrado.', 404);
  }

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

const demoLogin = async (_req, res) => {
  const user = await User.findOne({
    where: { firebase_uid: 'demo-firebase-uid-001' },
  });

  if (!user) {
    throw new AppError('Usuário demo não encontrado. Rode o seed novamente.', 404);
  }

  const token = signToken({
    sub: user.id,
    role: user.role,
    firebaseUid: user.firebase_uid,
    name: user.name,
    email: user.email,
  });

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

module.exports = {
  adminLogin,
  firebaseLogin,
  me,
  demoLogin,
};
