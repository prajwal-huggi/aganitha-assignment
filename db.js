const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    dialect: "postgres",
    logging: false,

    // REQUIRED for Neon
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },

    // REQUIRED for Vercel (serverless)
    pool: {
      max: 1,
      min: 0,
      idle: 10000,
      acquire: 30000
    }
  }
);

module.exports = sequelize;
