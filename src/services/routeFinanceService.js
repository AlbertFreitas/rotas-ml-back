const { round2, toNumber } = require('../utils/finance');

const CANCELED_PERCENT = 0.4;

const calculateRouteMetrics = ({ status, grossAmount, km, consumptionKmL, fuelPrice }) => {
  const normalizedStatus = String(status || '').toUpperCase();
  const gross = toNumber(grossAmount);
  const totalKm = toNumber(km);
  const consumption = toNumber(consumptionKmL);
  const price = toNumber(fuelPrice);

  const consideredAmount = normalizedStatus === 'CANCELADA' ? gross * CANCELED_PERCENT : gross;
  const liters = consumption > 0 ? totalKm / consumption : 0;
  const fuelCost = liters * price;
  const netAmount = consideredAmount - fuelCost;
  const profitPerKm = totalKm > 0 ? netAmount / totalKm : 0;
  const costPerKm = totalKm > 0 ? fuelCost / totalKm : 0;

  return {
    consideredAmount: round2(consideredAmount),
    fuelLiters: round2(liters),
    fuelCost: round2(fuelCost),
    netAmount: round2(netAmount),
    profitPerKm: round2(profitPerKm),
    costPerKm: round2(costPerKm),
  };
};

module.exports = {
  calculateRouteMetrics,
};
