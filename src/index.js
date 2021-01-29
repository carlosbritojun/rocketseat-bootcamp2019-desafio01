const express = require('express');
const requestCounter = require('./middlewares/global/requestCounter');

const server = express();

server.use(express.json());
server.use(requestCounter);
server.use(require('./routes'));

server.listen(3000);

