const jwt = require('jsonwebtoken')
const {promisify} = require('util')

module.exports = {
    async validarToken(request, response, next) {
        const token = request.headers.authorization
        if (!token) {
            return response.status(400).json({
                message: 'Necessário realizar login'
            })
        } else {
            try{
                var privateKey = 'eb8ea89321237f7b4520'
                await promisify(jwt.verify)(token, privateKey)
                return next()   
            }catch(err){
                return response.status(400).json({
                    message: 'Login ou senha inválido'
                })
            }
        }
    }
}