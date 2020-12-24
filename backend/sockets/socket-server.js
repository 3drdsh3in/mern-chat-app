const socket = require('socket.io');
const io = socket();

// Socket Middleware:

let clientStore = {};

function printConnectedClients() {
  console.log('Clients Currently Conencted: ')
  for (var key in clientStore) {
    for (i = 0; i < clientStore[key].length; i++) {
      console.log(clientStore[key][i].id);
    }
  }
}

// Connect Event:
io.on('connection', (client) => {
  console.log('Connection Established On', client.id);
  // client.emit('message');

  let hashString;

  client.on('connection_update', (data) => {

    hashString = data.acc_id;
    if (!(`${hashString}` in clientStore)) {
      clientStore[`${hashString}`] = [client];
    }
    else if (clientStore[`${hashString}`].length == 0) {
      clientStore[`${hashString}`].push(client);
    }
  })


  printConnectedClients();

  // Custom Events:
  client.on('data_sent', (data) => {
    console.log(data);
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