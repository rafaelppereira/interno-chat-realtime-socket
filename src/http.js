const express = require('express');
const dotenv = require('dotenv');
const http = require('http');

const { Server } = require('socket.io');
const path = require('path');

// Config dotenv
dotenv.config();

// Config express
const app = express();

app.use(express.static(path.join(__dirname, "..", "public")))

const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

module.exports = {
  serverHttp,
  io
}