module.exports = (sequelize, DataTypes) => {
  const CohortTeamStandup = sequelize.define('CohortTeamStandup', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    cohort_team_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_teams',
        key: 'id',
      },
    },
  });

  CohortTeamStandup.associate = (models) => {
    CohortTeamStandup.belongsTo(models.CohortTeam);
  };

  return CohortTeamStandup;
};
