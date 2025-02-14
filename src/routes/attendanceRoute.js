import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

// Record Attendance
router.post("/", async (req, res) => {
  try {
    const { studentId, isPresent } = req.body;

    // Validate required fields
    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // Insert attendance record into the database
    const attendance = await Attendance.create({ studentId, isPresent });

    res.status(201).json({
      message: "Attendance recorded successfully",
      attendance,
    });
  } catch (err) {
    console.error("Error recording attendance:", err);
    res.status(500).json({ message: "Error recording attendance", error: err.message });
  }
});

// Get Attendance Records
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: attendance } = await Attendance.findAndCountAll({
      limit,
      offset,
      include: [{ model: Student, attributes: ["name", "class"] }],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      attendance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;