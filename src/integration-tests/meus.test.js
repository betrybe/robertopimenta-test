const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');

chai.use(chaiHttp);
chai.should();

describe('Receitas - Endpoints', () => {
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
        it('Rota POST para cadastrar receita sem o campo INGREDIENTS', done => {
            const recipe = {
                name: "receita ovo frito",
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
        it('Rota POST para cadastrar receita sem o campo PREPARATION', done => {
            const recipe = {
                name: "receita ovo frito",
                ingredients: "ovo e sal"
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

    describe('POST /users', () => {
        it('Rota POST para cadastrar usuário sem o campo NAME', done => {
            const user = {
                "email": "roberto@email.com",
                "password": "12345678"
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
        it('Rota POST para cadastrar usuário sem o campo EMAIL', done => {
            const user = {
                "name": "Roberto",
                "password": "12345678"
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
        it('Rota POST para cadastrar usuário sem o campo PASSWORD', done => {
            const user = {
                "name": "Roberto",
                "email": "roberto@email.com"
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('Rota POST para login de usuário sem o campo email', done => {
            const user = {
                "password": "12345678"
            };
            chai.request(app)
                .post('/login')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(401);
                    done();
                });
        });
        it('Rota POST para login de usuário sem o campo pass', done => {
            const user = {
                "email": "roberto@email.com"
            };
            chai.request(app)
                .post('/login')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(401);
                    done();
                });
        });
        it('Rota POST para login de usuário com email inválido', done => {
            const user = {
                "email": "roberto.com",
                "password": "12345678"
            };
            chai.request(app)
                .post('/login')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(401);
                    done();
                });
        });
        it('Rota POST para login de usuário com dados válidos', done => {
            const user = {
                "email": "root@email.com",
                "password": "admin"
            };
            chai.request(app)
                .post('/login')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });
    });
});