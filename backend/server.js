const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const colors = require("@colors/colors");
const connectDB = require("./config/db");

const app = express();
dotenv.config();
colors.enable();
connectDB();

app.get("/", (req, res) => {
    res.send("Note Categorized Library API is running...");
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
    const note = notes.find((note) => note._id === req.params.id);
    console.log(req.params); // Id logged to Terminal.

    res.send(note); // Note rendered to PORT 5000.
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server has started on PORT ${PORT}.`.blue));
