module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'chingu_dev',
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'chingu_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
};
