const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database');

const Admin = require('../models/Admin');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const DeliveryRoute = require('../models/DeliveryRoute');

const sequelize = new Sequelize(databaseConfig);

[Admin, User, Vehicle, DeliveryRoute].forEach((model) => model.init(sequelize));
[Admin, User, Vehicle, DeliveryRoute].forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

module.exports = sequelize;
