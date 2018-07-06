'use strict';

var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 10));
      }
    },
    admin: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Post, {foreignKey: 'user', sourceKey: 'id'});
  };
  User.prototype.checkPassword = async function(val) {
    return await bcrypt.compare(val, this.password)
  };
  return User;
};