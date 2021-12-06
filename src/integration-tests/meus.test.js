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
    });
});