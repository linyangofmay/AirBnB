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
        description: "Absolutely beautiful stay at this space!! ",
        price: 7800,
        imageurl:"https://images.unsplash.com/photo-1631528858266-5ebeb8bfc6f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1260&q=80",
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
        description: "Absolutely beautiful stay at this space!! ",
        price: 780,
        imageurl:"https://images.unsplash.com/photo-1616038242814-a6eac7845d88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

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
        description: "Absolutely beautiful stay at this space!! ",
        price: 500,
        imageurl: "https://images.unsplash.com/photo-1601585837217-3148ff17cd0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
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
        description: "Absolutely beautiful stay at this space!! ",
        price: 1250,
        imageurl:"https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
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
        description: "Absolutely beautiful stay at this space!! ",
        price: 1250,
        imageurl:"https://images.unsplash.com/photo-1520446396645-d72d96708bcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Spots', null, {});

  }
};
