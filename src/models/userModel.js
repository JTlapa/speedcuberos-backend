const db = require('../config/db');

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
    }
};

module.exports = User;