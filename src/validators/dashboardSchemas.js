const { yup } = require('./common');

const isValidIsoDate = (value) => !value || !Number.isNaN(new Date(`${value}T00:00:00`).getTime());

const periodSchema = yup.object({
  month: yup.number().integer().min(1).max(12).notRequired(),
  year: yup.number().integer().min(2000).max(2100).notRequired(),
  startDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/).test('valid-date', 'Data inicial inválida.', isValidIsoDate).notRequired(),
  endDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/).test('valid-date', 'Data final inválida.', isValidIsoDate).notRequired(),
  status: yup.string().oneOf(['CONCLUIDA', 'CANCELADA', 'concluida', 'cancelada']).notRequired(),
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
  periodSchema,
};
