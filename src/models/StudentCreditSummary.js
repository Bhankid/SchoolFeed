import { DataTypes, Model } from "sequelize";
import db from "../config/database.js";
import Payment from "./Payment.js";
import Student from "./Student.js";

class StudentCreditSummary extends Model {}

StudentCreditSummary.init(
  {
    // This model does not need to store data in the database,
    // so we don't define any fields here.
  },
  {
    sequelize: db,
    modelName: "StudentCreditSummary",
    tableName: "student_credit_summaries", // Optional: If you want to use a custom table name
  }
);

// Define relationships
Student.hasMany(Payment, { foreignKey: "studentId" });
Payment.belongsTo(Student, { foreignKey: "studentId" });

// Static method to fetch the required data
StudentCreditSummary.fetchCreditSummaries = async () => {
  const summaries = await db.query(
    `
    SELECT 
      s.id AS studentId,
      s.name AS studentName,
      p.paymentType,
      MAX(p.date) AS lastPaymentDate
    FROM 
      Students s
    INNER JOIN 
      Payments p ON s.id = p.studentId
    WHERE 
      p.paymentType = 'Credit'
    GROUP BY 
      s.id, s.name, p.paymentType
    `,
    {
      type: db.QueryTypes.SELECT,
    }
  );

  return summaries;
};

export default StudentCreditSummary;
