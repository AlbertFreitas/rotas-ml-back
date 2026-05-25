const { yup } = require('./common');

const periodSchema = yup.object({
  month: yup.number().integer().min(1).max(12).notRequired(),
  year: yup.number().integer().min(2000).max(2100).notRequired(),
  startDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/).notRequired(),
  endDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/).notRequired(),
  status: yup.string().oneOf(['CONCLUIDA', 'CANCELADA', 'concluida', 'cancelada']).notRequired(),
});

module.exports = {
  periodSchema,
};
