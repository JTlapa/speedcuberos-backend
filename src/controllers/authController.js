const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    login: async (req, res) => {
        try {
            const { correo, password } = req.body;

            if (!correo || !password) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
            }

            const user = await User.findByEmail(correo);
            if (!user) {
                return res.status(401).json({ message: 'Credenciales incorrectas (Correo no registrado).' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales incorrectas (Contraseña incorrecta).' });
            }

            const token = jwt.sign(
                { id_usuario: user.id_usuario, rol: user.nombre_rol },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            return res.status(200).json({
                message: '¡Login exitoso!',
                token,
                user: {
                    id: user.id_usuario,
                    nombre: user.nombre_completo,
                    correo: user.correo,
                    rol: user.nombre_rol
                }
            });

        } catch (error) {
            console.error('Error en el login control:', error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
};

module.exports = authController;