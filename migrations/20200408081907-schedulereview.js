'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ScheduleReviews', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    description: DataTypes.STRING,
    diagnosis: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'DiagnosisLists',
        key: 'id'
      },
    },
    medicalRecord: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'MedicalRecords',
        key: 'id'
      }
    },
    doctor_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
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
    return queryInterface.dropTable('ScheduleReviews');
  }
};