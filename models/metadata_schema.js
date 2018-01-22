module.exports = (sequelize, DataTypes) => {
  const MetadataSchema = sequelize.define('MetadataSchema', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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

    schema_version: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: '1',
    },

    metadata_structure: {
      allowNull: false,
      type: DataTypes.JSONB,
    },
  });

  MetadataSchema.associate = (models) => {
    MetadataSchema.hasMany(models.Metadata);
  };

  return MetadataSchema;
};
