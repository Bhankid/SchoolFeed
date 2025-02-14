import express from "express";
import StudentCreditSummary from "../models/StudentCreditSummary.js";

const router = express.Router();

// Route to fetch credit summaries
router.get("/credit-summaries", async (req, res) => {
  try {
    // Fetch credit summaries using the static method
    const summaries = await StudentCreditSummary.fetchCreditSummaries();

    // Send the summaries as a JSON response
    res.status(200).json({
      success: true,
      data: summaries,
    });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error("Error fetching credit summaries:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching credit summaries.",
      error: error.message,
    });
  }
});

export default router;
