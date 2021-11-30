const recipes = require('../models/recipes')
const fetch = require("node-fetch")

module.exports = {
    index(request, response) {
        response.json({
            mensagem: 'Controler do recipes'
        })
    },

    async listarImagem(request, response) {
        const id = request.params.id
        const urlImg = 'http://localhost:3000/uploads/' + id
        const reposta = await fetch(urlImg);

        response.writeHead(200,{
            "content-type": "image/jpeg",
        })

        return reposta.body.pipe(response);
    }
}