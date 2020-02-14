const express = require('express');
const cors = require('cors');

const projects = require('./routes/projectsRoute');
const actions = require('./routes/actionsRoute');

const server = express();

server.use(logger);
server.use(express.json());
server.use(cors())
server.use('/api/projects', (projects));
server.use('/api/actions', (actions));



function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`)
  next();
}

server.listen(5000, () => {
  console.log("Server is listening on port 5000")
})