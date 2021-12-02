const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { promisify } = require('util');
const users = require('../models/users');

module.exports = {
    index(request, response) {
        response.json({
            mensagem: 'Controler do usuário',
        });
    },
    async create(request, response) {
        const errors = validationResult(request);
        const { name, email, password } = request.body;
        if (!errors.isEmpty() || !name || !email || !password) {
            return response.status(400).json({ message: 'Invalid entries. Try again.' });
        }
        await users.findOne({ email }).then((dados) => {
            if (!dados) {
                const role = 'user';
                users.create({ name, email, password, role });
                const user = { name, email, role };
                return response.status(201).json({ user });
            }
            return response.status(409).json({ message: 'Email already registered' });
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
    async createAdmin(request, response) {
        const token = request.headers.authorization; let dados = '';
        if (!token) {
            return response.status(401).json({ message: 'missing auth token' });
        }
        try {
            dados = await promisify(jwt.verify)(token, 'eb8ea89321237f7b4520');
        } catch (err) {
            return response.status(401).json({ message: 'jwt malformed' });
        }
        const { role } = dados;
        if (role !== 'admin') {
            return response.status(403).json({ message: 'Only admins can register new admins' });
        }
        const { name, email, password } = request.body;
        const data = { name, email, password, role };
        await users.create(data)
        .then((user) => response.status(201).json({ user }))
        .catch(() => response.status(400).json({ message: 'erro ao cadastrar admin' }));
    },
};