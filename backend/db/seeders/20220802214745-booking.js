'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Bookings', [

        {
          spotId: 1,
          userId: 1,
          startDate: '2022-07-21',
          endDate: '2022-09-29'

        },
        {
          spotId: 2,
          userId: 2,
          startDate: '2022-10-21',
          endDate: '2022-10-29'

        },
        {
          spotId: 3,
          userId: 3,
          startDate: '2023-09-21',
          endDate: '2023-09-29'

        },
        {
          spotId: 4,
          userId: 4,
          startDate: '2023-11-21',
          endDate: '2023-11-29'

        },
        {
          spotId: 5,
          userId: 5,
          startDate: '2023-05-21',
          endDate: '2023-06-29'

        },

    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Bookings', null, {});

  }
};
