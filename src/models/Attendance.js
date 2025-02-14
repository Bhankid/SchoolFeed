import { DataTypes, Model } from "sequelize";
import db from "../config/database.js";
import Student from "./Student.js";

class Attendance extends Model {}
Attendance.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Student, key: "id" },
    },
    isPresent: { type: DataTypes.BOOLEAN, allowNull: false },
    date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize: db, modelName: "Attendance", tableName: "attendance" }
);

// Establish relation with Student
Attendance.belongsTo(Student, { foreignKey: "studentId", onDelete: "CASCADE" });

export default Attendance;
