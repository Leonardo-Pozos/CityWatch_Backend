const loginRouter = require('./usersRouter');
const reportsRouter = require('./reportsRouter');

function routerApi(app){
    app.use('/login', loginRouter);
    app.use('/reports', reportsRouter);
};

module.exports = routerApi;