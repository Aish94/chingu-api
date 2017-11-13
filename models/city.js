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

  City.associate = models => {
    City.belongsTo(models.Country, {
      foreignKey: {
        allowNull: false
      }
    });
    City.hasMany(models.User);
  };

  return City;
};
