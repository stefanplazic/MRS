'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ClinicGrades', {
    clinic_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Clinics',
        key: 'id'
      },
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    grade: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
    return queryInterface.dropTable('ClinicGrades');
  }
};