'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1️⃣ Add startDate column (nullable first)
    await queryInterface.addColumn('Flights', 'startDate', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });

    // 2️⃣ Populate existing rows with a default date
    await queryInterface.bulkUpdate('Flights', 
      { startDate: '2025-10-01' },  // change this to the correct starting date
      {}
    );

    // 3️⃣ Make startDate non-nullable now
    await queryInterface.changeColumn('Flights', 'startDate', {
      type: Sequelize.DATEONLY,
      allowNull: false
    });

    // 4️⃣ Add endDate column (optional)
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
