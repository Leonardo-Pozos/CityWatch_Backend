const loginRouter = require('./usersRouter');

function routerApi(app){
    app.use('/login', loginRouter)
};

module.exports = routerApi;