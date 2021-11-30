const recipes = require('../models/recipes')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = {
    index(request, response) {
        response.json({
            mensagem: 'Controler do recipes'
        })
    },

    // CADASTRAR RECEITA
    async create(request, response) {
        const { name, ingredients, preparation } = request.body

        if (!name) {
            return response.status(400).json({
                message: 'Invalid entries. Try again.'
            })
        } else {
            if (!ingredients) {
                return response.status(400).json({
                    message: 'Invalid entries. Try again.'
                })
            } else {
                if (!preparation) {
                    return response.status(400).json({
                        message: 'Invalid entries. Try again.'
                    })
                } else {
                    const token = request.headers.authorization
                    //console.log(token)
                    if (!token) {
                        return response.status(400).json({
                            message: 'Necessário realizar login'
                        })
                    } else {
                        try {
                            var privateKey = 'eb8ea89321237f7b4520'
                            var decode = await promisify(jwt.verify)(token, privateKey)
                            //console.log(decode)
                        } catch (err) {
                            return response.status(401).json({
                                message: 'jwt malformed'
                            })
                        }
                        var userId = decode.id
                        var image = ''
                        const data = { name, ingredients, preparation, userId, image }
                        const recipe = await recipes.create(data)
                        return response.status(201).json({
                            recipe
                        })
                    }
                }
            }
        }
    },

    // LISTAR TODAS AS RECEITAS
    async listagem(request, response) {
        try {
            var recipes = await recipes.find()
            return response.status(200).json({
                recipes
            })
        }catch (err){
            return response.status(404).json({
                message: 'recipe not found'
            })
        }
    },

    // LISTAR RECEITA PELO ID
    async listarId(request, response) {
        const id = request.params.id
        //console.log(id)
        try {
            var receita = await recipes.findById(id)
            return response.status(200).json({
                receita
            })
        }catch (err){
            return response.status(404).json({
                message: 'recipe not found'
            })
        }
    },

    // EDITAR RECEITA
    async editarReceita(request, response) {
        // Verifico token
        const token = request.headers.authorization
        if (!token) {
            return response.status(401).json({
                message: 'missing auth token'
            })
        } else {
            try {
                var privateKey = 'eb8ea89321237f7b4520'
                var dados = await promisify(jwt.verify)(token, privateKey)
            } catch (err) {
                return response.status(401).json({
                    message: 'jwt malformed'
                })
            }
        }
        // Procuro receita
        const id = request.params.id
        try {
            var receita = await recipes.findById(id)
        } catch (err) {
            return response.status(404).json({
                message: 'recipe not found'
            })
        }

        // verifico id do usuário logado com o userId da receita ou role admin
        if (dados.id === receita.userId || dados.role === 'admin') {
            const update = request.body
            await recipes.findByIdAndUpdate(id, update).then((receitaUpdate) => {
                return response.status(200).json({
                    receitaUpdate
                })
            }).catch((err) => {
                return response.status(400).json({
                    err
                })
            })
        } else {
            return response.status(401).json({
                message: 'error user'
            })
        }
    },

    // DELETAR RECEITA
    async deletarReceita(request, response) {
        // Verifico token
        const token = request.headers.authorization
        if (!token) {
            return response.status(401).json({
                message: 'missing auth token'
            })
        } else {
            try {
                var privateKey = 'eb8ea89321237f7b4520'
                var dados = await promisify(jwt.verify)(token, privateKey)
            } catch (err) {
                return response.status(401).json({
                    message: 'jwt malformed'
                })
            }
        }

        // Procuro receita
        const id = request.params.id
        try {
            var receita = await recipes.findById(id)
        } catch (err) {
            return response.status(404).json({
                message: 'recipe not found'
            })
        }

        // verifico id do usuário logado com o userId da receita ou role admin
        if (dados.id === receita.userId || dados.role === 'admin') {
            await recipes.findOneAndDelete(id).then(() => {
                return response.status(204).json()
            }).catch((err) => {
                return response.status(400).json({
                    err
                })
            })
        } else {
            return response.status(401).json({
                message: 'error user'
            })
        }
    },

    // ADICIONAR ROTA DA IMAGEM NA RECEITA
    async imagemReceita(request, response) {
        // Verifico token
        const token = request.headers.authorization
        if (!token) {
            return response.status(401).json({
                message: 'missing auth token'
            })
        } else {
            try {
                var privateKey = 'eb8ea89321237f7b4520'
                var dados = await promisify(jwt.verify)(token, privateKey)
            } catch (err) {
                return response.status(401).json({
                    message: 'jwt malformed'
                })
            }
        }

        // Procuro receita
        const id = request.params.id
        try {
            var receita = await recipes.findById(id)
        } catch (err) {
            return response.status(404).json({
                message: 'recipe not found'
            })
        }
        
        // verifico id do usuário logado com o userId da receita ou role admin
        if (dados.id === receita.userId || dados.role === 'admin') {
            var update = { image: 'http:/localhost:3000/src/uploads/' + id + '.jpeg'}
            await recipes.findByIdAndUpdate(id, update).then((receitaUpdate) => {
                return response.status(200).json({
                    receitaUpdate
                })
            }).catch((err) => {
                return response.status(400).json({
                    err
                })
            })
        } else {
            return response.status(401).json({
                message: 'error user'
            })
        }
    }

}