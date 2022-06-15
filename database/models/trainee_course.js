'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trainee_course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trainee_course.belongsTo(models.trainee, {
        foreignKey: 'traineeid',
        onDelete: 'CASCADE'
      })

      trainee_course.belongsTo(models.course, {
        foreignKey: 'courseid',
        onDelete: 'CASCADE'
      })    }
  };
  trainee_course.init({
    traineeid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    courseid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
    }, {
    sequelize,
    modelName: 'trainee_course',
  });
  return trainee_course;
};