const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const store = require("../store");
const Log = require("../utils/logger");

router.post("/shorturls", async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || typeof url !== "string" || !url.startsWith("http")) {
    await Log("backend", "error", "handler", "Invalid or missing URL");
    return res.status(400).json({ error: "Invalid or missing URL" });
  }

  const code = shortcode || uuidv4().slice(0, 6);

  if (store[code]) {
    await Log("backend", "error", "handler", "Shortcode already exists");
    return res.status(409).json({ error: "Shortcode already exists" });
  }

  const createdAt = new Date();
  const expiry = new Date(createdAt.getTime() + validity * 60000);

  store[code] = {
    original: url,
    createdAt: createdAt.toISOString(),
    expiry: expiry.toISOString(),
    clicks: 0,
    clickDetails: [],
  };

  res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry: expiry.toISOString(),
  });
});

router.get("/:code", async (req, res) => {
  const { code } = req.params;
  const data = store[code];

  if (!data) {
    await Log("backend", "error", "handler", "Shortcode not found");
    return res.status(404).json({ error: "Shortcode not found" });
  }

  if (new Date() > new Date(data.expiry)) {
    await Log("backend", "error", "handler", "Link expired");
    return res.status(410).json({ error: "Link expired" });
  }

  data.clicks += 1;
  data.clickDetails.push({
    timestamp: new Date().toISOString(),
    referrer: req.get("User-Agent") || "unknown",
    location: "IN",
  });

  res.redirect(data.original);
});

router.get("/shorturls/:code", async (req, res) => {
  const { code } = req.params;
  const data = store[code];

  if (!data) {
    await Log("backend", "error", "handler", "Shortcode not found");
    return res.status(404).json({ error: "Shortcode not found" });
  }

  res.json({
    shortcode: code,
    originalURL: data.original,
    createdAt: data.createdAt,
    expiry: data.expiry,
    clicks: data.clicks,
    clickDetails: data.clickDetails,
  });
});

module.exports = router;
