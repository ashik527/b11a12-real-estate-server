const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    userEmail: String,
    userName: String,
    userImage: String,
    propertyId: String,
    propertyTitle: String,
    location: String,
    image: String,
    priceMin: Number,
    priceMax: Number,
    agentName: String,
    agentEmail: String,
    offerAmount: Number,
    buyingDate: String,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'bought'],
      default: 'pending',
    },
    transactionId: String,
  },
  { timestamps: true }
);

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
