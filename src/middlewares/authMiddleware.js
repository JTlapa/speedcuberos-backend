const jwt = require('jsonwebtoken');

const authMiddleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Acceso denegado. No se proporcionó un token.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; 
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido o expirado.' });
        }
    },

    isAdmin: (req, res, next) => {
        if (!req.user || req.user.rol !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
        }
        next();
    }
};

module.exports = authMiddleware;