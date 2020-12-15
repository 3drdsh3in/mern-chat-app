const Account = require('../models/Account');
function accountValidation(req, res, next) {
  if (req.body.napassword1 != req.body.napassword2) {
    res.status(406).json({
      code: 406,
      msg: "Passwords Do Not Match"
    })
  }
  else {
    next()
  }
}

module.exports = accountValidation;