'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add startDate column (nullable first)
    await queryInterface.addColumn('Flights', 'startDate', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });

    // Populate existing flights with a default start date
    await queryInterface.bulkUpdate('Flights', 
      { startDate: '2025-10-01' },  // choose a sensible default date
      {}
    );

    // Make startDate non-nullable
    await queryInterface.changeColumn('Flights', 'startDate', {
      type: Sequelize.DATEONLY,
      allowNull: false
    });

    // Add endDate column (optional)
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
