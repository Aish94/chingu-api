module.exports = (sequelize, DataTypes) => {
  const AutoBot = sequelize.define('AutoBot', {
    cohort_id: {
      type: DataTypes.STRING,
      allowNull: true,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id',
      },
    },

    slack_team_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slack_team_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bot_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bot_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  AutoBot.associate = (models) => {
    AutoBot.belongsTo(models.Cohort);
  };

  return AutoBot;
};
