'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    // Find admin user id if exists
    const [users] = await queryInterface.sequelize.query("SELECT id FROM Users WHERE email = 'admin@gmail.com' LIMIT 1");
    const adminId = users && users.length ? users[0].id : null;
    await queryInterface.bulkInsert('Blogs', [
      {
        shortdescription: 'Welcome to our store',
        title: 'First Blog',
        subjectId: 'SUB1',
        statusId: 'S1',
        image: '',
        contentMarkdown: 'Hello world',
        contentHTML: '<p>Hello world</p>',
        userId: adminId,
        view: 0,
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Blogs', null, {});
  },
};
