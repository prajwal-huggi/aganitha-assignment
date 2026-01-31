const express = require("express");
const { createPaste, getPaste } = require("../controllers/pasteController.js");

const router = express.Router();

router.post("/pastes", createPaste);
router.get("/pastes/:slug", getPaste);

module.exports = router;