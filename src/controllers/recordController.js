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
    uploadRecord: async (req, res) => {
        try {
            const { id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia } = req.body;
            if(!id_categoria || !id_competidor || !tiempo_segundos || !fecha || !nombre_competencia || !lugar_competencia) {
                return res.status(400).json({ message: 'Todos los campos son requeridos para subir un récord.' });
            }

            const recordId = await Record.create(req.body);
            return res.status(201).json({ message: 'Récord subido con éxito.', recordId });
        } catch (error) {
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