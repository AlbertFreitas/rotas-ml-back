const { yup, numberField } = require('./common');

const upsertVehicleSchema = yup.object({
  name: yup.string().required('Nome do carro é obrigatório.'),
  consumptionKmL: numberField('Consumo').positive('Consumo deve ser maior que zero.').required(),
  fuelPrice: numberField('Valor da gasolina').positive('Valor da gasolina deve ser maior que zero.').required(),
});

module.exports = {
  upsertVehicleSchema,
};
