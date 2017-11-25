module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    group_type: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ['City', 'Cohort', 'Country'],
    },
  });

  Group.associate = (models) => {
    Group.belongsToMany(models.User, { through: models.GroupUser });
    Group.hasOne(models.City);
    Group.hasOne(models.Country);
    Group.hasOne(models.Cohort);
  };

  return Group;
};
