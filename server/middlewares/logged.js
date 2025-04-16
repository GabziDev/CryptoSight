const pool = require('../config/database');

module.exports.checkIsLogged = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé.' });
    }

    try {
        const [rows] = await pool.execute("SELECT * FROM users WHERE token = ?", [token]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Token invalide.' });
        }

        req.userId = rows[0].id;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Token invalide ou expiré." });
    }
};
