const express = require("express");
const router = express.Router();
const service = require('../services/usersService');

router.post('/createAccount', async (req, res) => {
    try {
        const { name, lastName, email, password } = req.body;
        const newUser = await service.create(name, lastName, email, password);
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            nuevoUsuario: newUser 
        });
    } catch (error) {
        res.status(400).json({ 
            message: error.message 
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await service.login(email, password);
        res.status(200).json({ 
            message: 'Login exitoso', 
            usuario: user 
        });

    } catch (error) {
        res.status(401).json({ 
            error: error.message 
        });
    }
});

module.exports = router;