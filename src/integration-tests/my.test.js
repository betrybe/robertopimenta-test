const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');

const { MongoClient } = require('mongodb');
chai.use(chaiHttp);
chai.should();
should = chai.should();

const mongoDbUrl = 'mongodb://mongodb:27017/Cookmaster';

describe('RECEITAS', () => {
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
        await db.collection('users').insertMany(users);
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

   


});