'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    const rows = [
      // Status
      { type: 'STATUS', code: 'S1', value: 'ACTIVE', createdAt: now, updatedAt: now },
      { type: 'STATUS', code: 'S2', value: 'INACTIVE', createdAt: now, updatedAt: now },
      // Roles
      { type: 'ROLE', code: 'R1', value: 'Admin', createdAt: now, updatedAt: now },
      { type: 'ROLE', code: 'R2', value: 'User', createdAt: now, updatedAt: now },
      // Categories
      { type: 'CATEGORY', code: 'C1', value: 'Category 1', createdAt: now, updatedAt: now },
      { type: 'CATEGORY', code: 'C2', value: 'Category 2', createdAt: now, updatedAt: now },
      // Brands
      { type: 'BRAND', code: 'B1', value: 'Brand 1', createdAt: now, updatedAt: now },
      { type: 'BRAND', code: 'B2', value: 'Brand 2', createdAt: now, updatedAt: now },
      // Sizes
      { type: 'SIZE', code: 'S', value: 'Small', createdAt: now, updatedAt: now },
      { type: 'SIZE', code: 'M', value: 'Medium', createdAt: now, updatedAt: now },
      { type: 'SIZE', code: 'L', value: 'Large', createdAt: now, updatedAt: now },
      // Blog subjects
      { type: 'SUBJECT', code: 'SUB1', value: 'General', createdAt: now, updatedAt: now },
    ];
    await queryInterface.bulkInsert('Allcodes', rows, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Allcodes', null, {});
  },
};

