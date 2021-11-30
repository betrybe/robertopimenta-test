const express = require('express')
const { body } = require('express-validator');

// middle
const upload = require('../middlewares/upload')

const routes = express.Router()

//controllers
const user = require('../controllers/users.controller')
const recipes = require('../controllers/recipes.controller')
const images = require('../controllers/images.controller')

// Rotas do usuário
routes.post('/users', [body('email').isEmail()], user.create)
routes.post('/login', [body('email').isEmail()], user.login)

// Rotas do recipes
routes.post('/recipes', recipes.create)
routes.get('/recipes', recipes.listagem)
routes.get('/recipes/:id', recipes.listarId)
routes.put('/recipes/:id', recipes.editarReceita)
routes.delete('/recipes/:id', recipes.deletarReceita)
routes.put('/recipes/:id/image/', upload.single('image'), recipes.imagemReceita)

// Rota para uma imagem
routes.get('/images/:id', images.listarImagem)

// Rota para cadastro de adms
routes.post('/users/admin', user.createAdmin)

module.exports = routes