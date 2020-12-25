const express = require('express');
const router = express.Router();

// models:
const Account = require('../models/Account');
const FriendRequest = require('../models/FriendRequest');

router.post('/getFriends/:id', (req, res) => {
  Account.find({ acc_id: req.params.id }, (err, acc) => {
    if (err) return res.json(err);
      
    res.json(acc);
  })
  res.json({});
})

module.exports = router;