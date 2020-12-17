const Account = require('../models/Account');
/*
This Middleware is used to prevent discrepencies in account generation.
- If an account under same username as the POSTED data exists (If no, then POST => Send Data back to client to close createAccount modal)
- If the POSTED data has the same username, return json data to prompt a login error.
- If the POSTED data has already has it's email registered, return json data to prompt a login error.
*/
async function accountValidation(req, res, next) {
  // Array Tracks all errors.
  let retArr = [];
  // Check if passwords Match.
  if (req.body.napassword1 != req.body.napassword2) {
    retArr.push({
      code: "PASSWORD_MISMATCH",
      msg: "Passwords Do Not Match"
    })
  }
  await Account.find({ acc_email: req.body.naemailaddr }, (err, acc) => {
    if (err) {
      res.json(err);
    } else {
      if (acc.length > 0) {
        retArr.push({
          code: "EMAIL_REGISTERED",
          msg: "Email is already registered"
        })
      }
    }
  })
  await Account.find({ acc_usrname: req.body.nausername }, (err, acc) => {
    if (err) {
      res.json(err);
    } else {
      if (acc.length > 0) {
        retArr.push({
          code: "USERNAME_REGISTERED",
          msg: "Username is already registered"
        })
      }
    }
  })
  // Bad Form
  if (retArr.length > 0) {
    res.status(406).json(retArr);
  } else {
    // Good Form
    next()
  }
}

module.exports = accountValidation;