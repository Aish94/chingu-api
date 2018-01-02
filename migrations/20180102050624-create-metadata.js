module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('metadata', {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    metadata_schema_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'metadata_schemas',
        key: 'id',
      },
    },

    metadata: {
      allowNull: false,
      type: Sequelize.JSONB,
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

    entity_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
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
  down: queryInterface => queryInterface.dropTable('metadata'),
};
