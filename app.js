const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors

const userRoutes = require('./routes/user');
const wishlistRoutes = require('./routes/wishlist');

dotenv.config();
const app = express();

const connectDB = require('./config/db');
connectDB();

app.use(cors()); // Enable CORS
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/user', userRoutes);
app.use('/wishlist', wishlistRoutes);

module.exports = app;

