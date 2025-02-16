import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; 

const UserSettings = sequelize.define(
  "UserSettings",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schoolName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePhoto: {
      type: DataTypes.STRING, // Store image URL
      allowNull: true,
    },
    bannerImage: {
      type: DataTypes.STRING, // Store image URL
      allowNull: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default UserSettings;
