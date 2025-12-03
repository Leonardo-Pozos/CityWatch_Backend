const userModel = require('../models/User');

class usersService{
    constructor(){}

    /**
     * Registra un nuevo usuario, guardando la contraseña en texto plano.
     */
    async create(name, lastName, email, password) {
        // Validación de correo ya registrado
        const userFound = await userModel.findOne({ email });
        if (userFound) {
            throw new Error('El correo electrónico ya está registrado.');
        }

        const newUser = new userModel({
            name,       
            lastName,   
            email,
            password: password // <- Contraseña guardada en texto plano para simplificación académica
        });

        await newUser.save();
        
        // Retornamos el usuario (se recomienda no devolver la contraseña, incluso en texto plano)
        const userObject = newUser.toObject();
        delete userObject.password; 
        return userObject;
    }

    /**
     * Inicia sesión, comparando la contraseña directamente.
     */
    async login(email, password){
        // Buscar usuario por email
        const user = await userModel.findOne({ email: email });
        
        if (!user) {
            throw new Error('Correo o contraseña incorrecta.');
        }

        // Comparar la contraseña directamente (texto plano)
        if (user.password !== password) {
            throw new Error('Correo o contraseña incorrecta.');
        }

        // Retornar los datos del usuario para el frontend
        const userObject = user.toObject();
        delete userObject.password;

        // Se devuelve el objeto usuario sin token
        return userObject; 
    }
}

module.exports = new usersService();