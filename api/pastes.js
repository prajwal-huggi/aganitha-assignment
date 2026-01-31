const express = require("express");
const sequelize = require("../db");
const { createPaste } = require("../controllers/pasteController");

const app = express();
app.use(express.json());

let initialized = false;

app.post("/", async (req, res) => {
  try {
    if (!initialized) {
      await sequelize.authenticate();
      initialized = true;
      console.log("DB connected");
    }
    return createPaste(req, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
