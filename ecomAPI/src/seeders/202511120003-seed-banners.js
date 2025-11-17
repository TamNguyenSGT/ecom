'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    await queryInterface.bulkInsert('Banners', [
      {
        description: 'Welcome banner',
        name: 'Home Banner',
        statusId: 'S1',
        image: '',
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Banners', null, {});
  },
};
