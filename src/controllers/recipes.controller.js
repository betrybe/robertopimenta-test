const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const recipes = require('../models/recipes');

module.exports = {
    index(request, response) {
        response.json({
            mensagem: 'Controler do recipes',
        });
    },
    async create(request, response) {
        const { name, ingredients, preparation } = request.body;
        const token = request.headers.authorization;
        if (!name || !ingredients || !preparation || !token) {
            return response.status(400).json({ message: 'Invalid entries. Try again.' });
        }
        await promisify(jwt.verify)(token, 'eb8ea89321237f7b4520').then((decode) => {
            const { id } = decode;
            const image = '';
            const userId = id;
            const data = { name, ingredients, preparation, userId, image };
            recipes.create(data).then((recipe) => response.status(201).json({ recipe }));
        }).catch(() => response.status(401).json({ message: 'jwt malformed' }));
    },
    async listagem(request, response) {
        await recipes.find().then((receitas) => response.status(200).json(receitas))
            .catch((err) => response.status(400).json(err));
    },
    async listarId(request, response) {
        const { id } = request.params.id;
        try {
            const receita = await recipes.findById(id);
            return response.status(200).json(receita);
        } catch (err) {
            return response.status(404).json({
                message: 'recipe not found',
            });
        }
    },
};