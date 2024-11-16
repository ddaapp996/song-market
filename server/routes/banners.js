const express = require("express");
const Banner = require("../models/Banner");
const router = express.Router();

router.post("/", async (req, res) => {
  const { title, imageUrl, linkTo, isActive } = req.body;
  try {
    const newBanner = new Banner({ title, imageUrl, linkTo, isActive });
    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ error: "Banner not found" });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBanner)
      return res.status(404).json({ error: "Banner not found" });
    res.json(updatedBanner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ error: "Banner not found" });

    banner.isActive = false;
    await banner.save();
    res.json({ message: "Banner deactivated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
