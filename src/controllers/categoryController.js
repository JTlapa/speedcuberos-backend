const Category = require('../models/categoryModel');

const categoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.findAll();
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener categorías.' });
        }
    },
    addCategory: async (req, res) => {
        try {
            const { nombre_cubo, descripcion } = req.body;
            if (!nombre_cubo) return res.status(400).json({ message: 'El nombre es obligatorio.' });

            const categoryId = await Category.create({ nombre_cubo, descripcion });
            return res.status(201).json({ message: 'Categoría agregada con éxito.', categoryId });
        } catch (error) {
            return res.status(500).json({ message: 'Error al guardar categoría.' });
        }
    }
};

module.exports = categoryController;