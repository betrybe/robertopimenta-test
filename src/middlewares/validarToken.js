const jwt = require('jsonwebtoken')
const {promisify} = require('util')

module.exports = {
    async validarToken(request, response, next) {
        const auth = request.headers.authorization
        const [, token] = auth.split(' ')
        if (!token) {
            return response.status(400).json({
                message: 'Necessário realizar login'
            })
        } else {
            try{
                var privateKey = 'eb8ea89321237f7b4520'
                const decode = await promisify(jwt.verify)(token, privateKey)
                //console.log(decode)
                var userId = decode.id
                var userEmail = decode.email
                var userRole = decode.role
                //console.log(userId)
                //console.log(userEmail)
                //console.log(userRole)
                return next()
                
            }catch(err){
                return response.status(400).json({
                    message: 'Login ou senha inválido'
                })
            }
        }
    }
}