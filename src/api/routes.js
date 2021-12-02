const express = require('express');
const { body } = require('express-validator');
const user = require('../controllers/users.controller');
const recipes = require('../controllers/recipes.controller');

const routes = express.Router();

routes.get('/users', user.index);
routes.post('/users', [body('email').isEmail()], user.create);
routes.post('/login', [body('email').isEmail()], user.login);

routes.post('/recipes', recipes.create);

module.exports = routes;