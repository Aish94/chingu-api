module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('metadata_schemas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      metadata_source: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: [
          'slack',
          'github',
        ],
      },

      entity_type: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: [
          'CohortUser',
          'CohortChannel',
          'CohortChannelUser',
          'CohortTeam',
        ],
      },

      schema_version: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      metadata_structure: {
        allowNull: false,
        type: Sequelize.JSONB,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('metadata_schemas'),
};
