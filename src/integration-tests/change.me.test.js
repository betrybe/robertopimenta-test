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

describe('Login - Endpoints', () => {
    describe('POST /login', () => {
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
                    response.body.should.have.property('token');
                    done();
                });
        });

        it('Rota POST para login sem o campo email', done => {
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

        it('Rota POST para login sem o campo password', done => {
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

        it('Rota POST para login email/password incorreto', done => {
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

        it('Rota POST para login email/password incorreto', done => {
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
                .set("Authorization", { token })
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