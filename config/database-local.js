module.exports = {
  development: {
    username: 'postgres',
    password: 'nopass',
    database: 'chingu_dev',
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
      underscored: true,
      underscoredAll: true
    }
  },
  test: {
    username: 'root',
    password: null,
    database: 'chingu_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
      underscored: true,
      underscoredAll: true
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
      underscored: true,
      underscoredAll: true
    }
  }
};
