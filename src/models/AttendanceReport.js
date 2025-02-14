import { DataTypes, Model } from "sequelize";
import db from "../config/database.js";
import Student from "./Student.js";

class AttendanceReport extends Model {}

AttendanceReport.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "students",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    class: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isPresent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "AttendanceReport",
    tableName: "attendance_reports",
    timestamps: true,
  }
);

// Define relationship with the Student model (optional, if needed elsewhere)
AttendanceReport.belongsTo(Student, {
  foreignKey: "studentId",
  onDelete: "CASCADE",
});

export default AttendanceReport;
