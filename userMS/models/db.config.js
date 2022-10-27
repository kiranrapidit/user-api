const { Sequelize, Op, Model, DataTypes } = require("Sequelize");
const config = require("../config")[env]
const log = require("../logger/logger")

const sequelize = new Sequelize(config.SQl.DB, config.SQl.USER, config.SQl.PASSWORD, {
    host: config.SQl.HOST,
    dialect: config.SQl.dialect,
    pool: {
        max: config.SQl.pool.max,
        min: config.SQl.pool.min,
        acquire: config.SQl.pool.acquire,
        idle: config.SQl.pool.idle
    }
});

sequelize.authenticate().then(() => {
    log.info('Connection has been established successfully.');
 }).catch((error) => {
    log.info('Unable to connect to the database: ', error);
 });

 const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require("./books.model")(sequelize, Sequelize);

db.users = require("./users.model")(sequelize, Sequelize);

 

module.exports = db;



