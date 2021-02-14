const app = require('./src/app');

const port = process.env.port || 8080;

app.listen(port, () => console.log(`Memoria 2021 escuenchando en el puerto ${port}`))