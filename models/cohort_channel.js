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

    channel_type: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['admin', 'team', 'public'],
    },

    is_public: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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

  CohortChannel.associate = (models) => {
    CohortChannel.belongsTo(models.Cohort);
    CohortChannel.hasOne(models.CohortTeam);
    CohortChannel.belongsToMany(models.CohortUser, {
      through: models.CohortChannelUser,
      as: 'Members',
    });
    CohortChannel.hasMany(models.Metadata, {
      scope: {
        entity_type: 'CohortChannel',
      },
      foreignKey: 'entity_id',
      targetKey: 'id',
      constraints: false,
    });
  };

  return CohortChannel;
};
