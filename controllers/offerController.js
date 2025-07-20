// controllers/offerController.js
const Offer = require('../models/Offer');
const Wishlist = require('../models/Wishlist');

//  Create a new offer
exports.createOffer = async (req, res) => {
  try {
    const offer = await Offer.create({ ...req.body, status: 'pending' });
    res.status(201).json(offer);
  } catch (err) {
    console.error('❌ Create Offer Error:', err);
    res.status(500).json({ error: 'Failed to make offer' });
  }
};

//  Get incoming offers for an agent
exports.getAgentOffers = async (req, res) => {
  try {
    const { agentEmail } = req.query;
    const offers = await Offer.find({ agentEmail });
    res.json(offers);
  } catch (err) {
    console.error('❌ Get Agent Offers Error:', err);
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
};

//  Get all offers made by a user
exports.getUserOffers = async (req, res) => {
  try {
    const { email } = req.query;
    const offers = await Offer.find({ userEmail: email });
    res.json(offers);
  } catch (err) {
    console.error('❌ Get User Offers Error:', err);
    res.status(500).json({ error: 'Failed to fetch user offers' });
  }
};

//  Get all offers (pending/accepted/rejected) for a user for "Property Bought" page
exports.getBought = async (req, res) => {
  try {
    const { email } = req.query;
    const offers = await Offer.find({
      userEmail: email,
      status: { $in: ['pending', 'accepted', 'rejected', 'bought'] },
    });
    res.json(offers);
  } catch (err) {
    console.error('❌ Get Bought Offers Error:', err);
    res.status(500).json({ error: 'Failed to fetch bought offers' });
  }
};

//  Update offer status (agent accepts/rejects)
exports.updateOfferStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Offer.findByIdAndUpdate(id, { status }, { new: true });

    if (status === 'accepted') {
      // Reject all other offers for this property
      await Offer.updateMany(
        { _id: { $ne: id }, propertyId: updated.propertyId },
        { $set: { status: 'rejected' } }
      );
    }

    res.json(updated);
  } catch (err) {
    console.error('❌ Update Status Error:', err);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

//  Confirm payment and update offer to 'bought'
exports.confirmPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionId } = req.body;

    const updated = await Offer.findByIdAndUpdate(
      id,
      { status: 'bought', transactionId },
      { new: true }
    );

    // Remove the item from wishlist
    await Wishlist.findOneAndDelete({
      userEmail: updated.userEmail,
      propertyId: updated.propertyId,
    });

    res.json(updated);
  } catch (err) {
    console.error('❌ Confirm Payment Error:', err);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
};

// Get all sold properties for an agent
exports.getSoldProperties = async (req, res) => {
  try {
    const { agentEmail } = req.query;
    const soldOffers = await Offer.find({ agentEmail, status: 'bought' });
    res.json(soldOffers);
  } catch (err) {
    console.error('❌ Fetch Sold Properties Error:', err);
    res.status(500).json({ error: 'Failed to fetch sold properties' });
  }
};
