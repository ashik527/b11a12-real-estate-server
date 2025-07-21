const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const offerRoutes = require('./routes/offerRoutes');

// Create express app
const app = express();
const port = process.env.PORT || 5000;

//  CORS config for frontend
const allowedOrigins = ['https://b11a12-real-estate.netlify.app'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/properties', propertyRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/reviews', reviewRoutes);
app.use('/payments', paymentRoutes);
app.use('/contact', contactRoutes);
app.use('/offers', offerRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Real Estate Platform API is running');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
