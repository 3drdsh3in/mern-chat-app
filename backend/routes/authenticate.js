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
  if (req.body.napassword1 != req.body.napassword2) {

  }

  // Post new Account details to the DB.
  //    - If an account under same username as the POSTED data exists (If no, then POST => Send Data back to client to close createAccount modal)
  //    - If the POSTED data has the same username, return json data to prompt a login error.
  //    - If the POSTED data has already has it's email registered, return json data to prompt a login error.
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