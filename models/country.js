'use strict';
module.exports = (sequelize, DataTypes) => {
  var Country = sequelize.define('Country', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  return Country;
};
