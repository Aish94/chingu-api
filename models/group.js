'use strict';
module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    group_owner_id: {
      type: DataTypes.INT,
      allowNull: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',

      /**
       * from reading it seems we should use the hasOne relationship
       * this will put the ownership in the target table rather than here
       * in the Group table
       * 
       * This means a Country will "own" a Country Group and so forth
       * Not sure how to handle this using the "references" field
       */
    },

    group_owner_type: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: [
        'City',
        'Cohort',
        'Country',
        'User'
      ]
    }
  });

  Group.associate = models => {
    Group.hasMany(models.Group_User, {
      foreignKey: {
        allowNull: true
      }
    });

    /**
     * How do we handle the hasOne relationship with multiple potential models?
     * Models: City / Cohort / Country / User
     */
  }

  return Group;
};
