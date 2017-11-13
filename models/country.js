'use strict';
module.exports = (sequelize, DataTypes) => {
  var Country = sequelize.define('Country', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });

  Country.associate = models => {
    Country.hasMany(models.User);
    Country.hasMany(models.City);
  };

  return Country;
};
