import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear old data
    await Product.deleteMany();

    // Insert new data
    await Product.insertMany([
      {
        title: "Succulent Gift Ribbon",
        slug: "succulent-gift-ribbon",
        price: 299,
        compareAtPrice: 399,
        rating: 4.7,
        reviews: 120,
        description: "Beautiful succulent gift with customizable ribbon.",

        // 🌱 3 types of plants
        plantOptions: [
          {
            key: "succulent",
            name: "Succulent",
            image: "https://res.cloudinary.com/dnqjvt7yb/image/upload/v1756744212/products/e2zlbchhtlftlw7qzhej.jpg",
          },
          {
            key: "jade",
            name: "Jade Plant",
            image: "https://res.cloudinary.com/dnqjvt7yb/image/upload/v1756744401/products/vs9baq25pmesod7jbcjc.jpg",
          },
          {
            key: "echeveria",
            name: "Echeveria",
            image: "https://res.cloudinary.com/dnqjvt7yb/image/upload/v1756744617/products/oj9ukcutuusxavvc4fmn.jpg",
          },
        ],

        // 🎀 Each ribbon color has plant-specific images
        ribbonOptions: [
          {
            name: "Red",
            code: "#E63946",
            images: {
              succulent: "https://res.cloudinary.com/dnqjvt7yb/image/upload/v1756744212/products/e2zlbchhtlftlw7qzhej.jpg",
              jade: "https://res.cloudinary.com/dnqjvt7yb/image/upload/v1756744401/products/vs9baq25pmesod7jbcjc.jpg",
              echeveria: "https://res.cloudinary.com/dnqjvt7yb/image/upload/v1756744617/products/oj9ukcutuusxavvc4fmn.jpg",
            },
          },
          {
            name: "Pink",
            code: "#FF69B4",
            images: {
        
              echeveria: "https://res.cloudinary.com/dnqjvt7yb/image/upload/v1756744660/products/rjpgablh6ij1gzcs2zig.jpg",
            },
          },
          {
            name: "White",
            code: "#FFFFFF",
            images: {
              succulent: "https://res.cloudinary.com/dnqjvt7yb/image/upload/v1756744287/products/gccz4igvk0hpz8auab2o.jpg",
    
            },
          },
          {
            name: "blue",
            code: "#5014f4ff",
            images: {
              jade: "https://res.cloudinary.com/dnqjvt7yb/image/upload/v1756744401/products/vs9baq25pmesod7jbcjc.jpg",
            },
          },
        ],
      },
    ]);

    console.log("✅ Seed data inserted");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seed();
