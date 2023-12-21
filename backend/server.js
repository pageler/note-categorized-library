const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const colors = require("@colors/colors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();
colors.enable();
connectDB();
app.use(express.json()); // convert to json format

app.get("/", (req, res) => {
    res.send("Note Categorized Library API is running...");
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

// app.get("/api/notes/:id", (req, res) => {
//     const note = notes.find((note) => note._id === req.params.id);
//     console.log(req.params); // 'id' logged to Terminal.

//     res.send(note); // Note rendered to PORT 5000.
// });

// Registration API:
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server has started on PORT ${PORT}.`.blue));
