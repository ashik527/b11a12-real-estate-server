// controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const exists = await Wishlist.findOne({
      userEmail: req.body.userEmail,
      propertyId: req.body.propertyId,
    });
    if (exists) return res.status(409).json({ error: 'Already wishlisted' });

    const saved = await Wishlist.create(req.body);
    res.status(201).json(saved);
  } catch {
    res.status(500).json({ error: 'Failed to wishlist' });
  }
};

// Get wishlist for a user
exports.getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({ userEmail: req.query.email });
    res.json(items);
  } catch {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
};
// For making offer
exports.getWishlistItem = async (req, res) => {
  try {
    const item = await Wishlist.findById(req.params.id);
    res.json(item);
  } catch {
    res.status(404).json({ error: 'Wishlist item not found' });
  }
};

// Delete Wishlist item
exports.deleteWishlistItem = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed from wishlist' });
  } catch {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};


// Make offer
exports.makeOffer = async (req, res) => {
  const { id } = req.params;
  const { offerAmount, buyingDate, agentEmail } = req.body;

  try {
    const updated = await Wishlist.findByIdAndUpdate(
      id,
      {
        offerAmount,
        buyingDate,
        agentEmail,
        status: 'pending'
      },
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to make offer' });
  }
};

// Update offer status (agent)
exports.updateOfferStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    console.log('Updating Offer Status:', { id, status });

    const updated = await Wishlist.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    if (status === 'accepted') {
      // Reject other offers for the same property
      await Wishlist.updateMany(
        {
          _id: { $ne: id },
          propertyId: updated.propertyId,
        },
        { $set: { status: 'rejected' } }
      );
    }

    res.json(updated);
  } catch (err) {
    console.error('Status Update Error:', err);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

// Set transaction ID after payment
exports.confirmPayment = async (req, res) => {
  const { id } = req.params;
  const { transactionId } = req.body;
  try {
    const updated = await Wishlist.findByIdAndUpdate(
      id,
      { status: 'bought', transactionId },
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
};
