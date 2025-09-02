import mongoose from "mongoose";

const PlantSchema = new mongoose.Schema({
  key: String,
  name: String,
  image: String,
});

const RibbonSchema = new mongoose.Schema({
  name: String,
  code: String,
  images: {
    succulent: String,
    jade: String,
    echeveria: String,
  },
});

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  compareAtPrice: Number,
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },

  // 🌱 Plant options
  plantOptions: [PlantSchema],

  // 🎀 Ribbon options with plant-specific images
  ribbonOptions: [RibbonSchema],
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
