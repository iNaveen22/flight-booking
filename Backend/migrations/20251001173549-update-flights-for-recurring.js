'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Change departureTime and arrivalTime to TIME
    await queryInterface.changeColumn('Flights', 'departureTime', {
      type: Sequelize.TIME,
      allowNull: false
    });

    await queryInterface.changeColumn('Flights', 'arrivalTime', {
      type: Sequelize.TIME,
      allowNull: false
    });

    // Add recurrence column
    await queryInterface.addColumn('Flights', 'recurrence', {
      type: Sequelize.ENUM('DAILY', 'WEEKLY', 'ONCE'),
      allowNull: false,
      defaultValue: 'ONCE'
    });

    // Add startDate column (nullable first)
    await queryInterface.addColumn('Flights', 'startDate', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });

    // Populate existing rows with a default date (today or a specific date)
    await queryInterface.bulkUpdate('Flights', 
      { startDate: '2025-10-01' },  // change this to the date your flights originally start
      {}
    );

    // Alter column to not allow null now
    await queryInterface.changeColumn('Flights', 'startDate', {
      type: Sequelize.DATEONLY,
      allowNull: false
    });

    // Add endDate column (nullable)
    await queryInterface.addColumn('Flights', 'endDate', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert back to old columns
    await queryInterface.changeColumn('Flights', 'departureTime', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.changeColumn('Flights', 'arrivalTime', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.removeColumn('Flights', 'recurrence');
    await queryInterface.removeColumn('Flights', 'startDate');
    await queryInterface.removeColumn('Flights', 'endDate');

    // Drop ENUM type manually if using MySQL
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS `enum_Flights_recurrence`;');
  }
};
