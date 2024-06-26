
// Load environment variables from .envy file
require('dotenv').config();


// Require necessary modules
const express = require('express');  // Importing the Express framework to create a server.
const mongoose = require('mongoose'); //Importing Mongoose to interact with MongoDB.

const app = express();
const userRoutes = require('./routes/users'); 
const itemRoutes = require('./routes/items');

// Middlewares
app.use(express.static('public')); // Serve static files from 'public' directory
app.use(express.json()); // Parse JSON bodies for POST requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies for POST requests
app.set('view engine', 'ejs'); // Set EJS as the view engine


// Connect to MongoDB using Mongoose
const mongoURI = process.env.MONGOURI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/users', userRoutes); // Route middleware for '/users' using userRoutes
app.use('/items', itemRoutes); // Route middleware for '/items' using itemRoutes

// Define port
const port = process.env.PORT || 3000;


app.get('/',(req, res) => {
    res.redirect('/items');
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


