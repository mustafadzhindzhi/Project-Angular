const express = require('express');
const router = express.Router();

const data = {
    "name":"server",
    "version":"1.0.0",
    "description": "server for back-end in my project",
    "main":"index.js"
}

router.get('/', function(req, res) {
    res.send(data);
})

module.exports = router;