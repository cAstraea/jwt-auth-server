const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// DB setup
mongoose.connect('mongodb://localhost:auth/auth');

const app = express();
const router = require('./router');
// app setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' })); // log requqests
router(app);
// server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on: ', port);
