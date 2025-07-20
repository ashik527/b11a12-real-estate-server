const express = require('express');
const { confirmPayment } = require('../controllers/paymentController');

const router = express.Router();

// Dummy confirm route
router.patch('/confirm/:id', confirmPayment);

module.exports = router;
