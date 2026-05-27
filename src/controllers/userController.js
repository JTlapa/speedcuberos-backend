const db = require('../config/db');
const User = require('../models/userModel');
const Competitor = require('../models/competitorModel');

const userController = {
    register: async (req, res) => {
        const connection = await db.getConnection();

        try {
            const { id_rol, nombre_completo, correo, password, edad, pais, red_social } = req.body;

            if (!id_rol || !nombre_completo || !correo || !password) {
                return res.status(400).json({ message: 'Faltan campos obligatorios de la cuenta de usuario.' });
            }

            const existingUser = await User.findByEmail(correo);
            if (existingUser) {
                return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
            }
            
            await connection.beginTransaction();

            let finalCompetidorId = null;
            if (Number(id_rol) === 2) {
                if (!edad || !pais) {
                    await connection.rollback();
                    return res.status(400).json({ message: 'Para registrar un usuario común se requieren edad y país del competidor.' });
                }
                finalCompetidorId = await Competitor.createInTransaction(connection, {
                    nombre_completo, 
                    edad,
                    pais,
                    red_social
                });
            }
            const userId = await User.createInTransaction(connection, {
                id_competidor: finalCompetidorId,
                id_rol,
                nombre_completo,
                correo,
                password
            });
            await connection.commit();

            return res.status(201).json({ 
                message: '¡Registro exitoso!',
                userId,
                id_competidor: finalCompetidorId
            });

        } catch (error) {
            await connection.rollback();
            console.error('Error en la transacción de registro:', error);
            return res.status(500).json({ message: 'Error interno al procesar el registro compuesto.' });
        } finally {
            connection.release();
        }
    }
};

module.exports = userController;