const app = require('./src/app');
const { updateCache } = require('./src/services/photos.service');

const port = process.env.PORT || 8080;

const start = async () => {
    await updateCache()
    app.listen(port, () => console.log(`Memoria 2021 escuenchando en el puerto ${port}`))

}

start();