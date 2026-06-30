const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const app = express();

/* -----------------------------
   Security Middleware
------------------------------ */

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);

/* -----------------------------
   Health Check Route
------------------------------ */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        app: "FitForge AI",
        version: "1.0.0",
        message: "Backend running successfully 🚀",
    });
});

module.exports = app;