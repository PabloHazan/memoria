const app = require('./src/app');

const port = process.env.PORT || 8080;

const start = () => {
    app.listen(port, () => console.log(`Memoria 2021 escuenchando en el puerto ${port}`))

}

start();