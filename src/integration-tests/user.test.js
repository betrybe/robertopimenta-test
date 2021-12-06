const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');

chai.use(chaiHttp);
chai.should();

describe('Receitas - Endpoints', () => {
    describe('POST /recipes', () => {
    });
});