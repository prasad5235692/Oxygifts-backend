// backend/src/routes/cart.js
import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// ✅ Get cart items
router.get("/", async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// ✅ Add item to cart
router.post("/", async (req, res) => {
  try {
    const newItem = new Cart(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: "Failed to add to cart" });
  }
});

// ✅ Delete item from cart
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Cart item not found" });
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});

export default router;
