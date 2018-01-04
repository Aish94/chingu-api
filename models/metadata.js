module.exports = (sequelize, DataTypes) => {
  const Metadata = sequelize.define('Metadata', {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    metadata_schema_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'metadata_schemas',
        key: 'id',
      },
    },

    metadata: {
      allowNull: false,
      type: DataTypes.JSONB,
    },

    metadata_source: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: [
        'slack',
        'github',
      ],
    },

    entity_type: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: [
        'CohortUser',
        'CohortChannel',
        'CohortChannelUser',
        'CohortTeam',
      ],
    },

    entity_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },

  });

  Metadata.associate = (models) => {
    Metadata.belongsTo(models.MetadataSchema);
    // one to many?
    Metadata.hasMany(models.CohortUser);
    Metadata.hasMany(models.CohortTeam);
    // Metadata.hasMany(models.CohortChannelUser);
    // Metadata.hasMany(models.CohortChannel);
    // Metadata.hasMany(models.Project);
  };

  return Metadata;
};
