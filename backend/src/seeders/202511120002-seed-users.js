'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    const passwordHash = await bcrypt.hash('admin123', 10);
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password: passwordHash,
        firstName: 'Admin',
        lastName: 'User',
        address: 'N/A',
        genderId: 'M',
        phonenumber: '0000000000',
        image: '',
        dob: '1990-01-01',
        isActiveEmail: true,
        roleId: 'R1',
        statusId: 'S1',
        usertoken: null,
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { email: 'admin@gmail.com' }, {});
  },
};
