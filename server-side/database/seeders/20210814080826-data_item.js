const faker = require('faker');
('use strict');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          nama_item: "Tepung Terigu",
          unit: "kg",
          stok: "100",
          harga_satuan: 12000,
          image_barang: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_item: "Shampoo",
          unit: "pcs",
          stok: "50",
          harga_satuan: 20000,
          image_barang: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_item: "Gula Pasir",
          unit: "kg",
          stok: "50",
          harga_satuan: 15000,
          image_barang: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_item: "Sabun",
          unit: "pcs",
          stok: "100",
          harga_satuan: 5000,
          image_barang: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Items", null, {});
  }
};
