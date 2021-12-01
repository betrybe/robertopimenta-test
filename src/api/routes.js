const express = require('express');
const { body } = require('express-validator');
const user = require('../controllers/users.controller');

const routes = express.Router();

routes.get('/users', user.index);
routes.post('/users', [body('email').isEmail()], user.create);
routes.post('/login', [body('email').isEmail()], user.login);

module.exports = routes;