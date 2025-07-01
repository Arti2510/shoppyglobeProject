
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
import Product from './models/Product.js';

dotenv.config();

const seedProducts = async () => {
  try {
    console.log("🌱 Seeding started...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const { data } = await axios.get('https://dummyjson.com/products');
    console.log(`📦 Fetched ${data.products.length} products`);

    const products = data.products.map((item) => ({
      name: item.title,
      price: item.price,
      brand: item.category,
      description: item.description,
      stock: item.stock,
    }));

    await Product.deleteMany();
    console.log("🧹 Cleared old products");
    await Product.insertMany(products);
    console.log("✅ Products inserted successfully");
    console.log('✅ Products seeded from dummyjson.com');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedProducts();

