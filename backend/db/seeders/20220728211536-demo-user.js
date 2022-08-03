'use strict';
const bcrypt = require("bcryptjs");
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
     await queryInterface.bulkInsert('Users', [
      { firstName: 'Jim',
        lastName: 'Green',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      { firstName: 'Mei',
        lastName: 'Han',
        email: 'meihan@user.io',
        username: 'meimeihan',
        hashedPassword: bcrypt.hashSync('password2')
      },
      { firstName: 'Peter',
        lastName: 'Pan',
        email: 'peterpan@user.io',
        username: 'peterpan3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      { firstName: 'Oscar',
        lastName: 'Murhauny',
        email: 'Oscarmurhauny@user.io',
        username: 'oscarmurhany4',
        hashedPassword: bcrypt.hashSync('password3')
      },
      { firstName: 'Anne',
        lastName: 'Brown',
        email: 'annebrown@user.io',
        username: 'annebrown5',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Users',{
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
