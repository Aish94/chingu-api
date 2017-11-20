module.exports = (sequelize, DataTypes) => {
  const Cohort = sequelize.define('Cohort', {
    group_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'groups',
        key: 'id',
      },
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM,
      values: [
        'registration_open',
        'registration_closed',
        'users_accepted',
        'tiers_assigned',
        'teams_assigned',
        'ongoing',
        'ended',
      ],
      allowNull: true,
      defaultValue: null,
    },

    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Cohort.associate = (models) => {
    Cohort.belongsToMany(models.Tier, { through: models.CohortTier });
    Cohort.belongsToMany(models.User, { through: models.CohortUser });
    Cohort.hasMany(models.CohortTeam, { as: 'Teams' });
    Cohort.belongsTo(models.Group);
  };

  return Cohort;
};
