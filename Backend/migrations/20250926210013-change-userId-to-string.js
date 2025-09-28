'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Bookings', 'userId', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Bookings', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};

