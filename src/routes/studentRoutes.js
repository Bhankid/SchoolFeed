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
    const students = await Student.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

