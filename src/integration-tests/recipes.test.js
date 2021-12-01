const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app')

chai.use(chaiHttp);
chai.should();

describe('Receitas - Endpoints', () => {
    describe('POST /recives', () => {
        it('Rota POST para cadastrar receita com todos os campos válidos incluindo token', done => {
            let token = 'authorization_token'
            const recipe = {
                name: "receita ovo frito",
                ingredients: "ovo e sal",
                preparation: "quebre o ovo, jogue na frigideira, adicione o sal"
            };
            chai.request(app)
                .post('/recives')
                .set({ "Authorization": token })
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('token');
                    done();
                });
        });

        it('Rota POST para cadastrar receita sem o campo NAME', done => {
            let token = 'authorization_token'
            const recipe = {
                ingredients: "ovo e sal",
                preparation: "quebre o ovo, jogue na frigideira, adicione o sal"
            };
            chai.request(app)
                .post('/recives')
                .set({ "Authorization": token })
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq('Invalid entries. Try again.')
                    done();
                });
        });

        it('Rota POST para cadastrar receita sem o campo INGREDIENTS', done => {
            let token = 'authorization_token'
            const recipe = {
                name: "receita ovo frito",
                preparation: "quebre o ovo, jogue na frigideira, adicione o sal"
            };
            chai.request(app)
                .post('/recives')
                .set({ "Authorization": token })
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq('Invalid entries. Try again.')
                    done();
                });
        });

        it('Rota POST para cadastrar receita sem o campo PREPARATION', done => {
            let token = 'authorization_token'
            const recipe = {
                name: "receita ovo frito",
                ingredients: "ovo e sal"
            };
            chai.request(app)
                .post('/recives')
                .set({ "Authorization": token })
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq('Invalid entries. Try again.')
                    done();
                });
        });

        it('Rota POST para cadastrar receita sem estar logado', done => {
            const recipe = {
                name: "receita ovo frito",
                ingredients: "ovo e sal",
                preparation: "quebre o ovo, jogue na frigideira, adicione o sal"
            };
            chai.request(app)
                .post('/recives')
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq('Necessário realizar login')
                    done();
                });
        });

        it('Rota POST para cadastrar receita com token inválido', done => {
            const recipe = {
                name: "receita ovo frito",
                ingredients: "ovo e sal",
                preparation: "quebre o ovo, jogue na frigideira, adicione o sal"
            };
            chai.request(app)
                .post('/recives')
                .set({ "Authorization": "959595959595" })
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq('jwt malformed')
                    done();
                });
        });

        it('Rota GET para listar todas as receitas', done => {
            chai.request(app)
                .get('/recipes')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array')
                    done();
                });
        });
    });
});

