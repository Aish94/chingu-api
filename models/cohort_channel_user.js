module.exports = (sequelize, DataTypes) => {
  const CohortChannelUser = sequelize.define('CohortChannelUser', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    cohort_channel_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_channels',
        key: 'id',
      },
    },

    cohort_user_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_users',
        key: 'id',
      },
    },
  });

  CohortChannelUser.associate = (models) => {
    CohortChannelUser.belongsTo(models.CohortChannel);
    CohortChannelUser.belongsTo(models.CohortUser);
    CohortChannelUser.hasMany(models.Metadata, {
      scope: {
        entity_type: 'CohortChannelUser',
      },
      foreignKey: 'entity_id',
      targetKey: 'id',
      constraints: false,
    });
  };

  return CohortChannelUser;
};
