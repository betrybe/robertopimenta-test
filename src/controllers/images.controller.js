const fetch = require('node-fetch');

module.exports = {
    index(request, response) {
        response.json({
            mensagem: 'Controler do recipes',
        });
    },
    async listarImagem(request, response) {
        const urlImg = `http://localhost:3000/src/uploads/${request.params.id}`;
        const reposta = await fetch(urlImg);
        response.writeHead(200, {
            'content-type': 'image/jpeg',
        });
        return reposta.body.pipe(response);
    },
};