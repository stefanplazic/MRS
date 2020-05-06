'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DoctorAviabilitys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctor_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      day_of_the_week: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      start_time: {
        allowNull: false,
        type: 'TIMESTAMP'
      },
      end_time: {
        allowNull: false,
        type: 'TIMESTAMP'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Date.now()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Date.now()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DoctorAviabilitys');
  }
};