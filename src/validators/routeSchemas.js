const { yup, numberField } = require('./common');

const createRouteSchema = yup.object({
  routeName: yup.string().required('Nome da rota é obrigatório.'),
  routeDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar em YYYY-MM-DD.')
    .required('Data é obrigatória.'),
  status: yup
    .string()
    .oneOf(['CONCLUIDA', 'CANCELADA', 'concluida', 'cancelada'], 'Status inválido.')
    .required('Status é obrigatório.'),
  grossAmount: numberField('Valor bruto').min(0, 'Valor bruto inválido.').required(),
  km: numberField('KM rodados').min(0, 'KM inválido.').required(),
  consumptionKmL: numberField('Consumo').positive('Consumo deve ser maior que zero.').notRequired(),
  fuelPrice: numberField('Valor da gasolina').positive('Valor da gasolina deve ser maior que zero.').notRequired(),
  vehicleId: yup.string().uuid('vehicleId inválido.').notRequired(),
  notes: yup.string().max(1000, 'Observações excedem 1000 caracteres.').notRequired(),
});

const listRoutesQuerySchema = yup.object({
  status: yup.string().oneOf(['CONCLUIDA', 'CANCELADA', 'concluida', 'cancelada']).notRequired(),
  month: yup.number().integer().min(1).max(12).notRequired(),
  year: yup.number().integer().min(2000).max(2100).notRequired(),
  startDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/).notRequired(),
  endDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/).notRequired(),
});

module.exports = {
  createRouteSchema,
  listRoutesQuerySchema,
};
