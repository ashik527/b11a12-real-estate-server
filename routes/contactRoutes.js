const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
