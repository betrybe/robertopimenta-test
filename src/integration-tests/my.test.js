const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');

const { MongoClient } = require('mongodb');
chai.use(chaiHttp);
chai.should();

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';

describe('RECEITAS', () => {
    let connection;
    let db;

    before(async () => {
        connection = await MongoClient.connect(mongoDbUrl, {
            useUnifiedTopology: true,
        });
        db = connection.db('Cookmaster');
        await db.collection('users').deleteMany({});
        await db.collection('recipes').deleteMany({});
        const users = [
            { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' },
            { name: 'Erick Jacquin', email: 'erickjacquin@gmail.com', password: '12345678', role: 'user' },
        ];
        await db.collection('users').insertMany(users);
    });

    after(async () => {
        await connection.close();
    });

    describe('POST /recipes', () => {
        it('Rota POST para cadastrar receita sem o campo NAME', done => {
            const recipe = {
                ingredients: "ovo e sal",
                preparation: "quebre o ovo, jogue na frigideira, adicione o sal"
            };
            chai.request(app)
                .post('/recipes')
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
        it('Rota POST para cadastrar receita sem o campo INGREDIENTES', done => {
            const recipe = {
                name: "Receita 1",
                preparation: "quebre o ovo, jogue na frigideira, adicione o sal",
            };
            chai.request(app)
                .post('/recipes')
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
        it('Rota POST para cadastrar receita sem o campo PREPARATION', done => {
            const recipe = {
                name: "Receita 1",
                ingredients: "ovo e sal",
            };
            chai.request(app)
                .post('/recipes')
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

    });


});