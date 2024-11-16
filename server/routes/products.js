const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product = require("../models/Product");
const router = express.Router();
const authAdminMiddleware = require("../middleware/authAdminMiddleware");

router.post("/", async (req, res) => {
  try {
    const { name, price, quantity, description, image } = req.body;

    if (!name || !price || !quantity || !description || !image) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    const newProduct = new Product({
      name,
      price,
      quantity,
      description,
      image,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", authAdminMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.isActive = false;
    await product.save();
    res.json({ message: "Product deactivated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./public/products/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = req.query.filename || "";
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const finalFilename =
      (filename || file.fieldname + "-" + uniqueSuffix) +
      path.extname(file.originalname);
    cb(null, finalFilename);
  },
});

const upload = multer({ storage: storage });

router.post("/upload-image", upload.single("productImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "Not found" });
  }

  const fileUrl = `http://localhost:5000/products/${req.file.filename}`;
  res.status(200).json({ url: fileUrl });
});

module.exports = router;
