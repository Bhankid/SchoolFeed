import { DataTypes, Model, QueryTypes } from "sequelize";
import db from "../config/database.js";
import Student from "./Student.js";
import Payment from "./Payment.js";

class IrregularPaymentSummary extends Model {}

IrregularPaymentSummary.init(
  {},
  {
    sequelize: db,
    modelName: "IrregularPaymentSummary",
    tableName: "irregular_payment_summaries",
    timestamps: false, // No actual table is created
  }
);

// Define relationships
Student.hasMany(Payment, { foreignKey: "studentId" });
Payment.belongsTo(Student, { foreignKey: "studentId" });

// Static method to fetch irregular payment summaries
IrregularPaymentSummary.fetchIrregularPayments = async () => {
  const summaries = await db.query(
    `
    SELECT 
      s.id AS studentId,
      s.name AS studentName,
      s.class AS class,
      s.balance AS balance, 
      s.lastMeal AS lastMealDate
    FROM 
      students s
    WHERE 
      s.paymentType = 'Irregular'
    `,
    {
      type: QueryTypes.SELECT,
    }
  );

  // Format the data for consistency
  return summaries.map((summary) => ({
    studentId: summary.studentId,
    studentName: summary.studentName,
    class: summary.class,
    balance: `₵${parseFloat(summary.balance).toFixed(2)}`, 
    lastMeal: summary.lastMealDate
      ? new Date(summary.lastMealDate).toISOString().split("T")[0]
      : "N/A", // Format date or use "N/A"
  }));
};

export default IrregularPaymentSummary;
