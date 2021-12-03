const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app')

chai.use(chaiHttp);
chai.should();

describe('Login - Endpoints', () => {
    describe('POST /login', () => {
        it ('Rota POST para login com os campos válidos', done => {
            const user = {
                email: "root@email.com",
                password: "admin"
            };
            chai.request(app)
            .post('/login')
            .send(user)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('token');
                done();
            });
        });

        it ('Rota POST para login sem o campo email', done => {
            const user = {
                password: "admin"
            };
            chai.request(app)
            .post('/login')
            .send(user)
            .end((err, response) => {
                response.should.have.status(401);
                done();
            });
        });

        it ('Rota POST para login sem o campo password', done => {
            const user = {
                email: "root@email.com"
            };
            chai.request(app)
            .post('/login')
            .send(user)
            .end((err, response) => {
                response.should.have.status(401);
                done();
            });
        });

        it ('Rota POST para login email/password incorreto', done => {
            const user = {
                email: "roottt@email.com",
                password: "admin"
            };
            chai.request(app)
            .post('/login')
            .send(user)
            .end((err, response) => {
                response.should.have.status(401);
                done();
            });
        });

        it ('Rota POST para login email/password incorreto', done => {
            const user = {
                email: "root@email.com",
                password: "adminnnn"
            };
            chai.request(app)
            .post('/login')
            .send(user)
            .end((err, response) => {
                response.should.have.status(401);
                done();
            });
        });
    });
});