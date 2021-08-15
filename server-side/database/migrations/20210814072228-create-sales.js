'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code_transaksi: {
        type: Sequelize.STRING
      },
      tanggal_transaksi: {
        type: Sequelize.DATE
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Customers",
          key: "id"
        }
      },
      sales_items_id: {
        type: Sequelize.INTEGER,
      },
      total_quantity: {
        type: Sequelize.STRING,
      },
      total_diskon: {
        type: Sequelize.INTEGER
      },
      total_harga: {
        type: Sequelize.INTEGER
      },
      total_bayar: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sales');
  }
};