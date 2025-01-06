const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Configure Multer to save files in a specific folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Directory to save files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

app.post("/upload-audio", upload.single("audio"), (req, res) => {
  try {
    console.log("File uploaded:", req.file);
    res.status(200).send("Audio uploaded successfully");
  } catch (err) {
    console.error("Error saving file:", err);
    res.status(500).send("Failed to upload audio");
  }
});

// Start server
const PORT = 6000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));