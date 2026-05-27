const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    findByEmail: async (email) => {
        const query = `
            SELECT u.*, r.nombre_rol 
            FROM Usuario u
            JOIN RolUsuario r ON u.id_rol = r.id_rol
            WHERE u.correo = ?
        `;
        const [rows] = await db.execute(query, [email]);
        return rows[0];
    },
    create: async (userData) => {
        const { id_competidor, id_rol, nombre_completo, correo, password } = userData;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = `
            INSERT INTO Usuario (id_competidor, id_rol, nombre_completo, correo, password)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [id_competidor || null, id_rol, nombre_completo, correo, hashedPassword]);
        return result.insertId;
    },
    createInTransaction: async (connection, userData) => {
        const { id_competidor, id_rol, nombre_completo, correo, password } = userData;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = `
            INSERT INTO Usuario (id_competidor, id_rol, nombre_completo, correo, password)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await connection.execute(query, [id_competidor, id_rol, nombre_completo, correo, hashedPassword]);
        return result.insertId;
    }
};

module.exports = User;