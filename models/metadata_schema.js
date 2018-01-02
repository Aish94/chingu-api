'use strict';
module.exports = (sequelize, DataTypes) => {
  var metadata_schema = sequelize.define('metadata_schema', {
    metadata_schema_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return metadata_schema;
};