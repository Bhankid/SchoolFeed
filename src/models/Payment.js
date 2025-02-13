import { DataTypes, Model } from "sequelize";
import db from "../config/database.js";
import Student from './Student.js';

class Payment extends Model {
}

Payment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    paymentType: { type: DataTypes.STRING, allowNull: false },
    paymentMode: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  },
  { sequelize: db, modelName: "Payment" }
);

Payment.belongsTo(Student, { foreignKey: "studentId" });
export default Payment;
