const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser'); // Middleware to parse JSON request bodies
const userRoutes = require('./routes/userRoutes'); // Ensure this is correctly pointing to your userRoutes.js file
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const app = express(); // Define 'app' before using it
const port = 3001;

// Middleware for static files and JSON parsing
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb+srv://lilachshekter:5rX3jJ3e@cluster0.6ctfz.mongodb.net/shop');
    console.log("Connected to MongoDB with mongoose");

    // Add any additional operations on the database if needed

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Routes
app.use('/api', userRoutes); // Define routes for API
app.use('/api', productRoutes);
app.use('/api', cartRoutes);


// Define the home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/home.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// Connect to MongoDB
connectToMongoDB();
