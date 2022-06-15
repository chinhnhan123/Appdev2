'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     queryInterface.addConstraint('accounts', {
      fields: ['username'],
      type: 'unique',
      name: 'custom_unique_constraint_name1'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "accounts",
      "custom_unique_constraint_name1"
    );
  }
};
