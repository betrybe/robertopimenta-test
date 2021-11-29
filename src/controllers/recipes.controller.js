const recipes = require('../models/recipes')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

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
        await recipes.findById(id).then((receita) => {
            return response.status(200).json({
                receita
            })
        }).catch(()=>{
            return response.status(404).json({
                message: 'recipe not found'
            })
        })
        
    },

    async editarReceita(request, response) {
        return response.status(200).json({
            message: 'Editar receitas'
        })
    }


}