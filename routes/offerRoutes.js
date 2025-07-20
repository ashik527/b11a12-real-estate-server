// routes/offerRoutes.js
const express = require('express');
const Offer = require('../models/Offer');
const {
  createOffer,
  getAgentOffers,
  getUserOffers,
  getBought,
  updateOfferStatus,
  confirmPayment,
  getSoldProperties,
} = require('../controllers/offerController');

const router = express.Router();

router.post('/', createOffer);                  // User creates an offer
router.get('/', getAgentOffers);                // Agent views incoming offers
router.get('/user', getUserOffers);             // User views own offers
router.get('/bought', getBought);               // User views all bought/pending/accepted offers
router.get('/sold', getSoldProperties);
router.patch('/status/:id', updateOfferStatus); // Agent accepts/rejects an offer
router.patch('/confirm/:id', confirmPayment);   // User confirms payment
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Offer.findByIdAndDelete(id);
    res.json({ message: 'Offer deleted', deleted });
  } catch (err) {
    console.error('Delete Offer Error:', err);
    res.status(500).json({ error: 'Failed to delete offer' });
  }
});

module.exports = router;
