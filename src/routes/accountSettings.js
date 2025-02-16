import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import UserSettings from "../models/UserSettings.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "./uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// GET user settings
router.get("/", async (req, res) => {
  try {
    const userSettings = await UserSettings.findOne();
    if (!userSettings) {
      return res.status(404).json({ error: "No user settings found" });
    }
    res.status(200).json(userSettings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST save account settings
router.post(
  "/",
  upload.fields([{ name: "profilePhoto" }, { name: "bannerImage" }]),
  async (req, res) => {
    try {
      const {
        username,
        userRole,
        schoolName,
        location,
        existingProfilePhoto,
        existingBannerImage,
      } = req.body;

      const profilePhoto = req.files["profilePhoto"]
        ? `/uploads/${req.files["profilePhoto"][0].filename}`
        : existingProfilePhoto || null;

      const bannerImage = req.files["bannerImage"]
        ? `/uploads/${req.files["bannerImage"][0].filename}`
        : existingBannerImage || null;

      const userSettings = await UserSettings.create({
        username,
        userRole,
        schoolName,
        location,
        profilePhoto,
        bannerImage,
      });

      res.status(201).json({
        message: "Settings saved successfully!",
        data: userSettings,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
