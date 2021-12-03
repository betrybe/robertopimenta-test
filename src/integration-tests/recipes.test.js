const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app')

chai.use(chaiHttp);
chai.should();

describe('Receitas - Endpoints', () => {
    describe('POST /recives', () => {
        var token = ''
        it('Rota POST para login com os campos válidos', done => {
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
                    token = response.body.should.have.property('token');
                    done();
                });
        });

        it('Rota POST para cadastrar receita sem o campo NAME', done => {
            const recipe = {
                ingredients: "ovo e sal",
                preparation: "quebre o ovo, jogue na frigideira, adicione o sal"
            };
            chai.request(app)
                .post('/recives')
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        it('Rota POST para cadastrar receita sem o campo INGREDIENTS', done => {
            const recipe = {
                name: "receita ovo frito",
                preparation: "quebre o ovo, jogue na frigideira, adicione o sal"
            };
            chai.request(app)
                .post('/recives')
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        it('Rota POST para cadastrar receita sem o campo PREPARATION', done => {
            const recipe = {
                name: "receita ovo frito",
                ingredients: "ovo e sal"
            };
            chai.request(app)
                .post('/recives')
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(404);
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
                    response.should.have.status(404);
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
                    response.should.have.status(404);
                    done();
                });
        });

        it('Rota POST para cadastrar receita com todos os campos válidos incluindo token', done => {
            const recipe = {
                name: "receita ovo frito",
                ingredients: "ovo e sal",
                preparation: "quebre o ovo, jogue na frigideira, adicione o sal"
            };
            chai.request(app)
                .post('/recives')
                .set("Authorization", {token})
                .send(recipe)
                .end((err, response) => {
                    response.should.have.status(200);
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
