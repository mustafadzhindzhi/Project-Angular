global.__basedir = __dirname;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const dbConnector = require('./config/db');
const apiRouter = require('./router');
const cors = require('cors');
const { errorHandler } = require('./utils');
const expressConfig = require('./config/express');

dbConnector()
  .then(() => {
    const config = require('./config/config');
    const app = express();
    expressConfig(app, __dirname);

    app.use(cors({
      origin: config.origin,
      credentials: true,
    }));

    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(cookieParser(process.env.COOKIESECRET));

    app.use('/images', express.static(path.resolve(__dirname, 'images')));

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
