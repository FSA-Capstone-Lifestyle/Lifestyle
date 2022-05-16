const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
module.exports = app;

// logging middleware
app.use(morgan("dev"));
app.use(cors());
// body parsing middleware
app.use(express.json());

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

// auth and api routes
app.use("/api/user", require("./api/users"));
app.use("/api/workouts", require("./api/workoutRoutes"));
app.use("/api/exercises", require("./api/exerciseRoutes"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
