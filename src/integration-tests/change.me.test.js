const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app')

chai.use(chaiHttp);
chai.should();

describe('', () => {

});

describe('Usuários - Endpoints', () => {
    describe('POST /users', async () => {

        it('Rota POST para novo usuário com dados válidos', done => {
            const user = {
                name: "Roberto Pimenta",
                email: "robertopimenta@email.com",
                password: "12345678"
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(201);
                    done();
                });
        });

        it('Rota POST para novo usuário sem o campo NAME', done => {
            const user = {
                email: "robertopimenta@email.com",
                password: "12345678"
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário com o campo NAME vazio', done => {
            const user = {
                name="",
                email: "robertopimenta@email.com",
                password: "12345678"
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário sem o campo EMAIL', done => {
            const user = {
                name: "Roberto Pimenta",
                password: "12345678"
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário com o campo EMAIL vazio', done => {
            const user = {
                name: "Roberto Pimenta",
                email: "",
                password: "12345678"
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário com o campo EMAIL inválido', done => {
            const user = {
                name: "Roberto Pimenta",
                email: "robertopimenta@",
                password: "12345678"
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário com o campo EMAIL inválido', done => {
            const user = {
                name: "Roberto Pimenta",
                email: "robertopimenta.com.br",
                password: "12345678"
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário sem o campo PASSWORD', done => {
            const user = {
                name: "Roberto Pimenta",
                email: "robertopimenta@email.com",
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário com o campo PASSWORD vazio', done => {
            const user = {
                name: "Roberto Pimenta",
                email: "robertopimenta@email.com",
                password: ""
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário com EMAIL repitido', done => {
            const user = {
                name: "Roberto Pimenta",
                email: "robertopimenta@email.com",
                password: "12345678"
            };
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(409);
                    done();
                });
        });

    });
});
