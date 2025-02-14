import express from "express";
const router = express.Router();
import Payment from "../models/Payment.js";
import Student from "../models/Student.js";
import { Op } from "sequelize"; 

// Record Payment
router.post("/", async (req, res) => {
  try {
    const { studentId, amount, paymentType, paymentMode, date } = req.body;
    // Validate required fields
    if (!studentId || !amount || !paymentType || !paymentMode || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Insert payment record into the database
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    console.error("Error recording payment:", err);
    res
      .status(500)
      .json({ message: "Error recording payment", error: err.message });
  }
});

// Get All Payments with Pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { count, rows: payments } = await Payment.findAndCountAll({
      limit,
      offset,
      include: [{ model: Student, attributes: ["name"] }],
    });
    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      payments: payments.map((payment) => ({
        id: payment.id,
        studentId: payment.studentId,
        amount: payment.amount,
        balance: payment.balance,
        date: payment.date,
        paymentType: payment.paymentType,
        paymentMode: payment.paymentMode,
        Student: payment.Student,
      })),
    });
  } catch (err) {
    console.error("Error fetching payments:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Total Payments for Today
router.get("/today-total", async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

    const totalPayments = await Payment.sum("amount", {
      where: {
        date: {
          [Op.between]: [startOfDay, endOfDay], 
        },
      },
    });

    res.json({ total: totalPayments || 0 }); 
  } catch (err) {
    console.error("Error fetching today's total payments:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Monthly Revenue
router.get('/monthly-revenue', async (req, res) => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString(); 
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString(); 

    const monthlyRevenue = await Payment.sum('amount', {
      where: {
        date: {
          [Op.between]: [firstDayOfMonth, lastDayOfMonth], 
        },
      },
    });

    res.json({ total: monthlyRevenue || 0 }); 
  } catch (err) {
    console.error("Error fetching monthly revenue:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
