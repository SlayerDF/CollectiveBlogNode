'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    text: DataTypes.STRING,
    user: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {foreignKey: 'user', targetKey: 'id'});
  };
  return Post;
};