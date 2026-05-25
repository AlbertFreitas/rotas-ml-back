const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const calc = ({ status, gross, km, consumption, fuelPrice }) => {
  const considered = status === 'CANCELADA' ? gross * 0.4 : gross;
  const liters = km / consumption;
  const fuel = liters * fuelPrice;
  const net = considered - fuel;
  const lucroKm = km > 0 ? net / km : 0;
  const custoKm = km > 0 ? fuel / km : 0;

  return {
    considered: Number(considered.toFixed(2)),
    liters: Number(liters.toFixed(2)),
    fuel: Number(fuel.toFixed(2)),
    net: Number(net.toFixed(2)),
    lucroKm: Number(lucroKm.toFixed(2)),
    custoKm: Number(custoKm.toFixed(2)),
  };
};

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const adminId = uuidv4();
    const userId = uuidv4();
    const vehicleId = uuidv4();

    await queryInterface.bulkInsert('admins', [
      {
        id: adminId,
        name: 'Administrador',
        email: 'admin@rotaliquida.com',
        password_hash: await bcrypt.hash('123456', 8),
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.bulkInsert('users', [
      {
        id: userId,
        firebase_uid: 'demo-firebase-uid-001',
        name: 'Usuário Demo',
        email: 'demo@rotaliquida.com',
        role: 'user',
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.bulkInsert('vehicles', [
      {
        id: vehicleId,
        user_id: userId,
        name: 'Corsa SW5',
        consumption_km_l: 11,
        fuel_price: 6.28,
        is_default: true,
        created_at: now,
        updated_at: now,
      },
    ]);

    const rawRoutes = [
      { date: '2025-03-02', name: 'Rota 02 - Centro', status: 'CONCLUIDA', gross: 230, km: 95, c: 10, p: 5.8 },
      { date: '2025-03-05', name: 'Rota 03 - Zona Leste', status: 'CONCLUIDA', gross: 210, km: 85, c: 10, p: 5.8 },
      { date: '2025-03-07', name: 'Rota 04 - Zona Norte', status: 'CONCLUIDA', gross: 210, km: 125, c: 10, p: 5.8 },
      { date: '2025-03-10', name: 'Rota 05 - Interior', status: 'CANCELADA', gross: 200, km: 30, c: 10, p: 5.8 },
      { date: '2025-03-18', name: 'Rota 01 - Zona Sul', status: 'CONCLUIDA', gross: 240, km: 92, c: 10, p: 5.8 },
      { date: '2025-04-02', name: 'Rota 06 - Centro', status: 'CONCLUIDA', gross: 215, km: 88, c: 10, p: 6.0 },
      { date: '2025-04-05', name: 'Rota 07 - Sul', status: 'CONCLUIDA', gross: 228, km: 97, c: 10, p: 6.0 },
      { date: '2025-04-12', name: 'Rota 08 - Norte', status: 'CANCELADA', gross: 180, km: 25, c: 10, p: 6.0 },
      { date: '2025-04-20', name: 'Rota 09 - Oeste', status: 'CONCLUIDA', gross: 265, km: 124, c: 10, p: 6.0 },
      { date: '2025-05-03', name: 'Rota 10 - Polo 1', status: 'CONCLUIDA', gross: 250, km: 99, c: 11, p: 6.2 },
      { date: '2025-05-08', name: 'Rota 11 - Polo 2', status: 'CONCLUIDA', gross: 238, km: 102, c: 11, p: 6.2 },
      { date: '2025-05-11', name: 'Rota 12 - Polo 3', status: 'CONCLUIDA', gross: 276, km: 130, c: 11, p: 6.2 },
      { date: '2025-05-14', name: 'Rota 13 - Polo 4', status: 'CANCELADA', gross: 188, km: 28, c: 11, p: 6.2 },
      { date: '2025-05-18', name: 'Rota 14 - Polo 5', status: 'CONCLUIDA', gross: 294, km: 140, c: 11, p: 6.2 },
      { date: '2025-05-22', name: 'Rota 15 - Polo 6', status: 'CONCLUIDA', gross: 222, km: 91, c: 11, p: 6.2 },
      { date: '2025-05-25', name: 'Rota 16 - Polo 7', status: 'CONCLUIDA', gross: 254, km: 104, c: 11, p: 6.2 },
    ];

    const records = rawRoutes.map((route) => {
      const m = calc({
        status: route.status,
        gross: route.gross,
        km: route.km,
        consumption: route.c,
        fuelPrice: route.p,
      });

      return {
        id: uuidv4(),
        user_id: userId,
        vehicle_id: vehicleId,
        route_name: route.name,
        route_date: route.date,
        status: route.status,
        gross_amount: route.gross,
        considered_amount: m.considered,
        km: route.km,
        consumption_km_l: route.c,
        fuel_price: route.p,
        fuel_liters: m.liters,
        fuel_cost: m.fuel,
        net_amount: m.net,
        profit_per_km: m.lucroKm,
        cost_per_km: m.custoKm,
        notes: null,
        created_at: now,
        updated_at: now,
      };
    });

    await queryInterface.bulkInsert('delivery_routes', records);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('delivery_routes', null, {});
    await queryInterface.bulkDelete('vehicles', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('admins', null, {});
  },
};
