const { Model, DataTypes } = require('sequelize');

class DeliveryRoute extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        vehicle_id: DataTypes.UUID,
        route_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        route_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['CONCLUIDA', 'CANCELADA']],
          },
        },
        gross_amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        considered_amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        km: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        consumption_km_l: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        fuel_price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        fuel_liters: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        fuel_cost: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        net_amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        profit_per_km: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        cost_per_km: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        notes: DataTypes.TEXT,
      },
      {
        sequelize,
        tableName: 'delivery_routes',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });
  }
}

module.exports = DeliveryRoute;
