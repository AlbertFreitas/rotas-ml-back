const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        firebase_uid: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        role: {
          type: DataTypes.STRING,
          defaultValue: 'user',
        },
      },
      {
        sequelize,
        tableName: 'users',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Vehicle, { foreignKey: 'user_id', as: 'vehicles' });
    this.hasMany(models.DeliveryRoute, { foreignKey: 'user_id', as: 'routes' });
  }
}

module.exports = User;
