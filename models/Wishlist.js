// models/Wishlist.js
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    userEmail: String,
    propertyId: String,
    propertyTitle: String,
    location: String,
    image: String,
    agentName: String,
    agentEmail: String,
    agentImage: String,
    priceMin: Number,
    priceMax: Number,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'bought'],
    },
    offerAmount: Number,
    transactionId: String,
    buyingDate: String,
  },
  { timestamps: true }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;
