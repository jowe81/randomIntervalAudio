import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// API route to get the list of MP3 files in the public/media folder
app.get("/api/mp3-files", (req, res) => {
    const mediaFolder = path.join(__dirname, "public", "media");

    // Read all files from the media folder
    fs.readdir(mediaFolder, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Unable to read media folder" });
        }

        // Filter out non-MP3 files
        const mp3Files = files.filter((file) => file.endsWith(".mp3"));
        res.json(mp3Files);
    });
});

// Handle the root route to serve the HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "player.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
