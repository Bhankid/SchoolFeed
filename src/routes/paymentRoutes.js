import express from 'express';
const router = express.Router();
import Payment from '../models/Payment.js';
import Student from '../models/Student.js'; 

// Record Payment
router.post('/', async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Payments with Pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

    const offset = (page - 1) * limit;

    const { count, rows: payments } = await Payment.findAndCountAll({
      limit,
      offset,
      include: [{ model: Student, attributes: ['name'] }], 
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

export default router;