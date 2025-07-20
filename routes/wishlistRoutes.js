const express = require('express');
const {
  addToWishlist,
  getWishlist,
  makeOffer,
  updateOfferStatus,
  confirmPayment,
  deleteWishlistItem,
  getWishlistItem,
} = require('../controllers/wishlistController');

const router = express.Router();

router.post('/', addToWishlist);
router.get('/', getWishlist);
router.get('/:id', getWishlistItem);
router.patch('/offer/:id', makeOffer);
router.patch('/status/:id', updateOfferStatus);
router.patch('/confirm/:id', confirmPayment);
router.delete('/:id', deleteWishlistItem);

module.exports = router;
