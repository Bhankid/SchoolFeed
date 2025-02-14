import { DataTypes, Model, QueryTypes } from "sequelize";
import db from "../config/database.js";
import Payment from "./Payment.js";
import Student from "./Student.js";

class StudentCreditSummary extends Model {}

StudentCreditSummary.init(
  {},
  {
    sequelize: db,
    modelName: "StudentCreditSummary",
    tableName: "student_credit_summaries",
    timestamps: false, 
  }
);

// Define relationships
Student.hasMany(Payment, { foreignKey: "studentId" });
Payment.belongsTo(Student, { foreignKey: "studentId" });

// Static method to fetch credit summaries
StudentCreditSummary.fetchCreditSummaries = async () => {
  const summaries = await db.query(
    `
    SELECT 
      s.id AS studentId,
      s.name AS studentName,
      s.class AS class,
      SUM(p.amount) AS amount, 
      MAX(p.date) AS lastPaymentDate
    FROM 
      Students s
    INNER JOIN 
      Payments p ON s.id = p.studentId
    WHERE 
      p.paymentType = 'Credit'
    GROUP BY 
      s.id, s.name, s.class
    `,
    {
      type: QueryTypes.SELECT,
    }
  );

  return summaries.map((summary) => ({
    studentId: summary.studentId,
    studentName: summary.studentName,
    class: summary.class,
    amount: `₵${summary.amount.toFixed(2)}`, 
    lastPayment: summary.lastPaymentDate || "N/A",
  }));
};

export default StudentCreditSummary;
