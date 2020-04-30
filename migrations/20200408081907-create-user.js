'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {},
      last_name: {},
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      verified: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id'
        },
      },
      location: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Locations',
          key: 'id'
        }
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
    return queryInterface.dropTable('Users');
  }
};