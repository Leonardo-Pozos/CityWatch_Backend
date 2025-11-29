const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const { logErrors, errorHandler } = require('./middlewares/errorHandler');

const routerApi = require('./routes/routes');
const app = express();
const mongoUri = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());
routerApi(app);

app.use(logErrors);
app.use(errorHandler);

mongoose.connect(mongoUri)
    .then(() => console.log('Conexion a MongoDB exitosa'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

app.listen(3000, () => {
    console.log('Trabajando en el puerto: ' + 3000);  
});