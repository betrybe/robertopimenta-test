const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');

const { MongoClient } = require('mongodb');
chai.use(chaiHttp);
chai.should();
should = chai.should();

const mongoDbUrl = 'mongodb://mongodb:27017/Cookmaster';

describe('Usuários', () => {
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
        const recipes = [
            { name: 'Receita 1', ingredients: 'Ingredientes Receita 1', preparation: 'Preparação Receita 1' },
            { name: 'Receita 2', ingredients: 'Ingredientes Receita 2', preparation: 'Preparação Receita 2' },
            { name: 'Receita 3', ingredients: 'Ingredientes Receita 3', preparation: 'Preparação Receita 3' },
        ];
        await db.collection('users').insertMany(users);
        await db.collection('recipes').insertMany(recipes);
    });

    after(async () => {
        await connection.close();
    });

    describe('Servidor Rodando', () => {
        it('check app status', done => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/POST API USERS', () => {
        it('Faltando nome', done => {
            chai.request(app)
                .post('/users')
                .send({
                    "email": "roberto@email.com",
                    "password": "12345678"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Invalid entries. Try again.');
                    done();
                })
        });
        it('Faltando email', done => {
            chai.request(app)
                .post('/users')
                .send({
                    "name": "Roberto Pimenta",
                    "password": "12345678"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Invalid entries. Try again.');
                    done();
                })
        });
        it('Faltando password', done => {
            chai.request(app)
                .post('/users')
                .send({
                    "name": "Roberto Ayres",
                    "email": "roberto@email.com",
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Invalid entries. Try again.');
                    done();
                })
        });
        it('Cadastro OK', done => {
            chai.request(app)
                .post('/users')
                .send({
                    "name": "Roberto Ayres",
                    "email": "roberto@email.com",
                    "password": "123456789"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                })
        });
        it('Cadastro com email repetido', done => {
            chai.request(app)
                .post('/users')
                .send({
                    "name": "Roberto Ayres",
                    "email": "roberto@email.com",
                    "password": "123456789"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(409);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Email already registered');
                    done();
                })
        });
    });

    describe('/POST API LOGIN', () => {
        it('Login ok', done => {
            chai.request(app)
                .post('/login')
                .send({
                    "email": "roberto@email.com",
                    "password": "123456789"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe('/POST API USERS ADMIN', () => {
        it('Faltando nome', done => {
            chai.request(app)
                .post('/users/admin')
                .send({
                    "email": "roberto@email.com",
                    "password": "12345678"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('missing auth token');
                    done();
                })
        });
        it('Faltando email', done => {
            chai.request(app)
                .post('/users/admin')
                .send({
                    "name": "Roberto Pimenta",
                    "password": "12345678"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('missing auth token');
                    done();
                })
        });
        it('Faltando password', done => {
            chai.request(app)
                .post('/users/admin')
                .send({
                    "name": "Roberto Ayres",
                    "email": "roberto@email.com",
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('missing auth token');
                    done();
                })
        });
    });

    describe('/POST API RECIPES', () => {
        it('Faltando nome', done => {
            chai.request(app)
                .post('/recipes')
                .send({
                    "ingredients": "Ingredients da receita",
                    "preparation": "Preparation da receita"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Invalid entries. Try again.');
                    done();
                })
        });
        it('Faltando ingredients', done => {
            chai.request(app)
                .post('/recipes')
                .send({
                    "name": "Name da receita",
                    "preparation": "Preparation da receita"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Invalid entries. Try again.');
                    done();
                })
        });
        it('Faltando preparation', done => {
            chai.request(app)
                .post('/recipes')
                .send({
                    "name": "Name da receita",
                    "ingredients": "Ingredients da receita"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Invalid entries. Try again.');
                    done();
                })
        });

        it('Listando receitas', done => {
            chai.request(app)
                .get('/recipes')
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });
    });

    describe('/POST API RECEITA OK', () => {
        before((done) => {
            chai.request(app)
                .post('/login', {
                    "email": "roberto@email.com",
                    "password": "123456789"
                })
                .then((res) => {
                    done();
                });
        });

        it('Acessando imagem', done => {
            chai.request(app)
                .get('/images/123456789')
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    done();
                })
        });
    });


});