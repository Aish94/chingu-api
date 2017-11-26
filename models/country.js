module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    group_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'groups',
        key: 'id',
      },
    },

    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
  });

  Country.associate = (models) => {
    Country.hasMany(models.User);
    Country.hasMany(models.City);
    Country.belongsTo(models.Group);
  };

  return Country;
};
