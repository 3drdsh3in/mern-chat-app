const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

// models:
const Account = require('../models/Account');

const FriendRequest = require('../models/FriendRequest');
// Params: id - THe logged on user's Id.
router.post('/getFriends/:id', async (req, res) => {
  let acc_id = new ObjectId(req.params.id);

  try {
    // Get sender's account data
    let userAccount = await Account.findById(acc_id).populate('acc_freqs').lean();
    // Get all other account data (The Search Bar Query)
    let accountDocs = await Account.find({ $and: [{ '_id': { $ne: acc_id } }, { 'acc_usrname': { $regex: req.body.userNameQuery } }] }).populate('acc_freqs').lean();
    // let frDocs = await FriendRequest.find({ $or: [{ 'fr_sender_id': acc_id }, { 'fr_reciever_id': acc_id }] });
    // console.log('Friend Request Docs:', frDocs.length);
    let userFriends = userAccount.acc_friends;
    let userFriendRequests = userAccount.acc_freqs;

    for (i = 0; i < accountDocs.length; i++) {
      if (userFriends.length == 0 && accountDocs[i].acc_freqs.length == 0) {
        accountDocs[i]['frStatus'] = 'UNSENT';
        continue;
      }
      let isUnsent = true;
      // IF account in accountDoc[i] is a reciever of the friend request
      for (j = 0; j < userFriends.length; j++) {
        if (accountDocs[i]._id.equals(userFriends[j])) {
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
      for (j = 0; j < accountDocs[i].acc_freqs.length; j++) {
        // IF account in accountDoc[i] is a reciever of the friend request sent by
        // the account corresponding to req.params.id 
        // - Mark accountDocs[i].frStatus = 'SENT'
        if (accountDocs[i].acc_freqs[j].fr_sender_id == req.params.id) {
          accountDocs[i]['frStatus'] = 'SENT';
          isUnsent = false;
          break;
          // Somehow needs to skip further computation below
        }
      }
      if (!isUnsent) {
        continue;
      }
      for (j = 0; j < userFriendRequests.length; j++) {
        if (userFriendRequests[j].fr_sender_id.equals(accountDocs[i]._id)) {
          accountDocs[i]['frStatus'] = 'R_SENT';
          isUnsent = false;
          break;
        }
      }

      if (isUnsent) {
        accountDocs[i]['frStatus'] = 'UNSENT';
      }
      // IF account in accountDoc[i] does not have a friendRequest sent to it by the userAccount in request body's id
      // - Mark accountDocs[i].frStatus = 'UNSENT';
    }
    res.json(accountDocs);
  } catch (err) {
    res.json(err);
  }
})

router.post('/getAccountData/:id', async (req, res) => {
  let acc_id = new ObjectId(req.params.id);

  try {
    // Get sender's account data
    let viewedUserAccount = await Account.findById(acc_id)
      .populate('acc_freqs')
      .populate('acc_grps')
      .populate({
        path: 'acc_friends',
        populate: {
          path: 'acc_freqs',
          model: 'FriendRequest'
        }
      })
      .lean();
    let viewedUserFriends = viewedUserAccount.acc_friends;
    // Get account data of the account we are looking for.
    let clientAccount = await Account.findById(req.body.userId).populate('acc_freqs');
    let clientFriendRequests = clientAccount.acc_freqs;

    if (clientAccount._id.equals(viewedUserAccount._id)) {
      for (i = 0; i < viewedUserFriends.length; i++) {
        viewedUserFriends[i]['frStatus'] = 'FRIENDS'
      }
    } else {
      console.log(clientFriendRequests);
      for (i = 0; i < viewedUserFriends.length; i++) {
        if (viewedUserFriends[i]._id.equals(clientAccount._id)) {
          viewedUserFriends[i]['frStatus'] = 'FRIENDS';
          continue;
        } else if (!viewedUserFriends[i].hasOwnProperty('frStatus')) {
          viewedUserFriends[i]['frStatus'] = 'UNSENT';
        }
        for (j = 0; j < clientFriendRequests.length; j++) {
          console.log(clientFriendRequests[j].fr_sender_id, viewedUserFriends[i]._id);
          if (clientFriendRequests[j].fr_sender_id.equals(viewedUserFriends[i]._id)) {
            viewedUserFriends[i]['frStatus'] = 'R_SENT';
            break;
          }
        }
        for (j = 0; j < viewedUserFriends[i].acc_freqs.length; j++) {
          if (viewedUserFriends[i].acc_freqs[j].fr_sender_id.equals(clientAccount._id)) {
            viewedUserFriends[i]['frStatus'] = 'SENT';
            break;
          }
        }
      }
    }

    res.json(viewedUserAccount);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
})


module.exports = router;