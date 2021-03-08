const app = require('./src/app');
const { updateCache } = require('./src/services/photos.service');

const port = process.env.port || 8080;

updateCache()
    .then(() => {
        app.listen(port, () => console.log(`Memoria 2021 escuenchando en el puerto ${port}`))
    })
