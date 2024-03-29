const socket = require('socket.io');
const io = socket();
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
/*
TODO: (If you average comeback)
1. Modularize socker-server.js into functions like at 1:55
of the YT video https://www.youtube.com/watch?v=-Y_3FUmK33A 
(for maintainability).
2. Modularize server emissions with websockets into relayMessage(target, message) function.
*/

/*
Models:
*/
const Account = require('../models/Account');
const FriendRequest = require('../models/FriendRequest');
const ChatGroup = require('../models/ChatGroup');
const Message = require('../models/Message');

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
  console.log('Clients Currently Connected: ')
  for (var key in clientStore) {
    for (i = 0; i < clientStore[key].length; i++) {
      console.log(key, ':', clientStore[key][i].id);
    }
  }
}
/*
Directed Emit Actions
*/
function relayMessage(target, message) {
  // finds the corresponding target & sends the input message

}

/*
Socket Endpoints
*/

// Connect Event:
io.on('connection', (client) => {
  console.log('Connection Established On', client.id);

  client.on('JWT_AUTH', async (data) => {
    console.log('JWT_AUTH');
    try {
      // async await forces the verification to complete before allowing success handler to run its natural course.
      let decoded = await jwt.verify(data.accessToken, process.env.SECRET_ACCESS_TOKEN);
      client.emit('JWT_AUTH_SUCCESS')
    } catch (err) {
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
  })

  let hashString;
  // MUST RUN: CONNECTION_UPDATE SOCKET_ENDPOINT TO INITIALIZE REDUX CLIENT BEFORE FURTHER SOCKET ENDPOINT QUERYING.
  client.on('connection_update', (data) => {
    hashString = data.acc_data._id;
    if (!(`${hashString}` in clientStore)) {
      clientStore[`${hashString}`] = [client];
    }
    else if (Array.isArray(clientStore[`${hashString}`])) {
      clientStore[`${hashString}`].push(client);
    }
    displayConnectedClients();
  })

  // SEND FRIEND REQUEST HANDLER
  client.on('SEND_FRIEND_REQUEST', async (data) => {
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

    // Check if there are any clients with corresponding reciever_id. If there are, emit the new notification to it, dynamically.
    // console.log('CLIENTS IN STORE:', clientStore[`${data.reciever_id}`]);
    if (clientStore[`${data.reciever_id}`] != undefined && Array.isArray(clientStore[`${data.reciever_id}`]) && clientStore[`${data.reciever_id}`].length > 0) {
      // Fetch the newly created FriendRequest JSON object from the database and populate its 'fr_sender_id' field with the corresponding sender data
      let new_client_fr = await FriendRequest.findById(fr_id).populate('fr_sender_id').lean(); // use lean() as no modifications are needed.

      // Go through the corresponding reciever_id clients and update each of the client's redux state with the new FriendRequest data.
      for (i = 0; i < clientStore[`${data.reciever_id}`].length; i++) {
        clientStore[`${data.reciever_id}`][i].emit('NEW_FRIEND_REQUEST', {
          messageType: 'UPDATE_ACCOUNT_DETAILS',
          message: new_client_fr
        })
      }
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
      await Account.findByIdAndUpdate(reciever_mongo_id, { $pullAll: { acc_freqs: [deleted_fr._id] } });
    } catch (err) {
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }

    // Search clientStore for any potential reciever Id clients & Update clients
    if (clientStore[`${data.reciever_id}`] != undefined && Array.isArray(clientStore[`${data.reciever_id}`]) && clientStore[`${data.reciever_id}`].length > 0) {
      // Go through the corresponding reciever_id clients and update each of the client's redux state with the new FriendRequest data.
      for (i = 0; i < clientStore[`${data.reciever_id}`].length; i++) {
        clientStore[`${data.reciever_id}`][i].emit('DELETE_FRIEND_REQUEST', {
          messageType: 'UPDATE_ACCOUNT_DETAILS',
          message: deleted_fr
        })
      }
    }
  })

  // SOCKET ENDPOINT: ACCEPT FRIEND REQUEST HANDLER
  client.on('FR_ACCEPT', async (data) => {
    let sender_mongo_id = ObjectId(data.sender_id);
    let reciever_mongo_id = ObjectId(data.reciever_id);
    let deleted_fr;
    // Delete Corresponding Friend Request between two people.
    try {
      deleted_fr = await FriendRequest.findOneAndDelete({ fr_reciever_id: reciever_mongo_id, fr_sender_id: sender_mongo_id }).populate('fr_reciever_id');
    } catch (err) {
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
    // Ensure relational integrity by removing the corresponding reference for the friend request.
    try {
      await Account.findByIdAndUpdate(reciever_mongo_id, { $pullAll: { acc_freqs: [deleted_fr._id] } })
    } catch (err) {
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
    // Add the sender_id of the FREQ to acc_friends.
    try {
      await Account.findByIdAndUpdate(reciever_mongo_id, { $push: { acc_friends: sender_mongo_id } });
      await Account.findByIdAndUpdate(sender_mongo_id, { $push: { acc_friends: reciever_mongo_id } });
    } catch (err) {
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
    // Search clientStore for any potential reciever Id clients & Update clients
    if (clientStore[`${data.sender_id}`] != undefined && Array.isArray(clientStore[`${data.sender_id}`]) && clientStore[`${data.sender_id}`].length > 0) {
      // Go through the corresponding reciever_id clients and update each of the client's redux state with the new FriendRequest data.
      for (i = 0; i < clientStore[`${data.sender_id}`].length; i++) {
        clientStore[`${data.sender_id}`][i].emit('FR_ACCEPT', {
          messageType: 'UPDATE_ACCOUNT_DETAILS',
          message: deleted_fr
        })
      }
    }
  })

  // SOCKET ENDPOINT: REMOVE FRIEND FROM FRIEND LIST REQUEST HANDLER. 
  client.on('DELETE_FRIEND', async (data) => {
    let sender_mongo_id = ObjectId(data.sender_id);
    let reciever_mongo_id = ObjectId(data.reciever_id);
    try {
      await Account.findByIdAndUpdate(sender_mongo_id, { $pullAll: { acc_friends: [reciever_mongo_id] } });
      await Account.findByIdAndUpdate(reciever_mongo_id, { $pullAll: { acc_friends: [sender_mongo_id] } });
    } catch (err) {
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }

    // Search clientStore for any potential reciever Id clients & Update clients
    if (clientStore[`${data.sender_id}`] != undefined && Array.isArray(clientStore[`${data.sender_id}`]) && clientStore[`${data.sender_id}`].length > 0) {
      // Go through the corresponding reciever_id clients and update each of the client's redux state with the new FriendRequest data.
      for (i = 0; i < clientStore[`${data.sender_id}`].length; i++) {
        clientStore[`${data.sender_id}`][i].emit('DELETE_FRIEND', {
          messageType: 'UPDATE_ACCOUNT_DETAILS',
          message: data.reciever_id
        })
      }
    }
    // Search clientStore for any potential reciever Id clients & Update clients
    if (clientStore[`${data.reciever_id}`] != undefined && Array.isArray(clientStore[`${data.reciever_id}`]) && clientStore[`${data.reciever_id}`].length > 0) {
      // Go through the corresponding reciever_id clients and update each of the client's redux state with the new FriendRequest data.
      for (i = 0; i < clientStore[`${data.reciever_id}`].length; i++) {
        clientStore[`${data.reciever_id}`][i].emit('DELETE_FRIEND', {
          messageType: 'UPDATE_ACCOUNT_DETAILS',
          message: data.sender_id
        })
      }
    }
  })

  // SOCKET ENDPOINT: CREATE A NEW GROUP
  client.on('NEW_GROUP', async (data) => {
    console.log(data);
    let g_id, chat_grp;
    try {
      g_id = new ObjectId();
      chat_grp = new ChatGroup({
        _id: g_id,
        g_type: data.newGroupType,
        g_title: data.newGroupTitle,
        g_members: data.newGroupMembers,
        g_leaders: data.newGroupLeaders,
        g_messages: []
      })
      await chat_grp.save();
    } catch (err) {
      console.log(err);
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
    try {
      for (i = 0; i < data.newGroupMembers.length; i++) {
        await Account.findByIdAndUpdate(data.newGroupMembers[i], { $push: { acc_grps: g_id } });
      }
    } catch (err) {
      console.log(err);
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
    // Go through the clients of data.newGroupMembers 
    // & emit a message to update their redux state!
    try {
      for (i = 0; i < data.newGroupMembers.length; i++) {
        for (j = 0; j < clientStore[data.newGroupMembers[i]].length; j++) {
          let currClient = clientStore[data.newGroupMembers[i]][j];
          // Emit data for newGroup to redux state!
          currClient.emit('NEW_GROUP', {
            messageType: 'UPDATE_GROUP_DETAILS',
            message: chat_grp
          })
        }
      }
    } catch (err) {
      console.log(err);
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
  })

  client.on('LEAVE_GROUP', async (data) => {
    try {

      console.log('LEAVE_GROUP', data);
      await Account.findByIdAndUpdate(data.acc_id, { $pullAll: { acc_grps: [data.g_id] } });
      await ChatGroup.findByIdAndUpdate(data.g_id, { $pullAll: { g_members: [data.acc_id], g_leaders: [data.acc_id] } }, { multi: true }).lean();
      let chatGroup = await ChatGroup.findById(data.g_id);
      console.log(chatGroup);
      // Transfers leadership to another user when no more leaders are in the group.
      if (chatGroup.g_leaders.length == 0 && chatGroup.g_members.length > 0) {
        await ChatGroup.findByIdAndUpdate(data.g_id, { $push: { g_leaders: chatGroup.g_members[0] } })
      }
      // Delete ChatGroup since nobody is in it anymore.
      if (chatGroup.g_leaders.length == 0 && chatGroup.g_members.length == 0) {
        console.log(data.g_id);
        await ChatGroup.findByIdAndDelete(data.g_id);
      }
    } catch (err) {
      console.log(err);
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
  })

  client.on('ADD_TYPING_USER', (data) => {
    // console.log('ADD', data);
    // Needed Data: group's _id and typing user's name (emitter).
    for (i = 0; i < data.g_members.length; i++) {
      if (clientStore[`${data.g_members[i]}`] !== undefined && Array.isArray(clientStore[`${data.g_members[i]}`]) && clientStore[`${data.g_members[i]}`].length > 0) {
        for (j = 0; j < clientStore[`${data.g_members[i]}`].length; j++) {
          if (`${data.g_members[i]}` !== data.acc_id) {
            clientStore[`${data.g_members[i]}`][j].emit('ADD_TYPING_USER', {
              messageType: 'ADD_TYPING_USER',
              message: {
                acc_id: data.acc_id,
                emitter: data.emitter,
                g_id: data.g_id
              }
            })
          }
        }
      }
    }
  })
  client.on('REMOVE_TYPING_USER', (data) => {
    console.log('REMOVE_TYPING_USER');
    // console.log('REMOVE', data);
    // Needed Data: group's _id and typing user's name emitter.
    for (i = 0; i < data.g_members.length; i++) {
      if (clientStore[`${data.g_members[i]}`] !== undefined && Array.isArray(clientStore[`${data.g_members[i]}`]) && clientStore[`${data.g_members[i]}`].length > 0) {
        for (j = 0; j < clientStore[`${data.g_members[i]}`].length; j++) {
          if (`${data.g_members[i]}` !== data.acc_id) {
            clientStore[`${data.g_members[i]}`][j].emit('REMOVE_TYPING_USER', {
              messageType: 'REMOVE_TYPING_USER',
              message: {
                acc_id: data.acc_id,
                emitter: data.emitter,
                g_id: data.g_id
              }
            })
          }
        }
      }
    }
  })

  client.on('NEW_MESSAGE', async (data) => {
    // console.log('NEW_MESSAGE', data);
    // 1. Create New Message & .save() onto db.
    let new_msg_id = new ObjectId();
    let msg_chat_grp, new_msg;
    try {
      new_msg = new Message({
        _id: new_msg_id,
        m_sender: data.m_sender,
        m_dt: data.m_dt,
        g_id: data.g_id,
        msg_string: data.msg_string
      })
      await new_msg.save();
    } catch (err) {
      console.log(err);
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
    // 2. Fetch ChatGroup w/ data.g_id and push the New Message Ref onto the db.
    try {
      msg_chat_grp = await ChatGroup.findByIdAndUpdate(data.g_id, { $push: { g_messages: new_msg_id } });
    } catch (err) {
      console.log(err);
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }
    // 3. Fetch all g_members id's from the corresponding ChatGroup entity & emit the New Message
    // entity to each of them (If they exist).
    try {
      let returnMsg = await Message.findById(new_msg._id.toString()).populate('m_sender');
      let endpointMembers = msg_chat_grp.g_members;
      for (i = 0; i < endpointMembers.length; i++) {
        // Search clientStore for any potential reciever Id clients & Update clients
        // console.log(typeof endpointMembers[i].toString(), endpointMembers[i].toString(), clientStore[endpointMembers[i].toString()]);
        if (clientStore[`${endpointMembers[i]}`] != undefined && Array.isArray(clientStore[`${endpointMembers[i]}`]) && clientStore[`${endpointMembers[i]}`].length > 0) {
          // Go through the corresponding reciever_id clients and update each of the client's redux state with the new FriendRequest data.
          for (j = 0; j < clientStore[`${endpointMembers[i]}`].length; j++) {
            clientStore[`${endpointMembers[i]}`][j].emit('NEW_MESSAGE', {
              messageType: 'UPDATE_ACCOUNT_DETAILS',
              message: returnMsg
            })
          }
        }
      }
    } catch (err) {
      console.log(err);
      client.emit('ERROR_MESSAGE', {
        messageType: 'SOCKET_SERVER_ERROR',
        message: err
      })
    }


  })

  // Disconnect Event.
  client.on('disconnect', (reason) => {
    // Remove the connected client from key/value pair on server.
    try {
      clientStore[`${hashString}`].splice(clientStore[`${hashString}`].indexOf(client));
      console.log('Disconnected From', client.id, 'Due To:', reason);
    } catch (err) {
      console.log(err);
    }
    displayConnectedClients();
  })

})

module.exports = io;