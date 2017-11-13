'use strict';
module.exports = (sequelize, DataTypes) => {
  var City = sequelize.define('City', {
    country_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'countries',
        key: 'id'
      }
    },

    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  return City;
};
