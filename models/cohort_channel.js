module.exports = (sequelize, DataTypes) => {
  const CohortChannel = sequelize.define('CohortChannel', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    cohort_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id',
      },
    },

    slack_channel_id: {
      allowNull: true,
      type: DataTypes.STRING,
    },

    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },

    last_slack_scrape_ts: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  });

  // converts channel title to slack format for channel creation on a Slack team
  CohortChannel.prototype.formatSlackTitle = function () {
    return this.title.toLowerCase().replace(' ', '-');
  };

  CohortChannel.associate = ({ Cohort, CohortTeam }) => {
    CohortChannel.belongsTo(Cohort);
    CohortChannel.hasOne(CohortTeam);
  };

  return CohortChannel;
};
