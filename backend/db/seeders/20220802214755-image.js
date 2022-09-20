'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Images', [
      {
        url: "https://images.unsplash.com/photo-1631528858266-5ebeb8bfc6f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1260&q=80",
        previewImage:false,
        spotId: 1,
        reviewId: 1,
        userId: 1
      },
      {
        url: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80",
        previewImage:false,
        spotId: 1,
        reviewId: 1,
        userId: 1
      },
      {
        url: "https://images.unsplash.com/photo-1588611075511-7eaa5456693c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
        previewImage:false,
        spotId: 1,
        reviewId: 1,
        userId: 1
      },
      {
        url: "https://images.unsplash.com/photo-1592059740567-fe4c6834d559?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80",
        previewImage:false,
        spotId: 1,
        reviewId: 1,
        userId: 1
      },
      {
        url: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        previewImage:false,
        spotId: 1,
        reviewId: 1,
        userId: 1
      },

      {
        url: "https://images.unsplash.com/photo-1616038242814-a6eac7845d88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        previewImage:false,
        spotId: 2,
        reviewId: 2,
        userId: 2
      },
      {
        url: "https://images.unsplash.com/photo-1572970385182-97a64c98205b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
        previewImage:false,
        spotId: 2,
        reviewId: 2,
        userId: 2
      },
      {
        url: "https://images.unsplash.com/photo-1572970385182-97a64c98205b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
        previewImage:false,
        spotId: 2,
        reviewId: 2,
        userId: 2
      },
      {
        url: "https://images.unsplash.com/photo-1572970385182-97a64c98205b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
        previewImage:false,
        spotId: 2,
        reviewId: 2,
        userId: 2
      },
      {
        url: "https://images.unsplash.com/photo-1572970385182-97a64c98205b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
        previewImage:false,
        spotId: 2,
        reviewId: 2,
        userId: 2
      },
      {
        url: "https://images.unsplash.com/photo-1601585837217-3148ff17cd0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        previewImage:false,
        spotId: 3,
        reviewId: 3,
        userId: 3
      },
      {
        url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 3,
        reviewId: 3,
        userId: 3
      },
      {
        url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 3,
        reviewId: 3,
        userId: 3
      },
      {
        url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 3,
        reviewId: 3,
        userId: 3
      },
      {
        url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 3,
        reviewId: 3,
        userId: 3
      },
      {
        url:"https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 4,
        reviewId: 4,
        userId: 4
      },
      {
        url: "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 4,
        reviewId: 4,
        userId: 4
      },
      {
        url: "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 4,
        reviewId: 4,
        userId: 4
      },
      {
        url: "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 4,
        reviewId: 4,
        userId: 4
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
      {
        url: "https://images.unsplash.com/photo-1520446396645-d72d96708bcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 5,
        reviewId: 5,
        userId: 5
      },
      {
        url: "https://images.unsplash.com/photo-1520446396645-d72d96708bcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 5,
        reviewId: 5,
        userId: 5
      },
      {
        url: "https://images.unsplash.com/photo-1520446396645-d72d96708bcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 5,
        reviewId: 5,
        userId: 5
      },
      {
        url: "https://images.unsplash.com/photo-1520446396645-d72d96708bcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 5,
        reviewId: 5,
        userId: 5
      },
      {
        url: "https://images.unsplash.com/photo-1543429853-e028e42251c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        previewImage:false,
        spotId: 6,
        reviewId: 5,
        userId: 5
      },
      {
        url: "https://images.unsplash.com/photo-1520446396645-d72d96708bcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 6,
        reviewId: 5,
        userId: 5
      },
      {
        url: "https://images.unsplash.com/photo-1520446396645-d72d96708bcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 6,
        reviewId: 5,
        userId: 5
      },
      {
        url: "https://images.unsplash.com/photo-1520446396645-d72d96708bcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 6,
        reviewId: 5,
        userId: 5
      },
      {
        url: "https://images.unsplash.com/photo-1520446396645-d72d96708bcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        previewImage:false,
        spotId: 6,
        reviewId: 5,
        userId: 5
      },




    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Images', null, {});

  }
};
