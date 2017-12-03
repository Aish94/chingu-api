module.exports = (sequelize, DataTypes) => {
  const CohortTeamUser = sequelize.define('CohortTeamUser', {
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

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },

    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['project_manager', 'member'],
    },

    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['active', 'removed', 'reassigned'],
      defaultValue: 'active',
    },
  });

  CohortTeamUser.associate = (models) => {
    CohortTeamUser.belongsTo(models.CohortTeam);
    CohortTeamUser.belongsTo(models.User);
  };

  return CohortTeamUser;
};
