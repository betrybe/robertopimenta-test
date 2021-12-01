const users = require('../models/users')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
var mongoose = require('mongoose');
const { promisify } = require('util')

module.exports = {
    index(request, response) {
        response.json({
            mensagem: 'Controler do usuário'
        })
    },

    // NOVO USUÁRIO
    async create(request, response) {
        const errors = validationResult(request);
        const { name, email, password } = request.body

        if (!name) {
            return response.status(400).json({
                message: 'Invalid entries. Try again.'
            })
        } else {
            if (!email) {
                return response.status(400).json({
                    message: 'Invalid entries. Try again.'
                })
            } else {
                if (!errors.isEmpty()) {
                    return response.status(400).json({
                        message: 'Invalid entries. Try again.'
                    })
                } else {
                    if (!password) {
                        return response.status(400).json({
                            message: 'Invalid entries. Try again.'
                        })
                    } else {
                        if (password.length < 8) {
                            return response.status(400).json({
                                message: 'Invalid entries. Try again.'
                            })
                        } else {
                            let user = await users.findOne({ email })
                            // verifica email já cadastrado
                            if (!user) {
                                let role = "user"
                                let data = {}
                                data = { name, email, password, role }
                                user = { name, email, role }
                                await users.create(data)
                                return response.status(201).json({
                                    user
                                })
                            } else {
                                return response.status(409).json({
                                    message: 'Email already registered'
                                })
                            }
                        }
                    }
                }
            }
        }
    },

    //LOGIN
    async login(request, response) {
        const errors = validationResult(request);
        const { email, password } = request.body
        if (!email) {
            return response.status(401).json({
                message: 'All fields must be filled'
            })
        } else {
            if (!password) {
                return response.status(401).json({
                    message: 'All fields must be filled'
                })
            } else {
                if (!errors.isEmpty()) {
                    return response.status(401).json({
                        message: 'Incorrect username or password'
                    })
                } else {
                    // Verifica no banco a existência do email/password
                    let data = {}
                    data = { email, password }
                    user = await users.findOne(data)
                    if (!user) {
                        return response.status(401).json({
                            message: 'Incorrect username or password'
                        })
                    } else {
                        var id = mongoose.mongo.ObjectId(user._id).toString()
                        //console.log(id)
                        var role = user.role
                        var privateKey = 'eb8ea89321237f7b4520'
                        var token = jwt.sign({ id, email, role }, privateKey, {
                            expiresIn: '1d'
                        })
                        //console.log(token)
                        return response.status(200).json({
                            token
                        })
                    }
                }
            }
        }
    },

    async createAdmin(request, response) {
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
        if (dados.role === 'admin') {
            const errors = validationResult(request);

            const { name, email, password } = request.body
            if (!name) {
                return response.status(400).json({
                    message: 'Invalid entries. Try again.'
                })
            } else {
                if (!email) {
                    return response.status(400).json({
                        message: 'Invalid entries. Try again.'
                    })
                } else {
                    if (!errors.isEmpty()) {
                        return response.status(400).json({
                            message: 'Invalid entries. Try again.'
                        })
                    } else {
                        if (!password) {
                            return response.status(400).json({
                                message: 'Invalid entries. Try again.'
                            })
                        } else {
                            let user = await users.findOne({ email })
                            if (!user) {
                                const role = 'admin'
                                const data = { name, email, password, role }
                                await users.create(data).then((user) => {
                                    return response.status(201).json({
                                        user
                                    })
                                }).catch(() => {
                                    return response.status(400).json({
                                        message: 'erro ao cadastrar admin'
                                    })
                                })
                            } else {
                                return response.status(409).json({
                                    message: 'Email already registered'
                                })
                            }

                        }
                    }
                }
            }
        } else {
            return response.status(403).json({
                message: 'Only admins can register new admins'
            })
        }

    }

}