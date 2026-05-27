const Competitor = require('../models/competitorModel');

const competitorController = {
    getCompetitor: async (req, res) => {
        try {
            const competitor = await Competitor.findById(req.params.id);
            if (!competitor) return res.status(404).json({ message: 'Competidor no encontrado.' });
            return res.status(200).json(competitor);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener competidor.' });
        }
    },
    addCompetitor: async (req, res) => {
        try {
            const { nombre_completo, edad, pais, red_social } = req.body;
            if (!nombre_completo || !edad || !pais) return res.status(400).json({ message: 'Faltan campos obligatorios.' });

            const competitorId = await Competitor.create({ nombre_completo, edad, pais, red_social });
            return res.status(201).json({ message: 'Competidor agregado.', competitorId });
        } catch (error) {
            return res.status(500).json({ message: 'Error al guardar competidor.' });
        }
    }
};

module.exports = competitorController;