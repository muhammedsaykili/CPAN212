import express from "express";
import fs from "fs";
import path from "path";
import _ from "lodash";
import { fileURLToPath } from "url";

const router = express.Router();

// Get correct directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload_directory = path.join(__dirname, "../uploads");

// Fetch a single random file
router.get("/single", (req, res) => {
  let files_array = fs.readdirSync(upload_directory);

  if (files_array.length === 0) {
    return res.status(503).send({ message: "No images available" });
  }

  let filename = _.sample(files_array); // Selects only one file
  res.sendFile(path.join(upload_directory, filename));
});

// Fetch multiple filenames (Fixed)
router.get("/multiple", (req, res) => {
  let files_array = fs.readdirSync(upload_directory);

  if (files_array.length === 0) {
    return res.status(503).send({ message: "No images available" });
  }

  let filenames = _.sampleSize(files_array, Math.min(5, files_array.length)); 
  res.json(filenames);
});

// Fetch a specific file
router.get("/file/:filename", (req, res) => {
  let filePath = path.join(upload_directory, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send({ message: "File not found" });
  }

  res.sendFile(filePath);
});

export default router;
