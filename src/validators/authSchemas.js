const { yup } = require('./common');

const adminLoginSchema = yup.object({
  email: yup.string().email('E-mail inválido.').required('E-mail é obrigatório.'),
  password: yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres.').required('Senha é obrigatória.'),
});

const firebaseLoginSchema = yup.object({
  idToken: yup.string().required('idToken é obrigatório.'),
});

module.exports = {
  adminLoginSchema,
  firebaseLoginSchema,
};
