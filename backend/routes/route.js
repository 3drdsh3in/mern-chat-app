
const express = require('express');
const router = express.Router();

// Schemas:
const model = require('../models/model');

router.get('/', (req, res) => {
  res.json({ fuck: 'you' });
})

module.exports = router;