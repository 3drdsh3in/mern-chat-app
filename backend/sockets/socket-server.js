const socket = require('socket.io');
const io = socket();
const ObjectId = require('mongoose').Types.ObjectId;

/*
Models:
*/
const Account = require('../models/Account');
const FriendRequest = require('../models/FriendRequest');

/*
Socket Middleware:
*/

/*
Hashmap to access corresponding clients
*/
let clientStore = {};

/*
Console Actions
*/
function displayConnectedClients() {
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
    displayConnectedClients();
  })

  // SEND FRIEND REQUEST HANDLER
  client.on('SEND_FRIEND_REQUEST', async (data) => {
    let sender_mongo_id = ObjectId(data.sender_id);
    let reciever_mongo_id = ObjectId(data.reciever_id);

    // Check if there are any clients with corresponding reciever_id. If there are, emit the new notification to it, dynamically.
    if (Array.isArray(clientStore[`${data.sender_id}`])) {
      for (recievingClient in clientStore[`${data.sender_id}`]) {
        recievingClient.emit('message', {
          messageType: 'NEW_FRIEND_REQUEST',
          message: data
        })
      }
    }
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
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
    try {
      await Account.findByIdAndUpdate(reciever_mongo_id, { $push: { acc_freqs: fr_id } });
    } catch (err) {
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
  })

  // DELETE FRIEND REQUEST HANDLER
  client.on('DELETE_FRIEND_REQUEST', async (data) => {
    let sender_mongo_id = ObjectId(data.sender_id);
    let reciever_mongo_id = ObjectId(data.reciever_id);

    let deleted_fr;
    // Delete Corresponding Friend Request between two people.
    try {
      deleted_fr = await FriendRequest.findOneAndDelete({ fr_reciever_id: reciever_mongo_id, fr_sender_id: sender_mongo_id });
    } catch (err) {
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
    // Ensure relational integrity by removing the corresponding reference for the friend request.
    try {
      await Account.findByIdAndUpdate(reciever_mongo_id, { $pullAll: { acc_freqs: [deleted_fr._id] } }, (err) => {
        console.log(err);
      });
    } catch (err) {
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: [err, 'YEET']
      })
    }

    // Search clientStore for any potential reciever Id clients & Update I
  })

  // REMOVE FRIEND FROM FRIEND LIST REQUEST HANDLER 
  client.on('DELETE_FRIEND', (data) => {
    console.log('DELETE_FRIEND', data);
  })

  // Disconnect Event.
  client.on('disconnect', (reason) => {
    // Remove the connected client from key/value pair on server.
    clientStore[`${hashString}`].splice(clientStore[`${hashString}`].indexOf(client));
    console.log('Disconnected From', client.id, 'Due To:', reason);
    displayConnectedClients();
  })

  client.on('FR_ACCEPT', (data) => {
    console.log('FR_ACCEPT:', data)
  })
})

module.exports = io;