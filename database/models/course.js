'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    static associate(models) {
      // define association here
      course.belongsTo(models.course_catelory,{
        foreignKey: 'coursecategoryid',
        onDelete: 'cascade'
      })

      course.hasMany(models.trainercourse, {
        foreignKey: 'courseid',
        as: 'courseid'
      })

    }
  };
  course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    coursecategoryid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};