const pool = require("../config/database");

module.exports.getInfo = async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Veuillez vous connecter !' });
    }

    console.log(userId)

    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Veuillez vous connecter !' });
        }

        const user = rows[0];
        return res.status(200).json({
            username: user.username,
            email: user.email,
            created_at: user.created_at
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Une erreur interne est survenue." });
    }
};

module.exports.deleteAccount = async (req, res) => {
    const userId = req.userId;

};

module.exports.changePassword = async (req, res) => {
    const userId = req.userId;

};

module.exports.changeEmail = async (req, res) => {
    const userId = req.userId;

};
