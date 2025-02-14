import express from "express";
const router = express.Router();
import AttendanceReport from "../models/AttendanceReport.js";

// GET /attendance-reports
router.get("/", async (req, res) => {
  try {
    const { class: selectedClass, date: selectedDate } = req.query;

    // Build the query dynamically based on filters
    const whereClause = {};
    if (selectedClass) {
      whereClause.class = selectedClass;
    }
    if (selectedDate) {
      whereClause.date = selectedDate;
    }

    const attendanceReports = await AttendanceReport.findAll({
      attributes: ["id", "studentId", "name", "class", "isPresent", "date"],
      where: whereClause,
    });

    // Transform the data to match the frontend format
    const formattedData = attendanceReports.map((report) => ({
      id: report.id,
      name: report.name,
      class: report.class,
      status: report.isPresent ? "Present" : "Absent",
      date: report.date, // Include the date for reference
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching attendance reports:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
