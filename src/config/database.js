import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql", 
    logging: false, 
    pool: {
      max: 5,
      min: 0,
      acquire: 60000, 
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 60000,
    },
  }
);

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connection successful!"))
  .catch((err) => console.error("❌ Database connection error:", err));

export default sequelize;
