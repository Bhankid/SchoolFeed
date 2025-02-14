import express from "express";
const router = express.Router();
import Student from "../models/Student.js";

// Add Student
router.post("/", async (req, res) => {
  try {
    // Validate required fields
    const { name, class: className, paymentType } = req.body;

    if (!name || !className || !paymentType) {
      return res.status(400).json({
        error: "Name, class, and payment type are required",
      });
    }

    // Validate payment type
    const validPaymentTypes = ["Regular", "Advance", "Irregular", "Credit"];
    if (!validPaymentTypes.includes(paymentType)) {
      return res.status(400).json({
        error: "Invalid payment type",
      });
    }

    // Add current date as lastMeal
    const studentData = {
      ...req.body,
      lastMeal: new Date().toISOString(),
    };

    const student = await Student.create(studentData);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Students
router.get("/", async (req, res) => {
  try {
    // Ensure page and limit are valid numbers
    const page = Number(req.query.page) > 0 ? parseInt(req.query.page, 10) : 1;
    const limit = Number(req.query.limit) > 0 ? parseInt(req.query.limit, 10) : 10;
    const offset = (page - 1) * limit;

    // Fetch students with pagination
    const { count, rows: students } = await Student.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    // Ensure totalPages is at least 1
    const totalPages = Math.max(Math.ceil(count / limit), 1);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page > totalPages ? totalPages : page, // Prevent invalid page numbers
      students,
    });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Unique Classes
router.get("/classes", async (req, res) => {
  try {
    const classes = await Student.findAll({
      attributes: ["class"],
      group: ["class"],
      order: [["class", "ASC"]],
    });
    res.json(classes.map((c) => c.class)); // Return an array of class names
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Students by Class
router.get("/by-class/:className", async (req, res) => {
  try {
    const students = await Student.findAll({
      where: { class: req.params.className },
      order: [["name", "ASC"]],
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Total Number of Students
router.get("/total", async (req, res) => {
  try {
    const totalStudents = await Student.count();
    res.json({ total: totalStudents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;

