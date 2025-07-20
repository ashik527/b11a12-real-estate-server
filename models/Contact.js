const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  agentEmail: String,
  userEmail: String,
  propertyId: String,
  message: String,
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
