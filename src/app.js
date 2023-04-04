const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');
const passport = require('passport')
const githubMiddleware = require("./middleware/github.js")
//require('./db.js');

const server = express();

server.name = 'API';
server.use(passport.initialize())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors())
server.use("/", routes);

// Error catching endware.


module.exports = server;
