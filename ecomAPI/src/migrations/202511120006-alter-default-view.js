'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableExists = async (name) => {
      try {
        await queryInterface.describeTable(name);
        return true;
      } catch (e) {
        return false;
      }
    };

    if (await tableExists('Products')) {
      await queryInterface.sequelize.query('UPDATE Products SET view = 0 WHERE view IS NULL');
      await queryInterface.changeColumn('Products', 'view', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      });
    }

    if (await tableExists('Blogs')) {
      await queryInterface.sequelize.query('UPDATE Blogs SET view = 0 WHERE view IS NULL');
      await queryInterface.changeColumn('Blogs', 'view', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableExists = async (name) => {
      try {
        await queryInterface.describeTable(name);
        return true;
      } catch (e) {
        return false;
      }
    };

    if (await tableExists('Products')) {
      await queryInterface.changeColumn('Products', 'view', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      });
    }

    if (await tableExists('Blogs')) {
      await queryInterface.changeColumn('Blogs', 'view', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      });
    }
  },
};
