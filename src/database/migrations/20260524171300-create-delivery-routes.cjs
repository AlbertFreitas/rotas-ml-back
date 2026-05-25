module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('delivery_routes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      vehicle_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'vehicles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      route_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      route_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gross_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      considered_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      km: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      consumption_km_l: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      fuel_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      fuel_liters: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      fuel_cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      net_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      profit_per_km: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      cost_per_km: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex('delivery_routes', ['user_id', 'route_date']);
    await queryInterface.addIndex('delivery_routes', ['status']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('delivery_routes');
  },
};
