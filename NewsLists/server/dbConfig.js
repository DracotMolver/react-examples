const dbConfig = {
  dbName: process.env.NODE_ENV === 'production'
    ? process.env.DB_NAME
    : process.env.DB_NAME_DEV,
  dbHost: process.env.NODE_ENV === 'production'
    ? process.env.DB_HOST
    : process.env.DB_HOST_DEV
};

module.exports = dbConfig;
