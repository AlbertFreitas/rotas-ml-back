const yup = require('yup');

const numberField = (label) =>
  yup
    .number()
    .transform((_value, originalValue) => {
      if (typeof originalValue === 'string') {
        return Number(originalValue.replace(',', '.'));
      }
      return originalValue;
    })
    .typeError(`${label} deve ser numérico.`);

module.exports = {
  yup,
  numberField,
};
