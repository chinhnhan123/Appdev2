'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trainingstaff1 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  trainingstaff1.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    address: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'trainingstaff1',
  });
  return trainingstaff1;
};