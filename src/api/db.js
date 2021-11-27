const mongoose = require('mongoose')

main().then(() => {
    console.log('Conectado ao DB')
}).catch((err) => {
    console.log(err)
})

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Cookmaster', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
}