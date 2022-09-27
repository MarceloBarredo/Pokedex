const express = require('express');
const cookieParser = require('cookie-parser');
// Requerimos body-parser para Leer el Contenido body de la Solicitud con el lenguaje de programación JavaScript.
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();
server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); 
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  //Para que se pueda acceder desde cualquier ruta.
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  //Para que se establezcan estos encabezados.
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
