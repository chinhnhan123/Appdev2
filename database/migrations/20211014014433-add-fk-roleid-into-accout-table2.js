'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('accounts', {
      fields: ['roleid'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_roleid2',
      references: { //Required field
        table: 'roles',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "accounts",
      "custom_fkey_constraint_roleid2"
    );
  }
};
