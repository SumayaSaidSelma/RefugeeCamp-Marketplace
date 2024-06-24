
const express = require('express');  // Importing the Express framework to create a server.
const mongoose = require('mongoose'); //Importing Mongoose to interact with MongoDB.
const dotenv = require('dotenv'); //Importing dotenv to manage environment variables.


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
