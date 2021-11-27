const recipes = require('../models/recipes')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')

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
            }else{
                if (!preparation) {
                    return response.status(400).json({
                        message: 'Invalid entries. Try again.'
                    })
                }else{
                    const auth = request.headers.authorization
                    const [, token] = auth.split(' ')
                    console.log(token)
                }
            }
        }        
    },


}