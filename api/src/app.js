const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const photosRouter = require('./routers/photos.router');
const path = require('path');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/photos', photosRouter);

app.use('/assets', express.static(path.join(__dirname, '..', 'images')))

app.use((req, res, next) => {
    const error = new Error('Ruta inexistente');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: error.message
    });
})

module.exports = app;