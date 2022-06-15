'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addConstraint('trainee_courses', {
        fields: ['traineeid'],
        type: 'foreign key',
        name: 'custom_fkey_constraint_traineeid',
        references: { //Required field
          table: 'trainees',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),

      await queryInterface.addConstraint('trainee_courses', {
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
      await queryInterface.removeConstraint('trainees', 'custom_fkey_constraint_traineeid'),
      await queryInterface.removeConstraint('courses', 'custom_fkey_constraint_courseId'),
    ]
  }
};
