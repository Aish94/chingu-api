const { randomBytes } = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const Wizard = sequelize.define('Wizard', {
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

    bot_secret: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  Wizard.prototype.generateSecret = function generateSecret() {
    return new Promise((resolve, reject) => {
      randomBytes(48, (err, buffer) => {
        if (err) reject(err);
        this.bot_secret = buffer.toString('hex');
        resolve();
      });
    });
  };

  Wizard.associate = (models) => {
    Wizard.belongsTo(models.Cohort);
  };

  return Wizard;
};
