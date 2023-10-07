const express = require("express");
require("dotenv").config();
const cors = require("cors");

// file imports
const db = require("./config/db");
const userRoutes = require("./routes/user");
const noteRoutes = require("./routes/note");
const { isAuth } = require("./middlewares/AuthMiddleware");

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Routes
app.use("/user", userRoutes);
app.use("/note", noteRoutes);

app.listen(PORT, () => {
  console.log("Server is running at", PORT);
});
