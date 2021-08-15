'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Sales', 
    'sales_items_id', 
    Sequelize.INTEGER,
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Sales', 'items');
  }
};