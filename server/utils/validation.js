function validatePassword(password) {
    const maxPasswordLength = 120;
    const minPasswordLength = 12;

    if (password.length < minPasswordLength) {
        throw new Error(`Le mot de passe doit avoir une longueur minimale de ${minPasswordLength} caractères.`);
    }

    if (password.length > maxPasswordLength) {
        throw new Error(`La limite de caractères du mot de passe a été atteinte, maximum ${maxPasswordLength} caractères.`);
    }
}

function validateUsername(username) {
    const maxUsernameLength = 10;
    const minUsernameLength = 3;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (username.length > maxUsernameLength) {
        throw new Error(`Le pseudo dois faire ${maxUsernameLength} caractères maximum.`);
    }

    if (username.length < minUsernameLength) {
        throw new Error(`Le pseudo dois faire plus de ${minUsernameLength} caractères.`);
    }

    if (!username.match(usernameRegex)) {
        throw new Error('Le pseudo ne peut contenir que des lettres, des chiffres et des underscores.');
    }
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/;
    const maxEmailLength = 255;

    if (!email.match(emailRegex)) {
        throw new Error('L\'adresse email n\'est pas valide.');
    }

    if (email.length > maxEmailLength) {
        throw new Error(`L'adresse email ne doit pas faire plus de ${maxEmailLength} caractères.`);
    }
}

module.exports = { validatePassword, validateUsername, validateEmail };