 
const mongoose = require('mongoose');
  
// tells mongoose to use ES6 implementation of promises
mongoose.Promise = global.Promise;
const MONGODB_URI = 'mongodb://localhost:27017/';
mongoose.connect(MONGODB_URI);
  
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    });
      
    // runs before each test
    beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => {
        done();
       });
});

//import the User model
const user = require('../models/users');
const recipes = require('../models/recipes');
const assert = require('assert');
  
describe('Creating documents in MongoDB', () => {
    it('Creates a New User', (done) => {
        const newUser = new user({ name:"Roberto", email: "rob@email.com", password: "12345678" });
        newUser.save() // returns a promise after some time
            .then(() => {
                //if the newUser is saved in db and it is not new
                assert(!newUser.isNew);
                done();
            });
    });
});

describe('Creating documents in MongoDB', () => {
    it('Creates a New User', (done) => {
        const newRecipe = new recipes({ name:"Roberto", ingredients: "rob@email.com", preparation: "12345678" });
        newRecipe.save() // returns a promise after some time
            .then(() => {
                //if the newUser is saved in db and it is not new
                assert(!newRecipe.isNew);
                done();
            });
    });
});