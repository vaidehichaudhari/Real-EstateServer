const { DataTypes } = require('sequelize');
const {sequelize} = require('../confiq/db'); // Adjust path to your config
const Property=require('./propertyModel')
const Inquiry= sequelize.define('Inquiry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Name is required" },
    },
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmail: { msg: "Must be a valid email address" },
    },
  },

  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Phone number is required" },
    },
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  propertyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'properties', // Make sure this matches your Property table name
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'inquiries',
  timestamps: true, // createdAt and updatedAt
});
Inquiry.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });

module.exports = Inquiry;
