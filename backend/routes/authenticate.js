const express = require('express');
const router = express.Router();

// Schemas:
// const model = require('../models/model');

router.post('/login', (req, res) => {
  console.log(req.body);
  // Find Account Info On DB exists and validate enterred info correlates.
  //    - If yes, redirect page to messaging component. (Return Account Information to client.)
  //    - If no, return json data to prompt a login error.
  res.json({ fuck: 'you' });
})

router.post('/newaccount', (req, res) => {
  console.log(req.body);
  // Post new Account details to the DB.
  //    - If an account under same username as the POSTED data exists (If no, then POST => Send Data back to client to close createAccount modal)
  //    - If the POSTED data has the same username, return json data to prompt a login error.
  //    - If the POSTED data has already has it's email registered, return json data to prompt a login error.

  res.json({ fuck: 'you' });
})

module.exports = router;