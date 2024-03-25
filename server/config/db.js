const config = require('./config.js');
const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect(config.dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
}