module.exports = (sequelize, DataTypes) => {
  const Autobot = sequelize.define('Autobot', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    cohort_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id',
      },
    },

    slack_team_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    slack_team_token: {
      type: DataTypes.STRING,
      unique: true,
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

  Autobot.associate = (models) => {
    Autobot.belongsTo(models.Cohort);
  };

  return Autobot;
};
