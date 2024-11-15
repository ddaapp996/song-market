const express = require("express");
const Song = require("../models/Song");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", async (req, res) => {
  const { title, artist, album, genre, url, coverImage } = req.body;
  try {
    const newSong = new Song({ title, artist, album, genre, url, coverImage });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.size || 10;

    const skip = (page - 1) * limit;
    const songs = await Song.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tops", authMiddleware, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const skip = (page - 1) * limit;
    const songs = await Song.find()
      .sort({ downloads: -1 })
      .skip(skip)
      .limit(limit);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const query = req.query.query?.toLowerCase() || '';
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { artist: { $regex: query, $options: "i" } },
        { album: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    }).sort({ downloads: -1, createdAt: -1 }).skip(0).limit(25);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedSong) return res.status(404).json({ error: "Song not found" });
    res.json(updatedSong);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong) return res.status(404).json({ error: "Song not found" });
    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
