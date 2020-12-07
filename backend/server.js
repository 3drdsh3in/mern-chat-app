const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;

const uri = 'mongodb+srv://admin:pass@cluster0.o2kzm.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(
  uri, { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to DB!');
  }
)

app.use(express.static(path.join(__dirname, '..', 'build')))
app.use(cors());

// Routers (Set before application's wildcard route so that http requests will pattern match for the API first!):
const route = require('./routes/route');
app.use('/api/route', route);

// Wildcard routing needed for seamless React-Router integration.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});