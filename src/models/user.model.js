const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

class User extends Model {}

User.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'tb_users',
  modelName: 'User'
});

module.exports = User;