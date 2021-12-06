const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app')

chai.use(chaiHttp);
chai.should();

describe('Usuário Admin - Endpoints', () => {
    describe('POST /users/admin', async () => {

        it('Rota POST para novo usuário admin com dados válidos', done => {
            const user = {
                name: "Admin Dois",
                email: "admin2@email.com",
                password: "12345678"
            };
            chai.request(app)
                .post('/users/admin')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(201);
                    done();
                });
        });

        it('Rota POST para novo usuário admin sem o campo NAME', done => {
            const user = {
                email: "admin2@email.com",
                password: "12345678"
            };
            chai.request(app)
                .post('/users/admin')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário admin com o campo NAME vazio', done => {
            const user = {
                name: "",
                email: "admin2@email.com",
                password: "12345678"
            };
            chai.request(app)
                .post('/users/admin')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário admin sem o campo EMAIL', done => {
            const user = {
                name: "Admin Dois",
                password: "12345678"
            };
            chai.request(app)
                .post('/users/admin')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário admin com o campo EMAIL vazio', done => {
            const user = {
                name: "Admin Dois",
                email: "",
                password: "12345678"
            };
            chai.request(app)
                .post('/users/admin')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário admin com o campo EMAIL inválido', done => {
            const user = {
                name: "Admin Dois",
                email: "admin2@",
                password: "12345678"
            };
            chai.request(app)
                .post('/users/admin')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário com o campo EMAIL inválido', done => {
            const user = {
                name: "Admin Dois",
                email: "admin2email.com",
                password: "12345678"
            };
            chai.request(app)
                .post('/users/admin')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário admin sem o campo PASSWORD', done => {
            const user = {
                name: "Admin Dois",
                email: "admin2@email.com"
            };
            chai.request(app)
                .post('/users/admin')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário admin com o campo PASSWORD vazio', done => {
            const user = {
                name: "Admin Dois",
                email: "admin2@email.com",
                password: ""
            };
            chai.request(app)
                .post('/users/admin')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        it('Rota POST para novo usuário admin com EMAIL repitido', done => {
            const user = {
                name: "Admin Dois",
                email: "root@email.com",
                password: "12345678"
            };
            chai.request(app)
                .post('/users/admin')
                .send(user)
                .end((err, response) => {
                    response.should.have.status(409);
                    done();
                });
        });

    });
});