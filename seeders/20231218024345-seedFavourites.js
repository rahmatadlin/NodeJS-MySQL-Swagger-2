"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const favourite = [
      {
        heroId: "1",
        userId: "1",
        role: "-",
        power: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        heroId: "2",
        userId: "2",
        role: "-",
        power: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        heroId: "3",
        userId: "1",
        role: "-",
        power: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Favourites", favourite, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Favourites", null, {});
  },
};
