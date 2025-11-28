const userModel = require('../models/User');

class usersService{
    constructor(){}

    async create(name, lastName, email, password) {
        const userFound = await userModel.findOne({ email });
        if (userFound) {
            throw new Error('El correo electrónico ya está registrado.');
        }

        const newUser = new userModel({
            name,      
            lastName,  
            email,
            password
        });

        await newUser.save();
        return newUser;
    }

    async login(email, password){
        const user = await userModel.findOne({ email: email });
        if (!user || user.password !== password) {
            throw new Error('Correo o contraseña incorrecta.');
        }
        return user;
    }
}

module.exports = new usersService();