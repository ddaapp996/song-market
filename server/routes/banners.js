// file: routes/banners.js
const express = require('express');
const Banner = require('../models/Banner');
const router = express.Router();

// Tạo mới banner
router.post('/', async (req, res) => {
    const { title, imageUrl, linkTo, isActive } = req.body;
    try {
        const newBanner = new Banner({ title, imageUrl, linkTo, isActive });
        await newBanner.save();
        res.status(201).json(newBanner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Lấy danh sách tất cả các banner
router.get('/', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Lấy thông tin chi tiết một banner
router.get('/:id', async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) return res.status(404).json({ error: 'Banner not found' });
        res.json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cập nhật banner
router.put('/:id', async (req, res) => {
    try {
        const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBanner) return res.status(404).json({ error: 'Banner not found' });
        res.json(updatedBanner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Xóa (mềm) banner
router.delete('/:id', async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) return res.status(404).json({ error: 'Banner not found' });

        banner.isActive = false;
        await banner.save();
        res.json({ message: 'Banner deactivated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
