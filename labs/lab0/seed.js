// seed.js - Database seeder for 100 e-commerce products
const mongoose = require('mongoose');
require('dotenv').config();

// Import models directly with relative paths
const Product = require('./models/Product');
const Category = require('./models/Category');

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_db';

// Generate valid MongoDB ObjectIds
const generateObjectId = () => new mongoose.Types.ObjectId();

// Create ObjectIds for users in reviews
const createUserIds = (count) => {
  const ids = {};
  for (let i = 1; i <= count; i++) {
    ids[`user${i}`] = generateObjectId();
  }
  return ids;
};

const userIds = createUserIds(20);

// Product categories
const categories = [
  {
    name: "Electronics",
    description: "Latest electronic devices including TVs, laptops, and smartphones",
    image: "https://example.com/electronics.jpg",
    featured: true
  },
  {
    name: "Home & Kitchen",
    description: "Everything you need for your home and kitchen",
    image: "https://example.com/home-kitchen.jpg",
    featured: true
  },
  {
    name: "Books",
    description: "Books in all genres including bestsellers and classics",
    image: "https://example.com/books.jpg",
    featured: false
  },
  {
    name: "Clothing",
    description: "Fashion for men, women, and children",
    image: "https://example.com/clothing.jpg",
    featured: true
  },
  {
    name: "Sports & Outdoors",
    description: "Equipment for sports and outdoor activities",
    image: "https://example.com/sports.jpg",
    featured: false
  },
  {
    name: "Beauty & Personal Care",
    description: "Makeup, skincare, and personal care products",
    image: "https://example.com/beauty.jpg",
    featured: true
  },
  {
    name: "Toys & Games",
    description: "Toys and games for all ages",
    image: "https://example.com/toys.jpg",
    featured: false
  },
  {
    name: "Health & Wellness",
    description: "Products for health, fitness, and wellness",
    image: "https://example.com/health.jpg",
    featured: false
  },
  {
    name: "Automotive",
    description: "Parts, accessories, and tools for vehicles",
    image: "https://example.com/automotive.jpg",
    featured: false
  },
  {
    name: "Pet Supplies",
    description: "Food, toys, and accessories for pets",
    image: "https://example.com/pets.jpg",
    featured: true
  }
];

// Helper functions to generate random product data
const getRandomPrice = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

const getRandomRating = () => {
  return Math.floor(Math.random() * 5) + 1;
};

const getRandomBoolean = () => {
  return Math.random() > 0.2; // 80% true, 20% false
};

const getRandomUser = () => {
  const userNum = Math.floor(Math.random() * 20) + 1;
  return userIds[`user${userNum}`];
};

const getRandomItemFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomReviews = (count) => {
  const reviews = [];
  const reviewers = [
    "John Smith", "Jane Doe", "Mike Johnson", "Emily Wilson", "David Chen",
    "Sarah Miller", "Robert Brown", "Lisa Taylor", "Michael Scott", "Pam Beesly",
    "Jim Halpert", "Angela Martin", "Dwight Schrute", "Kelly Kapoor", "Oscar Martinez"
  ];
  
  const comments = [
    "Absolutely love this product! Would definitely recommend.",
    "Great quality for the price. Very satisfied with my purchase.",
    "It's good but I expected better quality.",
    "Exactly what I was looking for. Fast shipping too!",
    "This exceeded my expectations. Will buy again.",
    "Not bad, but there's room for improvement.",
    "Perfect gift for my friend. They loved it!",
    "The product is okay, but customer service was excellent.",
    "Very durable and well-made. Worth every penny.",
    "Disappointed with this purchase. Wouldn't recommend.",
    "Does the job but nothing special.",
    "Amazing product! Use it every day.",
    "Good value for money overall.",
    "Had some issues at first, but works great now.",
    "Just as described. Very happy with it."
  ];
  
  for (let i = 0; i < count; i++) {
    reviews.push({
      userId: getRandomUser(),
      userName: getRandomItemFromArray(reviewers),
      rating: getRandomRating(),
      comment: getRandomItemFromArray(comments),
      date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000) // Random date within last 90 days
    });
  }
  
  return reviews;
};

