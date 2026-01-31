if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  const express = require("express");
  const sequelize = require("../db");
  const homeRoutes = require("../routes/homeRoutes");
  const pasteRoutes = require("../routes/pasteRoutes");
  
  const app = express();
  app.use(express.json());
  
  app.use("/", homeRoutes);
  app.use("/", pasteRoutes);
  
  app.get("/p/:slug", (req, res) => {
    res.redirect(`/pastes/${req.params.slug}`);
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("DB connection established");
    })
    .catch((err) => {
      console.error("DB connection failed:", err);
    });

  module.exports = app;
  