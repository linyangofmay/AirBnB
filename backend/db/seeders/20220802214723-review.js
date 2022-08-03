'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Reviews', [
      { review: 'We really enjoyed the house - it was cozy, well equipped, had character, and was convenient to the national park.',
        stars: 4,
        userId: 1,
        spotId: 1
      },
      { review: "Gorgeous setting, very cozy and the grounds are very well manicured. We’d love to come back!",
        stars: 5,
        userId: 2,
        spotId: 2
      },
      {
      review: "Great location and lovely house.",
      stars: 4,
      userId: 3,
      spotId: 3

      },
      {
      review: "The cabin was lovely and well stocked, with a great outdoor hot tub! ",
      stars: 5,
      userId: 4,
      spotId: 4

      },
      {
      review: "Great space! Perfect for relaxing with the family.",
      stars: 5,
      userId: 5,
      spotId: 5

      },





    ], {});

  },

  async down (queryInterface, Sequelize) {


     await queryInterface.bulkDelete('Reviews', null, {});

  }
};
