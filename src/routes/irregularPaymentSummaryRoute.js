import express from "express";
import IrregularPaymentSummary from "../models/IrregularPaymentSummary.js";

const router = express.Router();

// Route to fetch irregular payment summaries
router.get("/irregular-payments", async (req, res) => {
  try {
    const summaries = await IrregularPaymentSummary.fetchIrregularPayments();
    res.status(200).json({
      success: true,
      data: summaries,
    });
  } catch (error) {
    console.error("Error fetching irregular payments:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching irregular payments.",
      error: error.message,
    });
  }
});

export default router;
