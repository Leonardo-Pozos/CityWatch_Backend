const loginRouter = require('./login/loginRouter');

function routerApi(app){
    app.use('/login', loginRouter)
};

module.exports = routerApi;