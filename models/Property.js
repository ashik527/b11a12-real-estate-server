// models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    image: String,
    priceMin: Number,
    priceMax: Number,
    agentName: String,
    agentEmail: String,
    agentImage: String,
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    advertised: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
