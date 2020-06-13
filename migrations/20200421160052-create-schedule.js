'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patienId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      scheduleType: {
        type: Sequelize.STRING
      },
      doctorId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      start_timestamp: {
        type: Sequelize.DATE
      },
      end_timestamp: {
        type: Sequelize.DATE
      },
      roomId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id'
        },
      },
      price: {
      allowNull: false,
      type: DataTypes.FLOAT,
     defaultValue:0
    },
    discount: {
      allowNull: false,
      type: DataTypes.FLOAT,
      defaultValue:0
    },
      reserved: DataTypes.BOOLEAN,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Schedules');
  }
};