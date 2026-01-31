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

const getPaste = async (req, res) => {
  const { slug } = req.params;

  const paste = await Paste.findOne({ where: { slug } });

  if (!paste) {
    return res.sendStatus(404);
  }

  const expiredByTime =
    paste.expires_at && paste.expires_at < new Date();

  const expiredByViews =
    paste.max_views !== null && paste.view_count >= paste.max_views;

  if (expiredByTime || expiredByViews) {
    return res.sendStatus(410);
  }

  await paste.increment("view_count");

  return res.json({ content: paste.content });
};

module.exports = { createPaste, getPaste };
