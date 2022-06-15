'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
account.belongsTo(models.role,{
  foreignKey: 'roleid',
  onDelete: 'cascade'
})    
}
  };
  account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    roleid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'account',
  });
  return account;
};