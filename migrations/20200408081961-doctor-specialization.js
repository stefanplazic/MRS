'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DoctorSpecializations', {
      doctor_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      specialization_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Specializations',
          key: 'id'
        },
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
    return queryInterface.dropTable('DoctorSpecializations');
  }
};