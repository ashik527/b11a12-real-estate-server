const Offer = require('../models/Offer');
const Wishlist = require('../models/Wishlist');

// Confirm dummy payment and remove from wishlist
exports.confirmPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionId } = req.body;

    // Step 1: Find and update the offer
    const updated = await Offer.findByIdAndUpdate(
      id,
      {
        status: 'bought',
        transactionId,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    // Step 2: Remove from wishlist
    await Wishlist.findOneAndDelete({
      userEmail: updated.userEmail,
      propertyId: updated.propertyId,
    });

    res.json(updated);
  } catch (err) {
    console.error(' Confirm Payment Error:', err);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
};
