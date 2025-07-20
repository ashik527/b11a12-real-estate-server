// controllers/propertyController.js
const Property = require('../models/Property');

// Agent: add property
exports.addProperty = async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json(newProperty);
  } catch {
    res.status(500).json({ error: 'Failed to add property' });
  }
};

// Agent: get own added properties
exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ agentEmail: req.query.email });
    res.json(properties);
  } catch {
    res.status(500).json({ error: 'Failed to fetch agent properties' });
  }
};

// Agent: update property
exports.updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update property' });
  }
};

// Agent: delete property
exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete property' });
  }
};

// Admin: get all agent-added properties
exports.getAllAgentProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

// Admin: verify/reject property
exports.verifyOrRejectProperty = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'verified' or 'rejected'
  try {
    const updated = await Property.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update property status' });
  }
};

// Public: get verified properties only
exports.getVerifiedProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: 'verified' });
    res.json(properties);
  } catch {
    res.status(500).json({ error: 'Failed to fetch verified properties' });
  }
};

// Public: single property detail
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.json(property);
  } catch {
    res.status(500).json({ error: 'Failed to fetch property details' });
  }
};

// Admin: advertise a property
exports.advertiseProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, { advertised: true }, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to advertise property' });
  }
};

// Admin: get advertised properties
exports.getAdvertised = async (req, res) => {
  try {
    const ads = await Property.find({ advertised: true, status: 'verified' });
    res.json(ads);
  } catch {
    res.status(500).json({ error: 'Failed to get advertised properties' });
  }
};
