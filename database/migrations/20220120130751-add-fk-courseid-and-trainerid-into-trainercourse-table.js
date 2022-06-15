'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addConstraint('trainercourses', {
        fields: ['trainerid'],
        type: 'foreign key',
        name: 'custom_fkey_constraint_trainerId',
        references: { //Required field
          table: 'Trainers',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),

      await queryInterface.addConstraint('trainercourses', {
        fields: ['courseid'],
        type: 'foreign key',
        name: 'custom_fkey_constraint_courseId',
        references: { //Required field
          table: 'courses',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
    ]
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeConstraint('Trainers', 'custom_fkey_constraint_trainerId'),
      await queryInterface.removeConstraint('courses', 'custom_fkey_constraint_courseId'),
    ]
  }
};
