const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/productModel');

dotenv.config();

const sampleProducts = [
  {
    name: "Arduino Mega 2560 Starter Kit",
    description: "Complete Arduino starter kit with sensors, breadboard, and comprehensive tutorial guide for beginners.",
    price: 89.99,
    originalPrice: 119.99,
    category: "Educational Kits",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    isNew: true,
    isFeatured: true,
    stockQuantity: 50
  },
  {
    name: "Ender 3 V2 3D Printer",
    description: "High-precision 3D printer perfect for students and hobbyists. Easy assembly and great print quality.",
    price: 259.99,
    originalPrice: 299.99,
    category: "3D Printing Kits",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    isFeatured: true,
    stockQuantity: 25
  },
  {
    name: "Raspberry Pi 4 Robotics Kit",
    description: "Build your own programmable robot with computer vision, sensors, and AI capabilities.",
    price: 199.99,
    category: "Competition Robots",
    image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    isNew: true,
    isFeatured: true,
    stockQuantity: 30
  },
  {
    name: "Custom PCB Design Service",
    description: "Professional PCB design and prototyping service for your electronic projects and inventions.",
    price: 149.99,
    category: "PCB Design Services",
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 67,
    inStock: true,
    isFeatured: true,
    stockQuantity: 100
  },
  {
    name: "ESP32 IoT Development Board",
    description: "Powerful WiFi and Bluetooth enabled microcontroller for IoT projects and wireless communication.",
    price: 39.99,
    originalPrice: 49.99,
    category: "Educational Kits",
    image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=400&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 203,
    inStock: true,
    stockQuantity: 75
  },
  {
    name: "Competition Robot Chassis Kit",
    description: "Professional-grade chassis kit designed for robotics competitions with precision-machined parts.",
    price: 329.99,
    category: "Competition Robots",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 91,
    inStock: false,
    stockQuantity: 0
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${products.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedProducts();