const express = require("express");
const sequelize = require("../db");
const { createPaste } = require("../controllers/pasteController");

const app = express();
app.use(express.json());

let initialized = false;

app.post("/", async (req, res) => {
  if (!initialized) {
    await sequelize.authenticate();
    initialized = true;
  }
  return createPaste(req, res);
});

module.exports = app;
