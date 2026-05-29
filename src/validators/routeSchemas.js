const { yup, numberField } = require('./common');

const isValidIsoDate = (value) => !value || !Number.isNaN(new Date(`${value}T00:00:00`).getTime());

const createRouteSchema = yup.object({
  routeName: yup.string().trim().min(2).max(120).required('Nome da rota é obrigatório.'),
  routeDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar em YYYY-MM-DD.')
    .test('valid-date', 'Data inválida.', isValidIsoDate)
    .required('Data é obrigatória.'),
  status: yup
    .string()
    .oneOf(['CONCLUIDA', 'CANCELADA', 'concluida', 'cancelada'], 'Status inválido.')
    .required('Status é obrigatório.'),
  grossAmount: numberField('Valor bruto').positive('Valor bruto deve ser maior que zero.').required(),
  km: numberField('KM rodados').positive('KM deve ser maior que zero.').required(),
  consumptionKmL: numberField('Consumo').positive('Consumo deve ser maior que zero.').notRequired(),
  fuelPrice: numberField('Valor da gasolina').positive('Valor da gasolina deve ser maior que zero.').notRequired(),
  vehicleId: yup.string().uuid('vehicleId inválido.').notRequired(),
  notes: yup.string().max(1000, 'Observações excedem 1000 caracteres.').notRequired(),
});

const listRoutesQuerySchema = yup.object({
  status: yup.string().oneOf(['CONCLUIDA', 'CANCELADA', 'concluida', 'cancelada']).notRequired(),
  month: yup.number().integer().min(1).max(12).notRequired(),
  year: yup.number().integer().min(2000).max(2100).notRequired(),
  startDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/).test('valid-date', 'Data inicial inválida.', isValidIsoDate).notRequired(),
  endDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/).test('valid-date', 'Data final inválida.', isValidIsoDate).notRequired(),
})
  .test('month-year-pair', 'Informe mês e ano juntos.', (value) => {
    if (!value) return true;
    const hasMonth = Number.isInteger(value.month);
    const hasYear = Number.isInteger(value.year);
    return hasMonth === hasYear;
  })
  .test('date-range-pair', 'Informe data inicial e final juntas.', (value) => {
    if (!value) return true;
    const hasStart = Boolean(value.startDate);
    const hasEnd = Boolean(value.endDate);
    return hasStart === hasEnd;
  })
  .test('date-range-order', 'Data final não pode ser menor que data inicial.', (value) => {
    if (!value?.startDate || !value?.endDate) return true;
    return value.endDate >= value.startDate;
  });

module.exports = {
  createRouteSchema,
  listRoutesQuerySchema,
};
