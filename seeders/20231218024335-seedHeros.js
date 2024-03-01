"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hero = [
      {
        name: "Paquito",
        type: "Fighter",
        imageUrl:
          "https://img.mobilelegends.com/group1/M00/00/B2/Cq2IxmAKtDOAe9QQAAIoQFvuZwA933.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Barats",
        type: "Tank",
        imageUrl:
          "https://img.mobilelegends.com/group1/M00/00/AB/Cq2Ixl-_iUCAQOs3AALNya38dwM674.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Yu Zhong",
        type: "Fighter",
        imageUrl:
          "https://img.mobilelegends.com/group1/M00/00/A8/Cq2Ixl8MDzOAYTdJAAGJKaZhxlA426.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Luo Yi",
        type: "Mage",
        imageUrl:
          "https://img.mobilelegends.com/group1/M00/00/A7/Cq2Ixl7shFWAJ73nAAF5owmcBqA347.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Brody",
        type: "Marksman",
        imageUrl:
          "https://img.mobilelegends.com/group1/M00/00/AA/Cq2Ixl-ZJ0mAadnRAAhy874yrX4103.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mathilda",
        type: "Support",
        imageUrl:
          "https://img.mobilelegends.com/group1/M00/00/AB/Cq2Ixl_0Rb-ASjG-AAHxmroqeZo017.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Khaleed",
        type: "Fighter",
        imageUrl:
          "https://img.mobilelegends.com/group1/M00/00/A8/Cq2Ixl9pXlyAVn9EAACpsT8Kzhw458.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Heros", hero, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Heros", null, {});
  },
};
