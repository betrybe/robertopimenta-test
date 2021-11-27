const express = require('express')
const { body } = require('express-validator');

const {validarToken} = require('../middlewares/validarToken')

const routes = express.Router()

//controllers
const user = require('../controllers/users.controller')
const recipes = require('../controllers/recipes.controller')

// Rotas do usuário
routes.post('/users', [body('email').isEmail()], user.create)
routes.post('/login', [body('email').isEmail()], user.login)

// Rotas do recipes
routes.post('/recipes', validarToken, recipes.create)


module.exports = routes