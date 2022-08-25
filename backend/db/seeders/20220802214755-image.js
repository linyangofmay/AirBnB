'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Images', [
      {
        url: "https://images.unsplash.com/photo-1559767949-0faa5c7e9992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 1,
        reviewId: 1,
        userId: 1
      },
      {
        url: "https://images.unsplash.com/photo-1572970385182-97a64c98205b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
        previewImage:false,
        spotId: 2,
        reviewId: 2,
        userId: 2
      },
      {
        url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 3,
        reviewId: 3,
        userId: 3
      },
      {
        url: "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 4,
        reviewId: 4,
        userId: 4
      },
      {
        url: "https://images.unsplash.com/photo-1520446396645-d72d96708bcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 5,
        reviewId: 5,
        userId: 5
      },




    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Images', null, {});

  }
};
