const db = require('../config/db');

const Competitor = {
    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM Competidor WHERE id_competidor = ?', [id]);
        return rows[0];
    },
    findByUserId: async (id_usuario) => {
        const query = `SELECT comp.id_competidor 
        FROM Competidor comp
        INNER JOIN Usuario u ON comp.nombre_completo = u.nombre_completo
        WHERE u.id_usuario = ?`;
        const [rows] = await db.execute(query, [id_usuario]);
        return rows[0];
    },
    create: async (data) => {
        const { nombre_completo, edad, pais, red_social } = data;
        const query = 'INSERT INTO Competidor (nombre_completo, edad, pais, red_social) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [nombre_completo, edad, pais, red_social || null]);
        return result.insertId;
    },
    createInTransaction: async (connection, competitorData) => {
        const { nombre_completo, edad, pais, red_social } = competitorData;
        const query = `
            INSERT INTO Competidor (nombre_completo, edad, pais, red_social) 
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await connection.execute(query, [nombre_completo, edad, pais, red_social || null]);
        return result.insertId;
    }
};

module.exports = Competitor;