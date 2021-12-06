const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const users = require('../models/users');

module.exports = {
    index(request, response) {
        response.json({
            mensagem: 'Controler do usuário',
        });
    },

    async login(request, response) {
        const errors = validationResult(request);
        const { email, password } = request.body;
        if (!errors.isEmpty() || !email || !password) {
            return response.status(401).json({ message: 'All fields must be filled' });
        }
        const data = { email, password };
        await users.findOne(data).then((user) => {
            if (user) {
                const id = mongoose.mongo.ObjectId(user.id).toString();
                const { role } = user;
                const token = jwt.sign({ id, email, role }, 'eb8ea89321237f7b4520', {
                    expiresIn: '1d',
                });
                return response.status(200).json({ token });
            }
            return response.status(401).json({ message: 'Incorrect username or password' });
        });
    },
};