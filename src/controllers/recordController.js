const Competitor = require('../models/competitorModel');
const Record = require('../models/recordModel');

const recordController = {
    getTop3: async (req, res) => {
        try {
            const records = await Record.findTop3ByCategory(req.params.categoryId);
            return res.status(200).json(records);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el top 3.' });
        }
    },
    getByCategory: async (req, res) => {
        try {
            const records = await Record.findByCategory(req.params.categoryId);
            return res.status(200).json(records);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los récords.' });
        }
    },
    getUserRecords: async (req, res) => {
        try {
            const records = await Record.findByUser(req.user.id_usuario);
            return res.status(200).json(records);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los récords.' });
        }
    },

    uploadRecord: async (req, res) => {
        try {
            const { id_categoria, tiempo_segundos, fecha, nombre_competencia, lugar_competencia } = req.body;
            const id_usuario = req.user?.id_usuario;
            if (!id_usuario) {
                return res.status(401).json({ message: 'Usuario no autenticado o token inválido.' });
            }
            const competidorEncontrado = await Competitor.findByUserId(id_usuario);

            if (!competidorEncontrado) {
                return res.status(404).json({ message: 'No se encontró un perfil de competidor asociado a esta cuenta de usuario.' });
            }
            const id_competidor = competidorEncontrado.id_competidor;
            if (!id_categoria || !id_competidor || !tiempo_segundos || !fecha || !nombre_competencia || !lugar_competencia) {
                return res.status(400).json({ message: 'Todos los campos son requeridos para subir un récord.' });
            }
            const recordId = await Record.create({
                id_categoria: Number(id_categoria),
                id_competidor: Number(id_competidor),
                tiempo_segundos: Number(tiempo_segundos),
                fecha,
                nombre_competencia,
                lugar_competencia
            });

            return res.status(201).json({ message: 'Récord subido con éxito.', recordId });

        } catch (error) {
            console.error("ERROR:", error);
            return res.status(500).json({ message: 'Error al subir el récord.' });
        }
    },
    deleteRecord: async (req, res) => {
        try {
            const success = await Record.delete(req.params.id);
            if (!success) return res.status(404).json({ message: 'Récord no encontrado.' });
            return res.status(200).json({ message: 'Récord eliminado correctamente.' });
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el récord.' });
        }
    }
};

module.exports = recordController;