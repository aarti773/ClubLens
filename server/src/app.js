const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "ClubLens API running",
  });
});

module.exports = app;