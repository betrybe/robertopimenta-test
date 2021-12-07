const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (request, file, cb) => {
            cb(null, './src/uploads');
        },
        filename: (request, file, cb) => {
            cb(null, `${request.params.id} .jpeg`);
        },
    }),
}));