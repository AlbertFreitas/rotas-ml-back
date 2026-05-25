const { Model, DataTypes } = require('sequelize');

class Vehicle extends Model {
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
        name: {
          type: DataTypes.STRING,
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
        is_default: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: 'vehicles',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasMany(models.DeliveryRoute, { foreignKey: 'vehicle_id', as: 'routes' });
  }
}

module.exports = Vehicle;
