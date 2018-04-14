var configs = {};
configs.applicationPort = 3000;
configs.dbName = process.env.DB_NAME;
configs.dbHost = process.env.DB_HOST;

module.exports = configs;