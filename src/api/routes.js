const express = require('express');
const { body } = require('express-validator');
const user = require('../controllers/users.controller');
const recipes = require('../controllers/recipes.controller');
const images = require('../controllers/images.controller');
const upload = require('../middlewares/upload');

const routes = express.Router();

routes.get('/users', user.index);
routes.post('/users', [body('email').isEmail()], user.create);
routes.post('/users/admin', user.createAdmin);
routes.post('/login', [body('email').isEmail()], user.login);

routes.post('/recipes', recipes.create);
routes.get('/recipes', recipes.listagem);
routes.get('/recipes/:id', recipes.listarId);
routes.put('/recipes/:id', recipes.editarReceita);
routes.delete('/recipes/:id', recipes.deletarReceita);

routes.put('/recipes/:id/image/', upload.single('image'), recipes.imagemReceita);

routes.get('/images/:id', images.listarImagem);

module.exports = routes;