global.__basedir = __dirname;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const dbConnector = require('./config/db');
const apiRouter = require('./router');
const cors = require('cors');
const { errorHandler } = require('./utils');
const expressConfig = require('./config/express'); // Import the express configuration module

dbConnector()
  .then(() => {
    const config = require('./config/config');
    const app = express(); // Use express directly
    expressConfig(app, __dirname); // Pass __dirname to the express configuration module

    app.use(cors({
      origin: config.origin,
      credentials: true,
    }));

    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(cookieParser(process.env.COOKIESECRET));

    app.use('/images', express.static(path.resolve(__dirname, 'images'))); // Correct the path here

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'images');
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      }
    });
    const upload = multer({ storage: storage });

    app.post('/api/upload/image', upload.single('image'), (req, res) => {
      res.status(200).json({ message: 'Image uploaded successfully', filename: req.file.filename });
    });

    app.get('/', (req, res) => {
      res.send('Welcome to the backend server!');
    });

    app.use('/api', apiRouter);
    app.use(errorHandler);
    app.listen(config.port, console.log(`Listening on port ${config.port}`));
  })
  .catch(console.error);
