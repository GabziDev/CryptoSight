const { generateRandomToken } = require("../utils/token");
const { validateUsername, validateEmail, validatePassword } = require("../utils/validation");
const pool = require("../config/database");
const bcrypt = require('bcrypt');
const uuid = require('uuid');

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect !" });
        }

        const userDB = rows[0];

        const passwordMatch = await bcrypt.compare(password, userDB.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect !" });
        }

        const token = generateRandomToken();

        await pool.execute("UPDATE users SET token = ? WHERE id = ?", [token, userDB.id]);

        return res.status(200).json({ message: 'Connexion avec succès !', token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Une erreur interne est survenue." });
    }
}

module.exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        try {
            validateUsername(username);
            validateEmail(email);
            validatePassword(password);
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }

        // Vérifier si l'email et le username existe déjà
        const [existingUsers] = await pool.execute(
            "SELECT * FROM users WHERE email = ? OR username = ?",
            [email, username]
        );

        // Si l'email et le username existe déjà
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email ou pseudo déjà utilisé.' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 14);

        // Générer un id
        const userId = uuid.v4();

        // Envoyer l'informations à la base de données
        await pool.execute(
            "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)",
            [userId, username, email, hashedPassword]
        );

        return res.status(200).json({ message: 'Utilisateur enregistré avec succès !' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Une erreur interne est survenue." });
    }
}