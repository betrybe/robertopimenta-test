const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const db = require('./db')
const routes = require('./routes');

const app = express();

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*")
  response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  response.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
  app.use(cors())
  next()
})

app.use(cookieParser())
app.use(express.json())
app.use(routes)

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
