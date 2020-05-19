'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SchedulePrices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    schedule_type_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'ScheduleTypes',
        key: 'id'
      },
    },
    clinic_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Clinics',
        key: 'id'
      },
    },
    price:DataTypes.FLOAT,
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
    return queryInterface.dropTable('SchedulePrices');
  }
};