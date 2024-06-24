
const express = require('express');  // Importing the Express framework to create a server.
const mongoose = require('mongoose'); //Importing Mongoose to interact with MongoDB.
const dotenv = require('dotenv'); //Importing dotenv to manage environment variables.

const app = express();
const itemRoutes = require('./routes/items');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/items', itemRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

