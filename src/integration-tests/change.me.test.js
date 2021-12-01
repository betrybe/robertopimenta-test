const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app')

chai.use(chaiHttp);
chai.should();

describe('Usuários - Endpoints', () => {
    describe('POST /users', () => {
        it ('Rota POST para novo usuário', done => {
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
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('name').eq(user.name);
                response.body.should.have.property('email').eq(user.email);
                response.body.should.have.property('role').eq('user');
                done();
            });
        });
    });
});
