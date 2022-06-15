'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_catelory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course_catelory.hasMany(models.course, {
        foreignKey: 'coursecategoryid',
        as: 'coursecategoryid'
      })
    }
  };
  course_catelory.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course_catelory',
  });
  return course_catelory;
};