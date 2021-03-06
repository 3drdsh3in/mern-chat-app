const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

// Schemas:
const Account = require('../models/Account');
const Message = require('../models/Message');

// Middleware:
const accountValidation = require('../middleware/accountValidation');

router.post('/login', (req, res) => {
  // Authentication:
  Account.find({
    acc_usrname: req.body.username,
    acc_password: md5(req.body.password + process.env.PASSWORD_SALT)
  },
    (err, acc) => {
      if (err) {
        res.json(err);
      }
      else if (acc.length > 1) {
        res.json({
          code: "TOO_MANY_ACCOUNTS",
          msg: "ACCOUNT NOT FOUND"
        })
      }
      else if (acc.length == 0) {
        res.json({
          code: "NOT_FOUND",
          msg: "ACCOUNT NOT FOUND"
        })
      }
      else {

        data = {
          acc_usrname: req.body.username,
          acc_password: md5(req.body.password + process.env.PASSWORD_SALT)
        }

        // New accessToken
        let accessToken = jwt.sign(
          data,
          process.env.SECRET_ACCESS_TOKEN,
          {
            algorithm: 'HS256',
            // expiresIn: '15s',
            expiresIn: '1h'
          });
        // Save Refresh Token Onto DB
        let refreshToken = jwt.sign(
          data,
          process.env.SECRET_REFRESH_TOKEN,
          { algorithm: 'HS256' });
        res.json({
          account: acc,
          accessToken: accessToken,
          refreshToken: refreshToken
        });
      }
    })
    .populate({
      path: 'acc_freqs',
      populate: {
        path: 'fr_sender_id',
        model: 'Account'
      }
    })
    .populate({
      path: 'acc_grps',
      populate: {
        path: 'g_messages',
        model: 'Message',
        populate: {
          path: 'm_sender',
          model: 'Account'
        }
      }
    })
    // .populate('acc_grps')
    .populate('acc_friends') // Comment out if causing bugs

  // Find Account Info On DB exists and validate enterred info correlates.
  //    - If yes, redirect page to messaging component. (Return Account Information to client.)
  //    - If no, return json data to prompt a login error.
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
    acc_bio: "Hello!",
    acc_friends: [],
    acc_grps: [],
    acc_theme: Math.floor(Math.random() * 16777215).toString(16)
  });
  newAcc.save((err) => {
    if (err) {
      res.json(err);
    }
    res.json(newAcc);
  });
})

module.exports = router;