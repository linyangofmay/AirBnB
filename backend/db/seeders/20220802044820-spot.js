'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '120 Disney Lanee',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.764535945,
        lng: -172.4730328,
        name: "Stripe",
        description: "Place where web developers are created",
        price: 7800
      },
      {
        ownerId: 2,
        address: '125 Disney Lanee',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645359,
        lng: -122.4730328,
        name: "Apple",
        description: "Place where web developers are created",
        price: 780
      },
      {
        ownerId: 3,
        address: '126 Disney Lanee',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.764535978,
        lng: -122.4730328987,
        name: "GOOGLE",
        description: "Place where web developers are created",
        price: 500
      },
      {
        ownerId: 4,
        address: '127 Disney Lanee',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.764535945,
        lng: -122.4730328345,
        name: "Claudia",
        description: "Place where web developers are created",
        price: 1250
      },
      {
        ownerId: 5,
        address: '129 Disney Lanee',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 67.764535,
        lng: -155.49876,
        name: "Abify",
        description: "Place where web developers are created",
        price: 1250
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Spots', null, {});

  }
};
