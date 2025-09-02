// src/routes/products.js
import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by slug or ID
router.get("/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let product = null;

    // First try by slug
    product = await Product.findOne({ slug: idOrSlug });

    // If not found and idOrSlug looks like ObjectId → try findById
    if (!product && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(idOrSlug);
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
