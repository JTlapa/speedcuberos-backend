const db = require('../config/db');

const Record = {
    findTop3ByCategory: async (id_categoria) => {
        const query = `
            SELECT r.*, c.nombre_completo AS competidor_nombre, cat.nombre_cubo, c.edad AS edad, c.pais AS pais, c.red_social AS red_social
            FROM Record r
            JOIN Competidor c ON r.id_competidor = c.id_competidor
            JOIN CategoriaCubo cat ON r.id_categoria = cat.id_categoria
            WHERE r.id_categoria = ?
            ORDER BY r.tiempo_segundos ASC
            LIMIT 3
        `;
        const [rows] = await db.execute(query, [id_categoria]);
        return rows;
    },

    findByCategory: async (id_categoria) => {
        const query = `
            SELECT r.*, c.nombre_completo AS competidor_nombre, cat.nombre_cubo, c.edad AS edad, c.pais AS pais, c.red_social AS red_social 
            FROM Record r
            JOIN Competidor c ON r.id_competidor = c.id_competidor
            JOIN CategoriaCubo cat ON r.id_categoria = cat.id_categoria
            WHERE r.id_categoria = ?
            ORDER BY r.tiempo_segundos ASC
        `;
        const [rows] = await db.execute(query, [id_categoria]);
        return rows;
    },

    findByUser: async (id_usuario) => {
        const query = `
            SELECT r.*, cat.nombre_cubo 
            FROM Record r
            JOIN CategoriaCubo cat ON r.id_categoria = cat.id_categoria 
            JOIN Competidor comp ON r.id_competidor = comp.id_competidor
            JOIN Usuario u ON comp.nombre_completo = u.nombre_completo 
            WHERE u.id_usuario = ?
        `;
        const [rows] = await db.execute(query, [id_usuario]);
        return rows;
    },
    create: async (data) => {
        const { id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia } = data;
        const query = `
            INSERT INTO Record (id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia]);
        return result.insertId;
    },

    delete: async (id_record) => {
        const [result] = await db.execute('DELETE FROM Record WHERE id_record = ?', [id_record]);
        return result.affectedRows > 0;
    }
};

module.exports = Record;