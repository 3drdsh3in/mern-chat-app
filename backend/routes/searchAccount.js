const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

// models:
const Account = require('../models/Account');

const FriendRequest = require('../models/FriendRequest');

router.post('/getFriends/:id', async (req, res) => {
  console.log(req.body);
  let acc_id = new ObjectId(req.params.id);

  try {
    // Get sender's account data
    let userAccount = await Account.findById(acc_id).populate('acc_freqs').lean();
    // Get all other account data
    let accountDocs = await Account.find({ $and: [{ '_id': { $ne: acc_id } }, { 'acc_usrname': { $regex: req.body.userNameQuery } }] }).lean();
    // let frDocs = await FriendRequest.find({ $or: [{ 'fr_sender_id': acc_id }, { 'fr_reciever_id': acc_id }] });

    // console.log('Friend Request Docs:', frDocs.length);

    let userFriends = userAccount.acc_friends
    let userFriendReqs = userAccount.acc_freqs;

    for (i = 0; i < accountDocs.length; i++) {
      if (userFriends.length == 0 && userFriendReqs == 0) {
        accountDocs[i]['frStatus'] = 'UNSENT';
      }
      let isUnsent = true;
      // IF account in accountDoc[i] is a reciever of the friend request
      for (j = 0; j < userFriends.length; j++) {
        if (accountDocs[i]._id == userFriendReqs[j].fr_reciever_id) {
          accountDocs[i]['frStatus'] = 'FRIENDS';
          isUnsent = false;
          break;
          // Somehow needs to skip further computation below
        }
      }
      // Already found that the Account is Friends with the user. (Avoids further computational resources)
      if (!isUnsent) {
        continue;
      }
      for (j = 0; j < userFriendReqs.length; j++) {
        // IF account in accountDoc[i] is a reciever of the friend request sent by
        // the account corresponding to req.params.id 
        // - Mark accountDocs[i].frStatus = 'SENT'
        if (accountDocs[i]._id == userFriendReqs[j].fr_reciever_id) {
          accountDocs[i]['frStatus'] = 'SENT';
          isUnsent = false;
          break;
          // Somehow needs to skip further computation below
        }
      }
      // - Mark accountDocs[i].frStatus = 'UNSENT'
      if (isUnsent) {
        accountDocs[i]['frStatus'] = 'UNSENT';
      }
      // IF account in accountDoc[i] does not have a friendRequest sent to it by the userAccount in req.body.id
      // - Mark accountDocs[i].frStatus = 'UNSENT';
    }
    // console.log('Account Docs:', accountDocs.length);
    // console.log(accountDocs);
    // console.log(userFriends.length == 0 && userFriendReqs == 0);
    console.log(accountDocs[0]['frStatus']);
    res.json(accountDocs);
  } catch (err) {
    res.json(err);
  }
})

module.exports = router;