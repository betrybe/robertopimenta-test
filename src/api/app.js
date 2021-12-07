const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { body } = require('express-validator');
const user = require('../controllers/users.controller');
const recipes = require('../controllers/recipes.controller');
const images = require('../controllers/images.controller');
const login = require('../controllers/login.controller');
const upload = require('../middlewares/upload');

const app = express();

mongoose.connect('mongodb://mongodb:27017/Cookmaster', {
  useUnifiedTopology: true,
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Conectado ao DB');
  }
});

app.use(cookieParser());
app.use(express.json());
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  response.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization');
  app.use(cors());
  next();
});

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/users', user.index);
app.post('/users', [body('email').isEmail()], user.create);
app.post('/users/admin', user.createAdmin);
app.post('/login', [body('email').isEmail()], login.login);

app.post('/recipes', recipes.create);
app.get('/recipes', recipes.listagem);
app.get('/recipes/:id', recipes.listarId);
app.put('/recipes/:id', recipes.editarReceita);
app.delete('/recipes/:id', recipes.deletarReceita);

app.put('/recipes/:id/image/', upload.single('image'), recipes.imagemReceita);

app.get('/images/:id', images.listarImagem);

module.exports = app;
