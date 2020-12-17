const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const md5 = require('md5');

// Schemas:
const Account = require('../models/Account');

// Middleware:
const accountValidation = require('../middleware/accountValidation');

router.post('/login', (req, res) => {
  console.log(req.body);
  
  // Find Account Info On DB exists and validate enterred info correlates.
  //    - If yes, redirect page to messaging component. (Return Account Information to client.)
  //    - If no, return json data to prompt a login error.

  res.json({ fuck: 'you' });
})

router.post('/newaccount', accountValidation, (req, res) => {
  let newAcc = new Account({
    _id: new mongo.ObjectID(),
    acc_usrname: req.body.nausername,
    acc_email: req.body.naemailaddr,
    acc_password: md5(req.body.napassword1 + process.env.PASSWORD_SALT),
    acc_dob: new Date(`${req.body.nadobyear}-${req.body.nadobmonth}-${req.body.nadobday}`),
    acc_gender: req.body.nagender,
    acc_fname: req.body.nafname,
    acc_lname: req.body.nalname,
    acc_bio: "Hello!"
  });
  newAcc.save((err) => {
    if (err) {
      res.json(err);
    }
    res.json(newAcc);
  });
})

module.exports = router;