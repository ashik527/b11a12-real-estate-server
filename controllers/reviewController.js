// controllers/reviewController.js
const Review = require('../models/Review');

// Add review
exports.addReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch {
    res.status(500).json({ error: 'Failed to add review' });
  }
};

// Get all reviews for a property
exports.getPropertyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ propertyId: req.params.id });
    res.json(reviews);
  } catch {
    res.status(500).json({ error: 'Failed to get reviews' });
  }
};

// Get all reviews for Admin
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// Get own reviews
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userEmail: req.query.email });
    res.json(reviews);
  } catch {
    res.status(500).json({ error: 'Failed to fetch your reviews' });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
