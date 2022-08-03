'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Images', [
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-36775061/original/8116147e-7e3b-4ef8-80ae-34ccfe5d372d.jpeg?im_w=720",
        previewImage:false,
        spotId: 1,
        reviewId: 1,
        userId: 1
      },
      {
        url: "https://a0.muscache.com/im/pictures/1d09b240-4f36-4436-913c-66f8798c1fdf.jpg?im_w=720",
        previewImage:false,
        spotId: 2,
        reviewId: 2,
        userId: 2
      },
      {
        url: "https://a0.muscache.com/im/pictures/6fd12d06-2f04-4c07-bc4d-741b4512226d.jpg?im_w=960",
        previewImage:false,
        spotId: 3,
        reviewId: 3,
        userId: 3
      },
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-651113987974512610/original/efcfb0af-9099-44c9-b355-7121677c8dcd.jpeg?im_w=1200",
        previewImage:false,
        spotId: 4,
        reviewId: 4,
        userId: 4
      },
      {
        url: "https://a0.muscache.com/im/pictures/8bcbc42d-2404-4352-8cb6-a76f0c66adc7.jpg?im_w=1200",
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
