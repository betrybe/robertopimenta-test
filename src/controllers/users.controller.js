const { validationResult } = require('express-validator');
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
        let user = await users.findOne({ email });
        if (!user) {
            const role = 'user';
            const data = { name, email, password, role };
            await users.create(data);
            user = { name, email, role };
            return response.status(201).json({ user });
        }
        return response.status(409).json({ message: 'Email already registered' });
    },
};