const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

//initial get request to make sure api and server up and running
server.get('/', (req, res) => {
  res.send('Anywhere fitness app api and server working');
});

//routes go below

module.exports = server;
