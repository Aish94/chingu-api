'use strict';
module.exports = (sequelize, DataTypes) => {
  var Country = sequelize.define('Country', {
    group_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'groups',
        key: 'id'
      }
    },

    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });

  Country.associate = models => {
    Country.hasMany(models.User);
    Country.hasMany(models.City);
    Country.belongsTo(models.Group); // logically flipped
  };

  return Country;
};
