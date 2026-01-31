require("dotenv").config();

const express = require("express");
const sequelize = require("../db");
const pasteRoutes = require("../routes/pasteRoutes");
const homeRoutes = require("../routes/homeRoutes");

const app = express();
app.use(express.json());

app.get("/", homeRoutes);
app.use("/api", pasteRoutes);

app.get("/p/:slug", (req, res) => {
  res.redirect(`/api/pastes/${req.params.slug}`);
});

let isReady = false;

module.exports = async (req, res) => {
  try {
    if (!isReady) {
      await sequelize.authenticate();
      await sequelize.sync();
      isReady = true;
      console.log("DB ready");
    }

    return app(req, res);
  } catch (err) {
    console.error("FUNCTION CRASH:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message
    });
  }
};
