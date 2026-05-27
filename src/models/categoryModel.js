const db = require('../config/db');

const Category = {
    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM CategoriaCubo');
        return rows;
    },
    create: async (data) => {
        const { nombre_cubo, descripcion } = data;
        const query = 'INSERT INTO CategoriaCubo (nombre_cubo, descripcion) VALUES (?, ?)';
        const [result] = await db.execute(query, [nombre_cubo, descripcion || null]);
        return result.insertId;
    }
};

module.exports = Category;