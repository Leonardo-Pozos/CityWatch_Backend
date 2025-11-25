const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routerApi = require('./routes/routes');
const app = express();

app.use(cors());
routerApi(app);

app.listen(3000, () => {
    console.log('Trabajando en el puerto: ' + 3000);  
});