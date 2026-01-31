const Paste = require("../models/model.js");
const { nanoid } = require("nanoid");

const createPaste = async (req, res) => {
  const { content, expiresInSeconds, maxViews } = req.body;

  if (!content) {
    return res.status(400).json({ error: "content required" });
  }

  const slug = nanoid(8);

  const expiresAt = expiresInSeconds
    ? new Date(Date.now() + expiresInSeconds * 1000)
    : null;

  await Paste.create({
    slug,
    content,
    expires_at: expiresAt,
    max_views: maxViews ?? null
  });

  return res.status(201).json({
    url: `${req.protocol}://${req.get("host")}/p/${slug}`
  });
};

module.exports = { createPaste };
