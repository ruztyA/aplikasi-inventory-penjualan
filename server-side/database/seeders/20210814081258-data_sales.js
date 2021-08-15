const faker = require('faker');
('use strict');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Sales",
      [
        {
          code_transaksi: faker.datatype.uuid(),
          tanggal_transaksi: faker.date.recent(),
          customer_id: 1,
          items: ["{ product: shampoo, quantity: 10 }"],
          // qty: 10,
          total_diskon: 12000,
          total_harga: 120000,
          total_bayar: 108000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Sales", null, {});
 
  }
};