// Generate 100 products
const generateProducts = () => {
  const products = [];
  
  // Electronics products (25)
  const electronicsProducts = [
    {
      name: "Ultra HD Smart TV 55-inch",
      description: "4K Ultra HD Smart TV with HDR and built-in streaming apps.",
      category: "Electronics",
      price: getRandomPrice(399, 899),
      images: ["https://example.com/tv-1.jpg", "https://example.com/tv-2.jpg"],
      features: ["4K Resolution", "HDR Support", "Built-in WiFi", "Voice Control"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Wireless Noise-Cancelling Headphones",
      description: "Premium wireless headphones with active noise cancellation and long battery life.",
      category: "Electronics",
      price: getRandomPrice(149, 349),
      images: ["https://example.com/headphones-1.jpg", "https://example.com/headphones-2.jpg"],
      features: ["Active Noise Cancellation", "30-hour Battery Life", "Bluetooth 5.0", "Comfortable Ear Pads"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Professional DSLR Camera",
      description: "High-resolution camera with advanced features for professional photography.",
      category: "Electronics",
      price: getRandomPrice(699, 1499),
      images: ["https://example.com/camera-1.jpg", "https://example.com/camera-2.jpg"],
      features: ["24.2 Megapixel Sensor", "4K Video Recording", "Built-in WiFi", "Weather-sealed Body"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Gaming Laptop 15.6-inch",
      description: "High-performance gaming laptop with RGB keyboard and advanced cooling system.",
      category: "Electronics",
      price: getRandomPrice(899, 1999),
      images: ["https://example.com/laptop-1.jpg", "https://example.com/laptop-2.jpg"],
      features: ["NVIDIA RTX Graphics", "Intel Core i7 Processor", "16GB RAM", "512GB SSD", "144Hz Display"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Smartphone X Pro",
      description: "Latest smartphone with triple camera system and all-day battery life.",
      category: "Electronics",
      price: getRandomPrice(699, 1299),
      images: ["https://example.com/phone-1.jpg", "https://example.com/phone-2.jpg"],
      features: ["6.7-inch OLED Display", "Triple Camera System", "5G Connectivity", "All-day Battery Life"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Wireless Earbuds",
      description: "True wireless earbuds with active noise cancellation and water resistance.",
      category: "Electronics",
      price: getRandomPrice(99, 249),
      images: ["https://example.com/earbuds-1.jpg", "https://example.com/earbuds-2.jpg"],
      features: ["Active Noise Cancellation", "Water Resistant", "24-hour Battery Life", "Touch Controls"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Smart Home Hub",
      description: "Control all your smart home devices with voice commands and automations.",
      category: "Electronics",
      price: getRandomPrice(79, 199),
      images: ["https://example.com/smarthub-1.jpg", "https://example.com/smarthub-2.jpg"],
      features: ["Voice Control", "Compatible with Multiple Platforms", "Custom Automations", "Energy Usage Monitoring"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Ultra-thin Tablet 10.2-inch",
      description: "Lightweight tablet with stunning display and fast performance.",
      category: "Electronics",
      price: getRandomPrice(299, 799),
      images: ["https://example.com/tablet-1.jpg", "https://example.com/tablet-2.jpg"],
      features: ["10.2-inch Retina Display", "All-day Battery Life", "Fast Processor", "Front and Rear Cameras"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Portable Bluetooth Speaker",
      description: "Waterproof portable speaker with 360-degree sound and long battery life.",
      category: "Electronics",
      price: getRandomPrice(59, 199),
      images: ["https://example.com/speaker-1.jpg", "https://example.com/speaker-2.jpg"],
      features: ["Waterproof Design", "20-hour Battery Life", "360-degree Sound", "Built-in Microphone"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "4K Action Camera",
      description: "Compact action camera for recording adventures in stunning 4K resolution.",
      category: "Electronics",
      price: getRandomPrice(199, 399),
      images: ["https://example.com/actioncam-1.jpg", "https://example.com/actioncam-2.jpg"],
      features: ["4K Video Recording", "Waterproof", "Image Stabilization", "Wi-Fi Connectivity"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    }
  ];
  
  // Home & Kitchen products (20)
  const homeProducts = [
    {
      name: "Programmable Coffee Maker",
      description: "Programmable coffee maker with built-in grinder and multiple brew settings.",
      category: "Home & Kitchen",
      price: getRandomPrice(79, 249),
      images: ["https://example.com/coffeemaker-1.jpg", "https://example.com/coffeemaker-2.jpg"],
      features: ["Built-in Grinder", "Programmable Timer", "Multiple Brew Strengths", "10-cup Capacity"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Robot Vacuum Cleaner",
      description: "Smart robot vacuum with mapping technology and app control.",
      category: "Home & Kitchen",
      price: getRandomPrice(199, 499),
      images: ["https://example.com/vacuum-1.jpg", "https://example.com/vacuum-2.jpg"],
      features: ["Smart Mapping", "App Control", "Automatic Recharging", "HEPA Filter"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Air Purifier with HEPA Filter",
      description: "Air purifier that removes 99.97% of airborne particles for cleaner indoor air.",
      category: "Home & Kitchen",
      price: getRandomPrice(129, 349),
      images: ["https://example.com/airpurifier-1.jpg", "https://example.com/airpurifier-2.jpg"],
      features: ["True HEPA Filter", "Quiet Operation", "Air Quality Sensor", "Timer Function"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Stand Mixer Pro",
      description: "Professional stand mixer for baking enthusiasts with multiple attachments.",
      category: "Home & Kitchen",
      price: getRandomPrice(249, 449),
      images: ["https://example.com/mixer-1.jpg", "https://example.com/mixer-2.jpg"],
      features: ["500W Motor", "5.5 Quart Bowl", "10 Speed Settings", "Multiple Attachments Included"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Non-Stick Cookware Set (12-piece)",
      description: "Complete cookware set with non-stick coating and ergonomic handles.",
      category: "Home & Kitchen",
      price: getRandomPrice(99, 299),
      images: ["https://example.com/cookware-1.jpg", "https://example.com/cookware-2.jpg"],
      features: ["Non-Stick Coating", "Dishwasher Safe", "Even Heat Distribution", "Ergonomic Handles"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Smart Thermostat",
      description: "Energy-saving smart thermostat that learns your schedule and preferences.",
      category: "Home & Kitchen",
      price: getRandomPrice(149, 249),
      images: ["https://example.com/thermostat-1.jpg", "https://example.com/thermostat-2.jpg"],
      features: ["Learning Algorithm", "Energy Saving", "Remote Control", "Easy Installation"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Food Processor (10-cup)",
      description: "Versatile food processor for slicing, dicing, chopping, and more.",
      category: "Home & Kitchen",
      price: getRandomPrice(89, 199),
      images: ["https://example.com/foodprocessor-1.jpg", "https://example.com/foodprocessor-2.jpg"],
      features: ["Multiple Attachments", "10-cup Capacity", "Variable Speed", "Dishwasher Safe Parts"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Memory Foam Mattress (Queen)",
      description: "Cooling memory foam mattress for better sleep and comfort.",
      category: "Home & Kitchen",
      price: getRandomPrice(399, 999),
      images: ["https://example.com/mattress-1.jpg", "https://example.com/mattress-2.jpg"],
      features: ["Cooling Gel Infused", "Medium-firm Support", "Hypoallergenic Cover", "Motion Isolation"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    }
  ];
  
  // Add more product categories here...
  
  // Books (10)
  const bookProducts = [
    {
      name: "The Ultimate Cookbook",
      description: "Comprehensive cookbook with 500 recipes for all skill levels.",
      category: "Books",
      price: getRandomPrice(24, 49),
      images: ["https://example.com/cookbook-1.jpg", "https://example.com/cookbook-2.jpg"],
      features: ["500 Recipes", "Step-by-step Instructions", "Nutritional Information", "Beautiful Photography"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Sci-Fi Trilogy Box Set",
      description: "Award-winning science fiction trilogy in a collectible box set.",
      category: "Books",
      price: getRandomPrice(29, 59),
      images: ["https://example.com/scifi-1.jpg", "https://example.com/scifi-2.jpg"],
      features: ["Award-winning Author", "Hardcover Edition", "Includes Bonus Content", "Collectible Box"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Business Leadership Guide",
      description: "Bestselling guide to modern business leadership and management.",
      category: "Books",
      price: getRandomPrice(19, 39),
      images: ["https://example.com/business-1.jpg", "https://example.com/business-2.jpg"],
      features: ["Practical Advice", "Case Studies", "Leadership Exercises", "Updated Edition"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Complete History Collection",
      description: "Illustrated history collection covering major world events.",
      category: "Books",
      price: getRandomPrice(49, 99),
      images: ["https://example.com/history-1.jpg", "https://example.com/history-2.jpg"],
      features: ["Five-Volume Set", "Rare Historical Photos", "Detailed Timelines", "Expert Commentary"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Children's Bedtime Stories",
      description: "Collection of illustrated bedtime stories for children ages 3-8.",
      category: "Books",
      price: getRandomPrice(14, 29),
      images: ["https://example.com/bedtime-1.jpg", "https://example.com/bedtime-2.jpg"],
      features: ["15 Stories", "Colorful Illustrations", "Age-appropriate Content", "Hardcover Edition"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    }
  ];
  
  // Clothing (15)
  const clothingProducts = [
    {
      name: "Men's Classic Fit Dress Shirt",
      description: "Wrinkle-resistant dress shirt perfect for business or formal occasions.",
      category: "Clothing",
      price: getRandomPrice(29, 69),
      images: ["https://example.com/dressshirt-1.jpg", "https://example.com/dressshirt-2.jpg"],
      features: ["100% Cotton", "Wrinkle-resistant", "Multiple Colors Available", "Machine Washable"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Women's Yoga Pants",
      description: "Comfortable high-waisted yoga pants with pockets.",
      category: "Clothing",
      price: getRandomPrice(24, 59),
      images: ["https://example.com/yogapants-1.jpg", "https://example.com/yogapants-2.jpg"],
      features: ["High-waisted Design", "4-way Stretch", "Hidden Pockets", "Moisture-wicking Fabric"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Waterproof Hiking Boots",
      description: "Durable waterproof hiking boots with excellent traction.",
      category: "Clothing",
      price: getRandomPrice(79, 149),
      images: ["https://example.com/hikingboots-1.jpg", "https://example.com/hikingboots-2.jpg"],
      features: ["Waterproof Membrane", "Vibram Outsole", "Ankle Support", "Breathable Material"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Winter Down Jacket",
      description: "Warm down jacket for cold winter weather.",
      category: "Clothing",
      price: getRandomPrice(99, 249),
      images: ["https://example.com/downjacket-1.jpg", "https://example.com/downjacket-2.jpg"],
      features: ["650-fill Down", "Water-resistant Outer Shell", "Adjustable Hood", "Inside Pockets"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Leather Crossbody Bag",
      description: "Genuine leather crossbody bag with adjustable strap and multiple compartments.",
      category: "Clothing",
      price: getRandomPrice(49, 129),
      images: ["https://example.com/bag-1.jpg", "https://example.com/bag-2.jpg"],
      features: ["Genuine Leather", "Adjustable Strap", "Multiple Compartments", "Magnetic Closure"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Men's Running Shoes",
      description: "Lightweight running shoes with responsive cushioning.",
      category: "Clothing",
      price: getRandomPrice(69, 139),
      images: ["https://example.com/runningshoes-1.jpg", "https://example.com/runningshoes-2.jpg"],
      features: ["Responsive Cushioning", "Breathable Mesh", "Rubber Outsole", "Reflective Elements"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Women's Casual Blazer",
      description: "Versatile blazer that transitions from office to evening.",
      category: "Clothing",
      price: getRandomPrice(59, 129),
      images: ["https://example.com/blazer-1.jpg", "https://example.com/blazer-2.jpg"],
      features: ["Structured Fit", "Fully Lined", "Two-button Closure", "Back Vent"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    }
  ];
  
  // Sports & Outdoors (10)
  const sportsProducts = [
    {
      name: "Adjustable Dumbbell Set",
      description: "Space-saving adjustable dumbbells for home workouts.",
      category: "Sports & Outdoors",
      price: getRandomPrice(199, 349),
      images: ["https://example.com/dumbbells-1.jpg", "https://example.com/dumbbells-2.jpg"],
      features: ["Adjustable from 5-52.5 lbs", "Space-saving Design", "Durable Construction", "Easy Weight Selection"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "2-Person Camping Tent",
      description: "Lightweight, waterproof tent perfect for backpacking and camping.",
      category: "Sports & Outdoors",
      price: getRandomPrice(99, 249),
      images: ["https://example.com/tent-1.jpg", "https://example.com/tent-2.jpg"],
      features: ["Waterproof", "Easy Setup", "Ventilation Windows", "Includes Carrying Bag"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Carbon Fiber Fishing Rod",
      description: "Professional-grade carbon fiber fishing rod with cork handle.",
      category: "Sports & Outdoors",
      price: getRandomPrice(79, 199),
      images: ["https://example.com/fishingrod-1.jpg", "https://example.com/fishingrod-2.jpg"],
      features: ["Carbon Fiber Construction", "Cork Handle", "Stainless Steel Guides", "Medium-Heavy Action"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Mountain Bike 27.5\"",
      description: "Trail-ready mountain bike with hydraulic disc brakes and front suspension.",
      category: "Sports & Outdoors",
      price: getRandomPrice(499, 1299),
      images: ["https://example.com/bike-1.jpg", "https://example.com/bike-2.jpg"],
      features: ["Aluminum Frame", "Front Suspension", "Hydraulic Disc Brakes", "21-Speed Shifters"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Yoga Mat with Alignment Marks",
      description: "Extra thick yoga mat with alignment marks for proper positioning.",
      category: "Sports & Outdoors",
      price: getRandomPrice(39, 89),
      images: ["https://example.com/yogamat-1.jpg", "https://example.com/yogamat-2.jpg"],
      features: ["Alignment Marks", "6mm Thickness", "Non-slip Surface", "Eco-friendly Material"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    }
  ];
  
  // Beauty & Personal Care (10)
  const beautyProducts = [
    {
      name: "Professional Hair Dryer",
      description: "Salon-quality hair dryer with ionic technology for faster drying.",
      category: "Beauty & Personal Care",
      price: getRandomPrice(69, 199),
      images: ["https://example.com/hairdryer-1.jpg", "https://example.com/hairdryer-2.jpg"],
      features: ["Ionic Technology", "Multiple Heat Settings", "Concentrator Attachment", "Ergonomic Design"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Vitamin C Serum",
      description: "Brightening vitamin C serum for radiant skin.",
      category: "Beauty & Personal Care",
      price: getRandomPrice(19, 69),
      images: ["https://example.com/serum-1.jpg", "https://example.com/serum-2.jpg"],
      features: ["20% Vitamin C", "Hyaluronic Acid", "Anti-aging Formula", "Cruelty-free"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Electric Toothbrush",
      description: "Smart electric toothbrush with pressure sensor and multiple cleaning modes.",
      category: "Beauty & Personal Care",
      price: getRandomPrice(49, 149),
      images: ["https://example.com/toothbrush-1.jpg", "https://example.com/toothbrush-2.jpg"],
      features: ["Pressure Sensor", "5 Cleaning Modes", "2-minute Timer", "Long Battery Life"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Luxury Perfume 50ml",
      description: "Elegant luxury perfume with notes of jasmine, bergamot, and sandalwood.",
      category: "Beauty & Personal Care",
      price: getRandomPrice(59, 129),
      images: ["https://example.com/perfume-1.jpg", "https://example.com/perfume-2.jpg"],
      features: ["50ml Bottle", "Long-lasting Scent", "Cruelty-free", "Gift-ready Packaging"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Complete Makeup Brush Set",
      description: "Professional 15-piece makeup brush set with synthetic bristles.",
      category: "Beauty & Personal Care",
      price: getRandomPrice(29, 89),
      images: ["https://example.com/brushes-1.jpg", "https://example.com/brushes-2.jpg"],
      features: ["15-piece Set", "Synthetic Bristles", "Ergonomic Handles", "Travel Case Included"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    }
  ];
  
  // Toys & Games (10)
  const toysProducts = [
    {
      name: "Educational Building Blocks (100pc)",
      description: "Colorful building blocks for developing creativity and motor skills.",
      category: "Toys & Games",
      price: getRandomPrice(24, 59),
      images: ["https://example.com/blocks-1.jpg", "https://example.com/blocks-2.jpg"],
      features: ["100 Pieces", "Non-toxic Materials", "Storage Container Included", "Compatible with Major Brands"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Strategy Board Game",
      description: "Award-winning strategy board game for 2-5 players.",
      category: "Toys & Games",
      price: getRandomPrice(29, 69),
      images: ["https://example.com/boardgame-1.jpg", "https://example.com/boardgame-2.jpg"],
      features: ["2-5 Players", "60-minute Play Time", "Strategic Gameplay", "Includes Expansion Pack"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Remote Control Car",
      description: "High-speed remote control car with rechargeable battery.",
      category: "Toys & Games",
      price: getRandomPrice(39, 99),
      images: ["https://example.com/rccar-1.jpg", "https://example.com/rccar-2.jpg"],
      features: ["4-wheel Drive", "Rechargeable Battery", "30-minute Run Time", "All-terrain Tires"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Interactive Plush Toy",
      description: "Soft, interactive plush toy that responds to touch and voice.",
      category: "Toys & Games",
      price: getRandomPrice(19, 49),
      images: ["https://example.com/plush-1.jpg", "https://example.com/plush-2.jpg"],
      features: ["Touch Sensors", "Voice Recognition", "50+ Responses", "Washable Exterior"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Wooden Puzzle Set",
      description: "Educational wooden puzzles for development of problem-solving skills.",
      category: "Toys & Games",
      price: getRandomPrice(14, 39),
      images: ["https://example.com/puzzle-1.jpg", "https://example.com/puzzle-2.jpg"],
      features: ["5 Different Puzzles", "Natural Wood Materials", "Storage Box Included", "Ages 3+"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    }
  ];
  
  // Health & Wellness (10)
  const healthProducts = [
    {
      name: "Smart Fitness Tracker",
      description: "Advanced fitness tracker with heart rate monitoring and sleep tracking.",
      category: "Health & Wellness",
      price: getRandomPrice(59, 149),
      images: ["https://example.com/fitnesstracker-1.jpg", "https://example.com/fitnesstracker-2.jpg"],
      features: ["Heart Rate Monitor", "Sleep Tracking", "Water Resistant", "7-day Battery Life"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Essential Oil Diffuser",
      description: "Ultrasonic essential oil diffuser with LED mood lighting.",
      category: "Health & Wellness",
      price: getRandomPrice(24, 59),
      images: ["https://example.com/diffuser-1.jpg", "https://example.com/diffuser-2.jpg"],
      features: ["Ultrasonic Technology", "7 LED Colors", "Auto Shut-off", "Quiet Operation"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Digital Bathroom Scale",
      description: "Precise digital scale with body composition measurements.",
      category: "Health & Wellness",
      price: getRandomPrice(29, 79),
      images: ["https://example.com/scale-1.jpg", "https://example.com/scale-2.jpg"],
      features: ["Body Composition Analysis", "High-precision Sensors", "Smartphone App", "Multiple User Profiles"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Meditation Cushion Set",
      description: "Comfortable meditation cushion and mat set for mindfulness practice.",
      category: "Health & Wellness",
      price: getRandomPrice(39, 89),
      images: ["https://example.com/meditation-1.jpg", "https://example.com/meditation-2.jpg"],
      features: ["Organic Cotton Cover", "Buckwheat Hull Filling", "Carrying Handle", "Machine Washable Cover"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Home Massage Tool",
      description: "Deep tissue massage tool for relieving muscle tension and soreness.",
      category: "Health & Wellness",
      price: getRandomPrice(49, 129),
      images: ["https://example.com/massage-1.jpg", "https://example.com/massage-2.jpg"],
      features: ["Multiple Intensity Levels", "Interchangeable Heads", "Rechargeable Battery", "Quiet Operation"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    }
  ];
  
  // Automotive (10)
  const automotiveProducts = [
    {
      name: "Bluetooth Car Adapter",
      description: "Add Bluetooth functionality to any car with this easy-to-use adapter.",
      category: "Automotive",
      price: getRandomPrice(19, 49),
      images: ["https://example.com/caradapter-1.jpg", "https://example.com/caradapter-2.jpg"],
      features: ["Bluetooth 5.0", "Hands-free Calling", "Music Streaming", "Voice Assistant Support"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Dash Cam Pro",
      description: "High-definition dash cam with night vision and motion detection.",
      category: "Automotive",
      price: getRandomPrice(59, 149),
      images: ["https://example.com/dashcam-1.jpg", "https://example.com/dashcam-2.jpg"],
      features: ["1080p HD Recording", "Night Vision", "Motion Detection", "Loop Recording"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Car Jump Starter",
      description: "Portable jump starter and power bank for emergency vehicle starts.",
      category: "Automotive",
      price: getRandomPrice(49, 129),
      images: ["https://example.com/jumpstarter-1.jpg", "https://example.com/jumpstarter-2.jpg"],
      features: ["Jump Start Capability", "LED Flashlight", "USB Charging Ports", "Compact Design"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Premium Car Wax Kit",
      description: "Complete car wax kit for professional-level shine and protection.",
      category: "Automotive",
      price: getRandomPrice(29, 79),
      images: ["https://example.com/carwax-1.jpg", "https://example.com/carwax-2.jpg"],
      features: ["Long-lasting Protection", "UV Resistant", "Application Tools Included", "Safe for All Paint Types"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Universal Roof Rack",
      description: "Adjustable roof rack system for carrying bikes, kayaks, or cargo.",
      category: "Automotive",
      price: getRandomPrice(89, 199),
      images: ["https://example.com/roofrack-1.jpg", "https://example.com/roofrack-2.jpg"],
      features: ["Adjustable Width", "150 lb Capacity", "Aerodynamic Design", "Tool-free Installation"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    }
  ];
  
  // Pet Supplies (10)
  const petProducts = [
    {
      name: "Automatic Pet Feeder",
      description: "Programmable pet feeder with portion control and scheduling.",
      category: "Pet Supplies",
      price: getRandomPrice(49, 129),
      images: ["https://example.com/petfeeder-1.jpg", "https://example.com/petfeeder-2.jpg"],
      features: ["Programmable Schedule", "Portion Control", "Voice Recording", "Battery Backup"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Orthopedic Pet Bed",
      description: "Memory foam pet bed for joint support and comfort.",
      category: "Pet Supplies",
      price: getRandomPrice(39, 99),
      images: ["https://example.com/petbed-1.jpg", "https://example.com/petbed-2.jpg"],
      features: ["Memory Foam", "Waterproof Liner", "Machine Washable Cover", "Non-slip Bottom"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Interactive Pet Toy",
      description: "Engaging interactive toy to keep pets entertained and active.",
      category: "Pet Supplies",
      price: getRandomPrice(19, 49),
      images: ["https://example.com/pettoy-1.jpg", "https://example.com/pettoy-2.jpg"],
      features: ["Treat Dispensing", "Adjustable Difficulty", "Durable Materials", "Easy to Clean"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Pet GPS Tracker",
      description: "Real-time GPS tracker for monitoring your pet's location.",
      category: "Pet Supplies",
      price: getRandomPrice(59, 129),
      images: ["https://example.com/petgps-1.jpg", "https://example.com/petgps-2.jpg"],
      features: ["Real-time Tracking", "Geo-fencing", "Activity Monitoring", "Waterproof Design"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    },
    {
      name: "Premium Pet Carrier",
      description: "Comfortable and secure pet carrier for travel and vet visits.",
      category: "Pet Supplies",
      price: getRandomPrice(29, 89),
      images: ["https://example.com/petcarrier-1.jpg", "https://example.com/petcarrier-2.jpg"],
      features: ["Airline Approved", "Ventilated Design", "Padded Interior", "Security Locks"],
      inStock: getRandomBoolean(),
      reviews: getRandomReviews(Math.floor(Math.random() * 5) + 1)
    }
  ];
  
  // Combine all product categories
  return [
    ...electronicsProducts,
    ...homeProducts,
    ...bookProducts,
    ...clothingProducts,
    ...sportsProducts,
    ...beautyProducts,
    ...toysProducts,
    ...healthProducts,
    ...automotiveProducts,
    ...petProducts
  ];
};

// Connect to MongoDB directly in the script
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully for seeding');
    return true;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    return false;
  }
};

// Seed the database
const seedDatabase = async () => {
  try {
    // Ensure DB connection
    const connected = await connectDB();
    if (!connected) {
      console.error('Exiting due to database connection failure');
      process.exit(1);
    }
    
    // Clear existing data
    console.log('Clearing existing data...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('Previous data cleared');
    
    // Insert categories
    console.log('Inserting categories...');
    const insertedCategories = await Category.insertMany(categories);
    console.log(`${insertedCategories.length} categories inserted`);
    
    // Generate products
    const products = generateProducts();
    console.log(`Generated ${products.length} products for seeding`);
    
    // Insert products in batches to avoid overwhelming the database
    console.log('Inserting products...');
    let insertedCount = 0;
    const batchSize = 10;
    
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      try {
        const result = await Product.insertMany(batch, { ordered: false });
        insertedCount += result.length;
        console.log(`Batch inserted: ${i/batchSize + 1}/${Math.ceil(products.length/batchSize)}`);
      } catch (error) {
        console.error(`Error inserting batch ${i/batchSize + 1}:`, error.message);
      }
    }
    
    console.log(`${insertedCount} out of ${products.length} products inserted`);
    console.log('Database seeding complete');
    
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    // Close the connection after a short delay to ensure all operations complete
    setTimeout(() => {
      mongoose.connection.close();
      console.log('Database connection closed');
      process.exit(0);
    }, 1000);
  }
};

// Run the seed function
seedDatabase();