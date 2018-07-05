'use strict';
var moment = require('moment');
moment.locale('en')

module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    text: DataTypes.STRING,
    user: DataTypes.INTEGER,
    createdAt: { 
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('LLLL') 
      },
    }
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {foreignKey: 'user', targetKey: 'id'});
  };
  return Post;
};