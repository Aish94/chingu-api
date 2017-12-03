module.exports = (sequelize, DataTypes) => {
  const CohortTeamCohortUser = sequelize.define('CohortTeamCohortUser', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    cohort_team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_teams',
        key: 'id',
      },
    },

    cohort_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_users',
        key: 'id',
      },
    },

    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['active', 'removed', 'reassigned'],
      defaultValue: 'active',
    },

    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['project_manager', 'member'],
    },
  });

  CohortTeamCohortUser.associate = (models) => {
    CohortTeamCohortUser.belongsTo(models.CohortTeam);
    CohortTeamCohortUser.belongsTo(models.CohortUser);
  };

  return CohortTeamCohortUser;
};
