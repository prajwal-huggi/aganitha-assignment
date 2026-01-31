if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  const express = require("express");
  const sequelize = require("../db");
  const pasteRoutes = require("../routes/pasteRoutes");
  const homeRoutes = require("../routes/homeRoutes");
  
  const app = express();
  app.use(express.json());
  
  app.use("/", homeRoutes);
  app.use("/", pasteRoutes);
  
  app.get("/p/:slug", (req, res) => {
    res.redirect(`/api/pastes/${req.params.slug}`);
  });
  
  let initialized = false;
  
  module.exports = async (req, res) => {
    try {
      if (!initialized) {
        await sequelize.authenticate();
        initialized = true;
        console.log("DB connection established");
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
  