const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSecret = process.env.COOKIESECRET;

module.exports = (app, __basedir) => {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    app.use(cookieParser(cookieSecret));
    app.use(express.static(path.resolve(__basedir, 'static')));
};