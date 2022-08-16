const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
    "themoviedb",
    "postgres",
    "toor",
    {
        dialect: "postgres",
        host:"localhost",
        pool:{
            //pool:false if not needed
            max: 5,
            min:0,
            acquire: 30000,
            idle: 10000,
        }
    }
)

module.exports = sequelize;