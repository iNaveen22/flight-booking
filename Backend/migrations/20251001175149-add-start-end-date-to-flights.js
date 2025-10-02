'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Flights', 'startDate', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });

    await queryInterface.bulkUpdate('Flights', 
      { startDate: '2025-10-01' }, 
      {}
    );

    await queryInterface.changeColumn('Flights', 'startDate', {
      type: Sequelize.DATEONLY,
      allowNull: false
    });

    await queryInterface.addColumn('Flights', 'endDate', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Flights', 'startDate');
    await queryInterface.removeColumn('Flights', 'endDate');
  }
};
