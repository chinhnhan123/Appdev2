'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trainercourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trainercourse.belongsTo(models.Trainer, {
        foreignKey: 'trainerid',
        onDelete: 'CASCADE'
      })

      trainercourse.belongsTo(models.course, {
        foreignKey: 'courseid',
        onDelete: 'CASCADE'
      })
    }
  };
  trainercourse.init({
    trainerid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    courseid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'trainercourse',
  });
  return trainercourse;
};