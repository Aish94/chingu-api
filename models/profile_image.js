'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile_Image = sequelize.define('Profile_Image', {
    storage_bucket: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },

    /**
     * Same question as Group model. How to handle the hasOne relationship
     * between the Profile_Image and the User table
     */

    path: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    is_processed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      setDefault: false
    }
  });

  Profile_Image.associate = models => {
    Profile_Image.hasOne(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Profile_Image;
};
