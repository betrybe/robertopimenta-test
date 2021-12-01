module.exports = {
    index(request, response) {
        response.json({
            mensagem: 'Controler do usuário',
        });
    },
};