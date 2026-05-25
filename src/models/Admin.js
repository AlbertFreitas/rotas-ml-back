const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class Admin extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          unique: true,
        },
        password_hash: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'admins',
      }
    );

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = Admin;
