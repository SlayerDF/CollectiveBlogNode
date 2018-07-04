'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    description: DataTypes.STRING,
    text: DataTypes.STRING,
    user: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {foreignKey: 'user', targetKey: 'id'});
  };
  return Post;
};