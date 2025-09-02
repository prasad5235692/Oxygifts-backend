import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Product from "././src/models/Product.js" // your Product schema

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 🔑 Use Atlas connection string (replace <username>, <password>, <cluster>, <dbname>)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// API route: fetch product by slug
app.get("/api/products/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API route: add to cart (basic)
app.post("/api/cart/add", (req, res) => {
  const item = req.body;
  res.json({ message: "Added", item }); // replace with DB logic
});

app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
