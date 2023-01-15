const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');
const User = require('./user.model');

class UserPassword extends Model {}

UserPassword.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    field: 'is_used',
    defaultValue: false,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'tb_user_password',
  modelName: 'UserPassword'
});

User.hasMany(UserPassword, {
  foreignKey: 'user_id'
});

module.exports = UserPassword;