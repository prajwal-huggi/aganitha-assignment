require("dotenv").config();

const express = require("express");
const sequelize = require("../db.js");
const pasteRoutes = require("../routes/pasteRoutes.js");
const homeRoutes = require("../routes/homeRoutes.js");

const app = express();
app.use(express.json());

app.get("/", homeRoutes);
app.use("/api", pasteRoutes);

app.get("/p/:slug", (req, res) => {
  res.redirect(`/api/pastes/${req.params.slug}`);
});

/**
 * Vercel is serverless.
 * This flag prevents reconnecting to DB on every request.
 */
let isInitialized = false;

module.exports = async (req, res) => {
  try {
    if (!isInitialized) {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log("DB connected (serverless)");
      isInitialized = true;
    }

    return app(req, res);
  } catch (err) {
    console.error("Serverless handler error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
