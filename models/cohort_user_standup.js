module.exports = (sequelize, DataTypes) => {
  const CohortUserStandup = sequelize.define('CohortUserStandup', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    cohort_user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_users',
        key: 'id',
      },
    },

    cohort_team_standup_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_team_standups',
        key: 'id',
      },

      standup: {
        allowNull: false,
        type: DataTypes.JSONB,
      },
    },
  });

  CohortUserStandup.associate = (models) => {
    CohortUserStandup.belongsTo(models.CohortUser);
    CohortUserStandup.belongsTo(models.CohortTeamStandup);
  };

  return CohortUserStandup;
};
