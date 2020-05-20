const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const comparePassword = async (hashed, password) => {
    return bcrypt.compare(hashed, password);
}

const getUsername = (email) => {
    if (email)
        return email.split('@')[0];
}

module.exports = { hashPassword, comparePassword, getUsername };