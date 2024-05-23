const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const socket = io.connect("https://boboworld.xyz");

socket.on('userCount', userCount => {
let doc = document.getElementById('connectionCount');
  console.log("coonected");
  if(doc) {
    doc.innerHTML = userCount;
  }
})