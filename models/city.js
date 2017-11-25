module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    group_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'groups',
        key: 'id',
      },
    },

    country_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'countries',
        key: 'id',
      },
    },

    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  City.associate = (models) => {
    City.belongsTo(models.Group);
    City.belongsTo(models.Country);
    City.hasMany(models.User);
  };

  return City;
};
