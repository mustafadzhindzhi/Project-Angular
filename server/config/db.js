const mongoose = require('mongoose');
const config = require('../config/config');

module.exports = () => {
    return mongoose.connect(config.dbURL);
}
