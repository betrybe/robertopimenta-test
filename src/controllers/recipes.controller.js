const recipes = require('../models/recipes')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const { nextTick } = require('process')

module.exports = {
    index(request, response) {
        response.json({
            mensagem: 'Controler do recipes'
        })
    },

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
                            const decode = await promisify(jwt.verify)(token, privateKey)
                            //console.log(decode)
                            var userId = decode.id
                            const data = { name, ingredients, preparation, userId }
                            const receita = await recipes.create(data)
                            return response.status(201).json({
                                receita
                            })
                        } catch (err) {
                            return response.status(401).json({
                                message: 'jwt malformed'
                            })
                        }
                    }
                }
            }
        }
    },

    async listagem(request, response) {
        await recipes.find({}).then((receitas) => {
            return response.status(200).json({
                receitas
            })
        }).catch((err) => {
            return response.status(400).json({
                err
            })
        })
    },

    async listarId(request, response) {
        const id = request.params.id
        //console.log(id)
        await recipes.findById(id).then((resultado) => {
            receita = resultado
        }).catch(() => {
            return response.status(404).json({
                message: 'recipe not found'
            })
        })
    },

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
        
        // verifico id do usuário logado com o userId da receita
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
    }


}