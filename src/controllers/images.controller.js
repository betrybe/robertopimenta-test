const recipes = require('../models/recipes')

module.exports = {
    index(request, response) {
        response.json({
            mensagem: 'Controler do recipes'
        })
    },

    async listarImagem(request, response) {
        const id = request.params.id
        //var endImagem = 'http://localhost:3000/uploads/' + id
        return response.status(200).json(
            'http://localhost:3000/uploads/' + id
            )
    }
}