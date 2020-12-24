// TODO:
// 1. Change the path used by 'login.js' to '/authenticate' (Since logout will likely be used for it as well!)
// 2. Remember Me Feature on HTML
// 3. Create Account Form.

// Server Configuration
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('./sockets/socket-server').attach(server);

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
    process.exit(1);
  })
  .on('uncaughtException', (err) => {
    // handle the error safely
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  })

// Node Modules
const path = require('path');

// Dependencies
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
// Generate random hexadecimal token: 
// node
// require('crypto').randomBytes(64).toString('hex')

// Configuration Middleware
app.use(express.static(path.join(__dirname, '..', 'build')))
app.use(cors());
app.use(express.json());
// Apply Socket.io as express custom middleware:
app.use((req, res, next) => {
  req.io = io;
  next();
})
const PORT = process.env.PORT || 8080;

const uri = process.env.MONGO_URI;

mongoose.connect(
  uri, { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to DB!');
  }
)

// Routers (Set before application's wildcard route so that http requests will pattern match for the API first!):
const loginRoute = require('./routes/authenticate');
app.use('/api/authenticate', loginRoute);

// Wildcard routing needed for seamless React-Router integration.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});