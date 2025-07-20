// routes/propertyRoutes.js
const express = require('express');
const {
  addProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
  getAllAgentProperties,
  verifyOrRejectProperty,
  getVerifiedProperties,
  getPropertyById,
  advertiseProperty,
  getAdvertised,
} = require('../controllers/propertyController');

const router = express.Router();

// Agent
router.post('/add', addProperty);
router.get('/my', getMyProperties);
router.put('/update/:id', updateProperty);
router.delete('/delete/:id', deleteProperty);

// Admin
router.get('/all', getAllAgentProperties);
router.patch('/verify/:id', verifyOrRejectProperty);
router.patch('/advertise/:id', advertiseProperty);
router.get('/advertised', getAdvertised);

// Public
router.get('/verified', getVerifiedProperties);
router.get('/:id', getPropertyById);

module.exports = router;
