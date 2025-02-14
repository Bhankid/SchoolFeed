import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./src/config/database.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import attendanceRoutes from "./src/routes/attendanceRoute.js"; 
import attendanceReportRoutes from "./src/routes/attendanceReportRoute.js";
import StudentCreditSummaryRoute from "./src/routes/StudentCreditSummaryRoute.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Default Root Route
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to School Feed API 🚀</h1>
    <p>Use the following endpoints:</p>
    <ul>
      <li><a href="/students">/students</a> - Manage students</li>
      <li><a href="/payments">/payments</a> - Manage payments</li>
      <li><a href="/attendance">/attendance</a> - Manage attendance</li> <!-- Add attendance link -->
    </ul>
  `);
});

// Routes
app.use("/students", studentRoutes);
app.use("/payments", paymentRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/attendance-reports", attendanceReportRoutes);
app.use("/", StudentCreditSummaryRoute);

// Sync Database
db.sync()
  .then(() => {
    console.log("✅ Database connected and synced!");
  })
  .catch((err) => {
    console.error("❌ Database sync error:", err);
  });

const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: \x1b[36m${BASE_URL}\x1b[0m ✅`);
});

export default app;
