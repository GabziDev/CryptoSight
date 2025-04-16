const pool = require("../config/database");

module.exports.addFavorite = async (req, res) => {
    const userId = req.userId;
    const cryptoId = req.body.cryptoId;

    if (!userId) {
        return res.status(401).json({ message: 'Veuillez vous connecter !' });
    }

    if (!cryptoId) {
        return res.status(400).json({ message: 'Crypto ID manquant' });
    }

    try {
        const [rows] = await pool.execute('SELECT * FROM favorites WHERE user_id = ? AND crypto_id = ?', [userId, cryptoId]);

        if (rows.length > 0) {
            return res.status(400).json({ message: 'Cette crypto est déjà dans vos favoris' });
        }

        await pool.execute('INSERT INTO favorites (user_id, crypto_id) VALUES (?, ?)', [userId, cryptoId]);
        return res.status(200).json({ message: 'Crypto ajouté aux favoris' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Une erreur interne est survenue." });
    }
};

module.exports.deleteFavorite = async (req, res) => {
    const userId = req.userId;
    const cryptoId = req.body.cryptoId;

    if (!userId) {
        return res.status(401).json({ message: 'Veuillez vous connecter !' });
    }

    if (!cryptoId) {
        return res.status(400).json({ message: 'Crypto ID manquant' });
    }

    try {
        const [rows] = await pool.execute('SELECT * FROM favorites WHERE user_id = ? AND crypto_id = ?', [userId, cryptoId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Cette crypto n\'est pas dans vos favoris' });
        }

        await pool.execute('DELETE FROM favorites WHERE user_id = ? AND crypto_id = ?', [userId, cryptoId]);
        return res.status(200).json({ message: 'Crypto supprimé des favoris' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Une erreur interne est survenue." });
    }
};

module.exports.getFavorites = async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Veuillez vous connecter !' });
    }

    try {
        const [rows] = await pool.execute('SELECT crypto_id FROM favorites WHERE user_id = ?', [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Aucun favori trouvé' });
        }

        const favorites = rows.map(row => row.crypto_id);

        return res.status(200).json({favorites: favorites});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Une erreur interne est survenue." });
    }
};
