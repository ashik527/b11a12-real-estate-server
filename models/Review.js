const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    userEmail: String,
    userName: String,
    userImage: String,
    propertyId: String,
    propertyTitle: String,
    agentName: String,
    comment: String,
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
