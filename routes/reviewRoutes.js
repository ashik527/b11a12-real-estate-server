// routes/reviewRoutes.js
const express = require('express');
const {
  addReview,
  getPropertyReviews,
  getMyReviews,
  getAllReviews,
  deleteReview,
} = require('../controllers/reviewController');

const router = express.Router();

router.post('/', addReview);
router.get('/', getAllReviews); // Admin: all reviews
router.get('/property/:id', getPropertyReviews);
router.get('/my', getMyReviews);
router.delete('/:id', deleteReview);

module.exports = router;
