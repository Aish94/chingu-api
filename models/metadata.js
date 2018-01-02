module.exports = (sequelize, DataTypes) => {
  const Metadata = sequelize.define('Metadata', {
    metadata_schema_id: DataTypes.INTEGER,
  });

  return Metadata;
};
