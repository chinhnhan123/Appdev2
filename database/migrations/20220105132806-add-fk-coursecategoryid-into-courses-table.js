'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('courses', {
      fields: ['coursecategoryid'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_coursecategoryid',
      references: { //Required field
        table: 'course_catelories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('courses','custom_fkey_constraint_coursecategoryid' );
  }
};
