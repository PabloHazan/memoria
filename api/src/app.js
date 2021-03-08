const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const photosRouter = require('./routers/photos.router');
const path = require('path');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/photos', photosRouter);

app.use(express.static(path.join(__dirname, '..', 'images')));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'images', 'index.html'));
})

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