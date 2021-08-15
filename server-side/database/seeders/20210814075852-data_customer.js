const faker = require('faker');
('use strict');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Customers",
      [
        {
          nama: faker.name.firstName() + " " + faker.name.lastName(),
          contact: faker.phone.phoneNumber(),
          email: faker.internet.email(),
          alamat: faker.address.streetAddress(),
          diskon: 10,
          tipe_diskon: "Persentase",
          ktp: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: faker.name.firstName() + " " + faker.name.lastName(),
          contact: faker.phone.phoneNumber(),
          email: faker.internet.email(),
          alamat: faker.address.streetAddress(),
          diskon: 15000,
          tipe_diskon: "Fix Diskon",
          ktp: faker.image.imageUrl(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Customers", null, {});
  }
};
