const socket = require('socket.io');
const io = socket();
const ObjectId = require('mongoose').Types.ObjectId;

// Models:
const Account = require('../models/Account');
const FriendRequest = require('../models/FriendRequest');

// Socket Middleware:

let clientStore = {};

/*
Console Actions
*/
function printConnectedClients() {
  console.log('Clients Currently Conencted: ')
  for (var key in clientStore) {
    for (i = 0; i < clientStore[key].length; i++) {
      console.log(clientStore[key][i].id);
    }
  }
}

/*
Socket Endpoints!
*/

// Connect Event:
io.on('connection', (client) => {
  console.log('Connection Established On', client.id);
  // client.emit('message');

  let hashString;

  // MUST RUN: CONNECTION_UPDATE SOCKET_ENDPOINT TO INITIALIZE REDUX CLIENT BEFORE FURTHER SOCKET ENDPOINT QUERYING.
  client.on('connection_update', (data) => {
    hashString = data.acc_data._id;
    if (!(`${hashString}` in clientStore)) {
      clientStore[`${hashString}`] = [client];
    }
    else if (clientStore[`${hashString}`].length == 0) {
      clientStore[`${hashString}`].push(client);
    }
    printConnectedClients();
  })

  // SEND FRIEND REQUEST HANDLER
  client.on('SEND_FRIEND_REQUEST', async (data) => {
    console.log('SEND_FRIEND_REQUEST', data);
    let sender_mongo_id = ObjectId(data.sender_id);
    let reciever_mongo_id = ObjectId(data.reciever_id);
    let fr_id = new ObjectId();
    // Go onto both data.sender_id and data.reciever_id and add a reference of one another.
    let new_fr = new FriendRequest({
      _id: fr_id,
      fr_sender_id: sender_mongo_id,
      fr_reciever_id: reciever_mongo_id
    });
    try {
      await new_fr.save();
    } catch (err) {
      client.emit('message', {
        socketMessageType: 'SAVE_ERROR',
        message: 'Failed to create new Friend Request and save to the database'
      })
    }
    try {
      await Account.findByIdAndUpdate(reciever_mongo_id, { $push: { acc_freqs: fr_id } });
    } catch (err) {
      client.emit('message', {
        socketMessageType: 'INVALID_UPDATE_ERROR',
        message: 'Failed to update reciever friend request attribute'
      })
    }
  })

  // DELETE FRIEND REQUEST HANDLER
  client.on('DELETE_FRIEND_REQEUST', async (data) => {
    console.log('DELETE_FRIEND_REQUEST', data);

    let sender_mongo_id = ObjectId(data.sender_id);
    let reciever_mongo_id = ObjectId(data.reciever_id);

    let deleted_fr;
    // Delete Corresponding Friend Request between two people.
    try {
      deleted_fr = await FriendRequest.findByIdAndRemove({ fr_reciever_id: reciever_mongo_id, fr_sender_id: sender_mongo_id })
    } catch (err) {
      client.emit('message', {
        socketMessageType: 'DELETE_ERROR',
        message: 'Failed to delete Friend Request and save to the database'
      })
    }
    // Ensure relational integrity by removing the corresponding reference for the friend request.
    try {
      await Account.findByIdAndUpdate(reciever_mongo_id, { $pullAll: { acc_freqs: deleted_fr._id } });
    } catch (err) {
      client.emit('message', {
        socketMessageType: 'INVALID_UPDATE_ERROR',
        message: 'Failed to update reciever friend request attribute'
      })
    }
  })

  // REMOVE FRIEND FROM FRIEND LIST REQUEST HANDLER 
  client.on('DELETE_FRIEND', (data) => {
    console.log('DELETE_FRIEND', data);
  })

  // Disconnect Event.
  client.on('disconnect', (reason, var2) => {
    // Remove the connected client from key/value pair on server.
    clientStore[`${hashString}`].splice(clientStore[`${hashString}`].indexOf(client));
    console.log('Disconnected From', client.id, 'Due To:', reason);
    printConnectedClients();
  })
})

module.exports = io;