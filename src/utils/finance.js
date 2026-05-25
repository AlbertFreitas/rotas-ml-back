const toNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const round2 = (value) => Number(toNumber(value).toFixed(2));

module.exports = {
  toNumber,
  round2,
};
